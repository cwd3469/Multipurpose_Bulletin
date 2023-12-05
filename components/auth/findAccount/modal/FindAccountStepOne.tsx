import { useCallback, useState } from 'react';
import { MobileNumDto, ModalType, VerifyRes } from 'types/signin';
import useMobileAuth from '@components/auth/hook/useMobileAuth';
import FindAccountStepTwo from './FindAccountStepTwo';
import { mobileFormatOff } from '@utils/formatNumber';
import { useAuthModileNum, useVerifyCode } from '@hooks/api/user/findAccount';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import MobileAuthView from './MobileAuthView';

interface FindAccountStepOneType extends ModalType {
  hospitalCode: string;
}

const FindAccountStepOne = (props: FindAccountStepOneType) => {
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
  } = useMobileAuth({
    open: props.open,
    handleClose: props.handleClose,
  });

  const { mutate: postMobileAuthSendMutate } = useAuthModileNum();
  const { mutate: postVerifyMutate } = useVerifyCode();
  const [res, setRes] = useState<VerifyRes>();
  const [bgDisable, setBgDisable] = useState<boolean>(false);
  const msg = useCodeMsgBundle();
  const resetModalClose = () => {
    handleCloseAll();
    setBgDisable(false);
  };
  /**인증번호 발급 */
  const onClickAuthNumSend = useCallback(() => {
    const mobile: MobileNumDto = { mobileNum: mobileFormatOff(mobileValue) };
    postMobileAuthSendMutate(mobile, {
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
    postMobileAuthSendMutate,
  ]);

  /**  인증번호 확인 이벤트 */
  const signupAuthOnClick = useCallback(() => {
    const data = {
      hospitalCode: props.hospitalCode,
      mobileNum: mobileFormatOff(mobileValue),
      code: authValue,
    };
    postVerifyMutate(data, {
      onSuccess: (res) => {
        if (res.data.status === 'SUCCESS') {
          setModalOn(true);
          setAuthDisabled(true);
          setBgDisable(true);
          setRes(res.data.data);
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
    postVerifyMutate,
    props.hospitalCode,
    setAuthDisabled,
    setModalOn,
  ]);

  const value = {
    open: open,
    authValue: authValue,
    mobileValue: mobileValue,
    mobileDisabled: authRequestDisabled,
    authDisabled: authDisabled,
    numDisabled: numDisabled,
    authError: authError,
    authRequestDisabled: authRequestDisabled,
    authOnChange: authOnChange,
    mobileOnChange: mobileOnChange,
    onTimerDisabled: onTimerDisabled,
    mobileError: mobileError,
    onAuthTimeOut: onAuthTimeOut,
    resetModalClose: resetModalClose,
    signupAuthOnClick: signupAuthOnClick,
    bgDisable: bgDisable,
    onClickAuthNumSend: onClickAuthNumSend,
  };

  return (
    <>
      <MobileAuthView {...value} />{' '}
      <FindAccountStepTwo
        open={modalOn}
        handleClose={resetModalClose}
        res={res}
      />
    </>
  );
};

export default FindAccountStepOne;
