import { useCallback, useState, useEffect } from 'react';
import { ErrorType, ModalType } from 'types/signin';
import { useToastContext } from '@hooks/useToastContext';
import useValidation from '@hooks/useValidation';

export default function useMobileAuth(props: ModalType) {
  const { open, handleClose } = props;
  const toast = useToastContext();
  const validation = useValidation();
  const errorToast = useCallback(
    (msg: string) => {
      toast?.on(msg, 'error');
    },
    [toast],
  );
  const errMsg = useCallback(() => {
    const msg = {
      msg: '',
      boo: false,
    };
    return msg;
  }, [])();
  /// input value
  const [mobileValue, setMobile] = useState<string>('');
  const [authValue, setAuth] = useState<string>('');
  ///모달 setState
  const [modalOn, setModalOn] = useState<boolean>(false);
  //유효성 alert
  const [authRequestDisabled, setAuthRequestDisabled] =
    useState<boolean>(false);
  const [authDisabled, setAuthDisabled] = useState<boolean>(true);
  const [numDisabled, setNumDisabled] = useState<boolean>(true);
  const [mobileError, setMobileError] = useState<ErrorType>(errMsg);
  const [authError, setAuthError] = useState<ErrorType>(errMsg);

  const reset = useCallback(() => {
    setAuthDisabled(true);
    setNumDisabled(true);
    setAuthRequestDisabled(false);
    setMobileError(errMsg);
    setAuthError(errMsg);
    setMobile('');
    setAuth('');
  }, [errMsg]);

  /**모든 모달 닫기 액션 */
  const handleCloseAll = useCallback(() => {
    handleClose();
    setModalOn(false);
    reset();
  }, [handleClose, reset]);

  /**휴대폰번호 입력 액션*/
  const mobileOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const txt = e.target.value;
      const pass = setMobile;
      const error = setMobileError;
      if (txt.length < 14) {
        if (txt.length > 3 && txt.substring(0, 3) !== '010') {
          error({
            msg: '휴대폰 번호를 입력해 주세요.',
            boo: true,
          });
          return;
        } else {
          const mobile = txt
            .replace(validation.regExpNum, '')
            .replace(validation.regExpMobile, `$1-$2-$3`);
          pass(mobile);
          if (mobile.length >= 13) {
            error({
              msg: '',
              boo: false,
            });
          } else {
            error({
              msg: '휴대폰 번호를 입력해 주세요.',
              boo: true,
            });
          }
        }
      }
    },
    [setMobile, validation],
  );

  /**인증번호 입력불가 해제 액션*/
  const mobileAuthNumPost = useCallback(() => {
    setAuthRequestDisabled(true);
    setAuthDisabled(false);
    setAuth('');
  }, []);

  /**인증번호 입력 액션*/
  const authOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length < 7) {
        const txt = e.target.value;
        const pass = setAuth;
        const error = setAuthError;
        if (validation.regExpAuthNumberEntry.test(txt)) {
          pass(txt.replace(/[^0-9]/g, ''));
          if (validation.regExpAuthNumberVerify.test(txt)) {
            error({
              msg: '',
              boo: false,
            });
            return;
          }
          error({
            msg: '숫자만 입력 가능합니다.',
            boo: true,
          });
        }
        error({
          msg: '숫자만 입력 가능합니다.',
          boo: true,
        });
      }
    },
    [validation],
  );

  /** 인증 번호 인증번호 유효성 검사*/
  const focusOutEvent = () => {
    if (authValue.length < 6) {
      setAuthError({
        msg: '인증번호 6자리를 입력해 주세요.',
        boo: true,
      });
    } else {
      setAuthError({
        msg: '',
        boo: false,
      });
    }
  };
  /** 인증 번호 초기화 액션*/
  const onTimerDisabled = useCallback(() => {
    setAuthDisabled(true);
    setAuthRequestDisabled(false);
    setAuthError(errMsg);
    setAuth('');
  }, [errMsg]);

  /** 인증 번호 유효시간 아웃 액션*/
  const onAuthTimeOut = useCallback(() => {
    errorToast('인증번호 입력 유효 시간이 만료되었습니다');
    onTimerDisabled();
  }, [errorToast, onTimerDisabled]);

  const onVaildAuthNumConfirmation = useCallback(() => {
    if (authValue.length === 6) {
      setNumDisabled(false);
    } else {
      setNumDisabled(true);
    }
  }, [authValue.length]);

  const onVaildMobileConfirmation = useCallback(() => {
    if (mobileValue.length < 12) {
      setAuthDisabled(true);
      setNumDisabled(true);
      setAuth('');
    }
  }, [mobileValue.length]);

  useEffect(() => {
    onVaildMobileConfirmation();
  }, [onVaildMobileConfirmation]);

  useEffect(() => {
    onVaildAuthNumConfirmation();
  }, [onVaildAuthNumConfirmation]);

  useEffect(() => {
    () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    open,
    handleClose,
    authValue,
    mobileValue,
    modalOn,
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
    setModalOn,
    errorToast,
    mobileError,
    focusOutEvent,
    setAuthDisabled,
    onAuthTimeOut,
  };
}
