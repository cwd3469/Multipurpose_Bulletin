import { useCallback, useState } from 'react';
import { MobileNumDto, ModalType } from 'types/signin';
import useMobileAuth from '@components/auth/hook/useMobileAuth';
import SignupStepThree from '@components/auth/signup/modal/SignupStepThree';
import { useCommonMobileAuth, useCommonVerifyCode } from '@hooks/api/common';
import { mobileFormatOff } from '@utils/formatNumber';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import MobileAuthView from '@components/auth/findAccount/modal/MobileAuthView';

const SignupStepTwo = (props: ModalType) => {
  const {
    open,
    authValue,
    mobileValue,
    modalOn,
    authDisabled,
    numDisabled,
    authError,
    authRequestDisabled,
    authOnChange,
    mobileAuthNumPost,
    mobileOnChange,
    handleCloseAll,
    onTimerDisabled,
    setModalOn,
    errorToast,
    mobileError,
    setAuthDisabled,
    onAuthTimeOut,
  } = useMobileAuth(props);

  const { mutate: postCommonMobileAuthMutate } = useCommonMobileAuth();
  const { mutate: postCommonVerifyCodeMutate } = useCommonVerifyCode();
  const [bgDisable, setBgDisable] = useState<boolean>(false);
  const msg = useCodeMsgBundle();
  const resetModalClose = () => {
    handleCloseAll();
    setBgDisable(false);
  };

  /**인증번호 발급 */
  const onClickAuthNumSend = useCallback(() => {
    const mobile: MobileNumDto = { mobileNum: mobileFormatOff(mobileValue) };
    postCommonMobileAuthMutate(mobile, {
      onSuccess: (res) => {
        if (res.data.code !== '0000') {
          errorToast(msg.errMsg(res.data.code));
          return;
        }
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
    mobileValue,
    msg,
    postCommonMobileAuthMutate,
  ]);

  /**  인증번호 확인 이벤트 */
  const signupAuthOnClick = useCallback(() => {
    const data = {
      mobileNum: mobileFormatOff(mobileValue),
      code: authValue,
    };
    postCommonVerifyCodeMutate(data, {
      onSuccess: (res) => {
        if (res.data.status === 'SUCCESS') {
          setModalOn(true);
          setAuthDisabled(true);
          setBgDisable(true);
        }
        if (res.data.status === 'FAIL') {
          errorToast(msg.errMsg(res.data.code));
          return;
        }
      },
      onError: (err) => {
        errorToast(
          '인증번호가 일치하지 않습니다 \n 잠시 후, 다시 시도해 주세요.',
        );
      },
    });
  }, [
    authValue,
    errorToast,
    mobileValue,
    msg,
    postCommonVerifyCodeMutate,
    setAuthDisabled,
    setModalOn,
  ]);
  const value = {
    open,
    authValue,
    mobileValue,
    mobileDisabled: authRequestDisabled,
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
    bgDisable,
    onClickAuthNumSend,
  };

  return (
    <>
      <MobileAuthView {...value} />
      <SignupStepThree
        open={modalOn}
        handleClose={resetModalClose}
        mobileValue={mobileValue}
      />
    </>
  );
};

export default SignupStepTwo;
