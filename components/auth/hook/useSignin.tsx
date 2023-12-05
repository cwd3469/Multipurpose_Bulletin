import { useState, useCallback, useEffect } from 'react';
import { ErrorType, SigninDto, SigninErr, SigninState } from 'types/signin';
import { getCookie } from 'cookies-next';

interface UseSigninType {
  hospitalCode?: string;
}

const useSignin = (props: UseSigninType) => {
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [accountType, setAccountType] = useState<string>('');
  const [needPasswordUpdate, setNeedPasswordUpdate] = useState<boolean>(true);
  const [modalLabel, setModalLabel] = useState<SigninState>('success');
  const [tokenList, setTokenList] = useState<{
    accessToken: string;
    refreshToken: string;
  }>({
    accessToken: '',
    refreshToken: '',
  });
  const [siginInfo, setSignInfo] = useState<SigninDto>({
    hospitalCode: '',
    accountId: '',
    password: '',
  });
  const [siginErr, setSignErr] = useState<SigninErr>({
    hospitalCode: { msg: '', boo: false },
    accountId: { msg: '', boo: false },
    password: { msg: '', boo: false },
  });

  //TODO:추수 리펙토링 예정 needPasswordUpdate 임시 적용
  const handleOpenModal = useCallback(
    (label: SigninState, needPasswordUpdate?: boolean) => {
      setModalLabel(label);
      setModalOn(true);
      if (typeof needPasswordUpdate !== 'undefined') {
        setNeedPasswordUpdate(needPasswordUpdate);
      }
    },
    [],
  );

  const setStateErr = useCallback((errMsg: ErrorType, keyId: string) => {
    setSignErr((prev) => {
      return { ...prev, [keyId]: errMsg };
    });
  }, []);

  const setState = useCallback((txt: string, keyId: string) => {
    setSignInfo((prev) => {
      return { ...prev, [keyId]: txt };
    });
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOn(false);
    setTokenList({
      accessToken: '',
      refreshToken: '',
    });
    setAccountType('');
    setModalLabel('first');
  }, []);

  useEffect(() => {
    for (const k in siginInfo) {
      if (Object.prototype.hasOwnProperty.call(siginInfo, k)) {
        const el = siginInfo[k];
        // 값이 없을 때
        if (!el) {
          setDisabled(true);
          return;
        } else {
          // 값이 있지만 유효성 검사에 통과 하지 못 했을때
          for (const i in siginErr) {
            if (Object.prototype.hasOwnProperty.call(siginErr, i)) {
              const er = siginErr[i];
              if (er.boo) {
                setDisabled(true);
                return;
              }
            }
          }
        }
      }
    }
    setDisabled(false);
  }, [siginErr, siginInfo]);
  useEffect(() => {
    const cookieId = getCookie('accountId');
    const cookieCode = getCookie('hospitalCode');
    let sizeCode =
      (cookieCode as string) === '88989792'
        ? '11101334'
        : (cookieCode as string);
    let hospitalUrl =
      props.hospitalCode === '88989792' ? '11101334' : props.hospitalCode;

    if (cookieId && cookieCode) {
      const code = hospitalUrl ? hospitalUrl : sizeCode;
      setSignInfo((prec) => {
        return {
          ...prec,
          ['hospitalCode']: code,
          ['accountId']: cookieId as string,
        };
      });
    } else {
      const code = hospitalUrl ? hospitalUrl : '';
      setSignInfo((prec) => {
        return {
          ...prec,
          ['hospitalCode']: code,
          ['accountId']: '',
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.hospitalCode]);

  return {
    handleOpenModal,
    handleCloseModal,
    setState,
    setStateErr,
    tokenList,
    modalLabel,
    accountType,
    disabled,
    modalOn,
    siginInfo,
    siginErr,
    setTokenList,
    needPasswordUpdate,
  };
};
export default useSignin;
