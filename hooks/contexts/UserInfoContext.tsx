import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { apiRefreshToken, fcmTokenRegister } from '@hooks/api/user/signin';
import { useToastContext } from '@hooks/useToastContext';
import { permissionOn } from '@utils/user';
import { AxiosResponse } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { UserInfoInterface } from 'types/signin';
import { Permission } from '../../components/common/layout/gnb/types';
import AxiosContext from './AxiosContext';
import usePermissionRouter from '@hooks/utils/usePermissionRouter';
import { useDebounceFn } from 'ahooks';
interface UserTimer {
  minute: number;
  seconds: number;
}
interface UserInfoContextType {
  /** 유저 정보  */
  accountInfo?: UserInfoInterface;
  /** 유저 권한 */
  permission: Permission;
  /** 유저 이용 시간 */
  validTime: UserTimer;
  /** 유저 로그인 */
  signinOn: (tokens: { accessToken: string; refreshToken: string }) => void;
  /** 유저 로그아웃 */
  signOut: () => void;
  /** 유저 토큰 리프레쉬 */
  handleTokenInfo: () => void;
  /** 유저 토큰 삭제 */
  deleteToken: () => void;
}

const UserInfoContext = createContext<UserInfoContextType>({
  permission: 'HOSPITAL_ADMIN',
  handleTokenInfo: () => undefined,
  signOut: () => undefined,
  deleteToken: () => undefined,
  signinOn: (tokens: { accessToken: string; refreshToken: string }) => undefined,
  validTime: {
    minute: 0,
    seconds: 0,
  },
});

export function UserInfoProvider(props: { children: JSX.Element }) {
  const { children } = props;
  const router = useRouter();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const active = useContext(AxiosContext);
  const { mainRouter } = usePermissionRouter();
  const [accountInfo, setAccountInfo] = useState<UserInfoInterface>();
  const [permission, setPermission] = useState<Permission>('HOSPITAL_ADMIN');
  const setInPermission = useCallback((txt: Permission) => setPermission(txt), []);
  const [validTime, setValidTime] = useState<UserTimer>({
    minute: 1000,
    seconds: 1000,
  });

  /**UserInfoContext 유효 시간 계산 */
  const time = useCallback((expTime: number) => {
    const now = dayjs();
    const exp = expTime * 1000;
    const lastDate = dayjs(exp);
    const diffS = lastDate.diff(now, 's');
    const minute = Math.floor(diffS / 60);
    const m = minute * 60;
    const seconds = diffS - m;
    return { minute, seconds };
  }, []);

  /**로그인 페이지 이동 */
  const signinPageRoute = useCallback(() => {
    if (router.pathname !== '/signin') {
      const hospitalCode = getCookie('hospitalCode');
      const code = hospitalCode ? `?hospitalCode=${hospitalCode}` : '';
      router.replace(`/signin${code}`, undefined, {
        shallow: true,
      });
    }
  }, [router]);

  /**토큰 초기화*/
  const deleteToken = useCallback(() => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    deleteCookie('permission');
    deleteCookie('cancelList');
    setCookie('authorized', false);
  }, []);

  /**로그인 상태 변경 (로그인) */
  const signinOn = useCallback(
    async (tokens: { accessToken: string; refreshToken: string }) => {
      const { accessToken, refreshToken } = tokens;
      const userInfo: UserInfoInterface = jwtDecode(accessToken as string);
      const permission = permissionOn(userInfo.roles);
      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);
      setCookie('permission', permission);
      setCookie('authorized', true);
      setAccountInfo(userInfo);
      setInPermission(permission);
      mainRouter(permission);
      setValidTime(time(userInfo.exp));
      // const vapIdToken = await getVapidToken();
      // if (vapIdToken) {
      //   fcmTokenRegister({ fcmToken: vapIdToken });
      // }
    },
    [mainRouter, setInPermission, time],
  );
  /**로그인 상태 변경 (로그아웃) */
  const signOut = useCallback(() => {
    deleteToken();
    signinPageRoute();
  }, [deleteToken, signinPageRoute]);

  /**중복 로그인 코드 에러*/
  const onCodeErr = useCallback(
    (data: AxiosResponse<any, any>) => {
      signOut();
      if (data.data.code === '0049') {
        toast?.on('다른 기기에서 로그인 하였습니다. \n 로그인 페이지로 이동합니다.', 'error');
        return;
      } else {
        toast?.on(msg.errMsg(data.data.code), 'error');
      }

      return;
    },
    [msg, signOut, toast],
  );
  /**에러 로그아웃*/
  const onError = useCallback(() => {
    signOut();
    toast?.on('토큰 유효기간이 만료 되었습니다. \n 로그인 페이지로 이동합니다.', 'error');
    return;
  }, [signOut, toast]);

  /**토큰 상태 업데이트*/
  const onToken = useCallback(
    (token: string) => {
      const i: UserInfoInterface = jwtDecode(token as string);
      setAccountInfo(i);
      setValidTime(time(i.exp));
      setPermission(permissionOn(i.roles));
    },
    [time],
  );

  /**토큰 리프레쉬 성공 */
  const onSuccess = useCallback(
    (data: AxiosResponse<any, any>) => {
      const reAccessToken = data.data.data.accessToken;
      const reRefreshToken = data.data.data.refreshToken;
      setCookie('accessToken', reAccessToken);
      setCookie('refreshToken', reRefreshToken);
      onToken(reAccessToken);
    },
    [onToken],
  );
  /**토큰 리프레쉬*/
  const handleTokenInfo = useCallback(async () => {
    active.setProgressBarDisabledFn(true);
    if (typeof document !== 'undefined') {
      const token = getCookie('refreshToken');
      const refreshToken = typeof token === 'string' ? token : '';
      if (refreshToken) {
        await apiRefreshToken(refreshToken)
          .then((data) => {
            if (data.data.code !== '0000') {
              onCodeErr(data);
            } else {
              onSuccess(data);
            }
          })
          .catch(() => {
            onError();
          });
      }
    }
  }, [active, onCodeErr, onError, onSuccess]);

  const onDebounceHandleTokenInfo = useDebounceFn(handleTokenInfo, {
    wait: 500,
  });

  const onMountCookieCheck = useCallback(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      onToken(accessToken as string);
      return;
    }
    signinPageRoute();
    toast?.on('로그인 상태가 아닙니다 \n 로그인 페이지로 이동합니다.', 'error');
  }, [onToken, signinPageRoute, toast]);

  useEffect(() => {
    if (router.pathname !== '/signin') {
      if (router.pathname !== '/404') {
        if (router.pathname !== '/error') {
          onMountCookieCheck();
        }
      }
    }
  }, [onMountCookieCheck, router.pathname]);

  useEffect(() => {
    const handleRouteChange = (url: URL) => onDebounceHandleTokenInfo.run();
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const value = {
    permission,
    handleTokenInfo: onDebounceHandleTokenInfo.run,
    signOut,
    deleteToken,
    signinOn,
    validTime,
    accountInfo,
  };

  return <UserInfoContext.Provider value={value}>{children}</UserInfoContext.Provider>;
}
export default UserInfoContext;
