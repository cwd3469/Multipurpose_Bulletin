import { useCallback, useContext, useEffect, useState } from 'react';
import {
  MobileNumDto,
  ModalType,
  SigninState,
  UserInfoInterface,
} from 'types/signin';
import useMobileAuth from '@components/auth/hook/useMobileAuth';
import jwtDecode from 'jwt-decode';
import { mobileFormat, mobileFormatOff } from '@utils/formatNumber';
import { useCommonMobileAuth, useCommonVerifyCode } from '@hooks/api/common';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import UserInfoContext from '@hooks/contexts/UserInfoContext';
import MobileAuthView from '../findAccount/modal/MobileAuthView';
import SigninPwChangeProcess from './SigninPwChangeProcess';

interface SigninMobileAuth extends ModalType {
  tokenList: { accessToken: string; refreshToken: string };
  needPasswordUpdate?: boolean;
}
const SigninMobileAuth = (props: SigninMobileAuth) => {
  const { tokenList, needPasswordUpdate } = props;
  const {
    open,
    authValue,
    authDisabled,
    numDisabled,
    authError,
    authRequestDisabled,
    setAuthRequestDisabled,
    authOnChange,
    mobileAuthNumPost,
    mobileOnChange,
    handleCloseAll,
    onTimerDisabled,
    errorToast,
    mobileError,
    focusOutEvent,
    onAuthTimeOut,
  } = useMobileAuth(props);
  const { signinOn } = useContext(UserInfoContext);
  const { mutate: postCommonMobileAuthMutate } = useCommonMobileAuth();
  const { mutate: postCommonVerifyCodeMutate } = useCommonVerifyCode();
  const [userInfo, setUserInfo] = useState<UserInfoInterface>();
  const [processOpen, setProcessOpen] =
    useState<{
      label: SigninState;
      open: boolean;
    }>();
  const mobileFormChange = userInfo ? mobileFormat(userInfo.mobileNum) : '';
  const msg = useCodeMsgBundle();
  const resetModalClose = () => {
    handleCloseAll();
  };

  /**인증번호 발급 */
  const onClickAuthNumSend = useCallback(() => {
    const mobile: MobileNumDto = {
      mobileNum: mobileFormatOff(mobileFormChange),
    };
    postCommonMobileAuthMutate(mobile, {
      onSuccess: (res) => {
        if (res.data.code !== '0000') {
          errorToast(msg.errMsg(res.data.code));
          return;
        }
        setAuthRequestDisabled(true);
        mobileAuthNumPost();
      },
      onError: (err) => {
        errorToast(
          '인증번호 발급에 실패 하였습니다. \n 잠시 후, 다시 시도해 주세요.',
        );
      },
    });
  }, [
    errorToast,
    mobileAuthNumPost,
    mobileFormChange,
    msg,
    postCommonMobileAuthMutate,
    setAuthRequestDisabled,
  ]);

  /**  인증번호 확인 이벤트 */
  const signupAuthOnClick = useCallback(() => {
    const data = {
      mobileNum: mobileFormatOff(mobileFormChange),
      code: authValue,
    };
    postCommonVerifyCodeMutate(data, {
      onSuccess: (res) => {
        if (res.data.status === 'SUCCESS') {
          /// 비밀번호 발급 기간이 90일 초과일때
          if (needPasswordUpdate) {
            setProcessOpen({ label: 'excess', open: true });
            return;
          }
          if (userInfo ? userInfo.needResetPassword : false) {
            setProcessOpen({ label: 'first', open: true });
            return;
          }
          signinOn(tokenList);
        }
        if (res.data.status === 'FAIL') {
          errorToast(msg.errMsg(res.data.code));
          return;
        }
      },
      onError: (err) => {
        errorToast(
          '인증번호가 일치하지 않습니다 \n 잠시 후, 다시 시도해 주세요',
        );
      },
    });
  }, [
    authValue,
    errorToast,
    mobileFormChange,
    msg,
    needPasswordUpdate,
    postCommonVerifyCodeMutate,
    signinOn,
    tokenList,
    userInfo,
  ]);

  useEffect(() => {
    if (open) {
      if (typeof document !== 'undefined') {
        if (tokenList) {
          const info: UserInfoInterface = jwtDecode(
            tokenList.accessToken as string,
          );
          if (info) {
            setUserInfo(info);
          }
        }
      }
    }
  }, [open, tokenList]);

  const value = {
    open,
    authValue,
    mobileValue: mobileFormChange,
    mobileDisabled: true,
    authDisabled,
    numDisabled,
    authError,
    authRequestDisabled,
    authOnChange,
    mobileOnChange,
    onTimerDisabled,
    mobileError,
    onAuthTimeOut,
    resetModalClose,
    signupAuthOnClick,
    bgDisable: processOpen ? processOpen.open : false,
    onClickAuthNumSend,
  };

  return (
    <>
      <MobileAuthView {...value} />
      {processOpen ? (
        <SigninPwChangeProcess
          open={processOpen.open}
          handleClose={() => {
            resetModalClose();
            setProcessOpen(undefined);
          }}
          label={processOpen.label}
          position={''}
          tokenList={tokenList}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default SigninMobileAuth;
