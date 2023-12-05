import instance from '@hooks/api/instance';
import { getCookie, setCookie } from 'cookies-next';
import { useMutation, useQueryClient } from 'react-query';
import { SigninDto, SigninState, UserInfoInterface } from '../../../types/signin';
import { useCallback } from 'react';
import jwtDecode from 'jwt-decode';
import { useToastContext } from '@hooks/useToastContext';

/**핑 api */
export const ping = () => {
  return instance({
    method: 'get',
    url: `/auth/api/v1/ping`,
  });
};

export const apiRefreshToken = (token: string) => {
  const refreshToken = { refreshToken: token };
  return instance({
    method: 'post',
    url: `/auth/api/v1/refresh`,
    data: JSON.stringify(refreshToken),
  });
};

/**로그인 api */
export const postSignin = (info: SigninDto) => {
  return instance({
    method: 'post',
    url: '/auth/api/v1/hospital/signin',
    data: JSON.stringify(info),
  });
};

/**fcmToken 등록  api */
export const fcmTokenRegister = (info: { fcmToken: string }) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'put',
    url: '/auth/api/v1/hospital/fcm-token',
    data: JSON.stringify(info),
    headers: {
      Authorization: accessToken,
    },
  });
};

/**로그인 비밀번호 변경 api */
export const postEditPassword = (obj: {
  password: string;
  reenterPassword: string;
  accessToken: string;
}) => {
  const dto = {
    password: obj.password,
    reenterPassword: obj.reenterPassword,
  };
  return instance({
    method: 'put',
    url: `/auth/api/v2/hospital/password-update`,
    data: dto,
    headers: {
      Authorization: obj.accessToken,
    },
  });
};

/**로그인 mutation react query */
export const useSigninMutation = () => {
  const toast = useToastContext();
  const { mutate: postSigninMutate } = useMutation((person: SigninDto) => postSignin(person));

  const onClickSignin = useCallback(
    (params: {
      siginInfo: SigninDto;
      onOpenModal: (label: SigninState, needPasswordUpdate?: boolean) => void;
      setTokenList: (token: { accessToken: string; refreshToken: string }) => void;
    }) => {
      const { siginInfo, onOpenModal, setTokenList } = params;
      setCookie('accountId', siginInfo.accountId);
      setCookie('hospitalCode', siginInfo.hospitalCode);
      postSigninMutate(siginInfo, {
        onSuccess: (res) => {
          if (res.data.status === 'FAIL') {
            switch (res.data.code) {
              /// 가입 대기
              case '0050':
                onOpenModal('not-approved');
                return;
              /// 휴면 상태
              case '0051':
                onOpenModal('dormant');
                return;
              /// 운영팀에 의해 정지된 계정
              case '0055':
                onOpenModal('disable');
                return;
              //- 관리자에 의해 정지된 계정입니다
              case '0056':
                onOpenModal('disable');
                return;
              default:
                return;
            }
          }
          if (res.data.status === 'SUCCESS') {
            if (res.data.data) {
              const userInfo: UserInfoInterface = jwtDecode(res.data.data.accessToken as string);
              setTokenList({
                accessToken: res.data.data.accessToken,
                refreshToken: res.data.data.refreshToken,
              });
              /// 비활성화
              if (!userInfo.accountNonLocked) {
                onOpenModal('disable');
                return;
              }
              onOpenModal('success', res.data.data.needPasswordUpdate);

              return;
            }
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (errMsg: any) => {
          toast?.on(`로그인 정보를 확인해 주세요.`, 'error');
        },
      });
    },
    [postSigninMutate, toast],
  );

  return { onClickSignin };
};

/** *점유번호 입력 mutation react query */
export const useEditPasswordSignin = () => {
  return useMutation(
    (person: { password: string; reenterPassword: string; accessToken: string }) =>
      postEditPassword(person),
    {
      onError: (error, variable, context) => {
        console.log(error);
      },
    },
  );
};
