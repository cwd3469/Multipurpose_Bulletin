import { useCallback, useEffect, useState } from 'react';
import { ErrorType } from 'types/signin';

type InfoState = {
  pw: string;
  repw: string;
};
type InfoStateError = {
  pw: ErrorType;
  repw: ErrorType;
};

const useChangePw = () => {
  const errMsg = useCallback(() => {
    const msg = {
      msg: '',
      boo: false,
    };
    return msg;
  }, [])();

  const [info, setInfo] = useState<InfoState>({
    pw: '',
    repw: '',
  });
  const [infoError, setInfoError] = useState<InfoStateError>({
    pw: errMsg,
    repw: errMsg,
  });
  const [disable, setDisabled] = useState<boolean>(true);

  const pwOnChange = useCallback((text: string, keyId: string) => {
    setInfo((pcev) => {
      return { ...pcev, [keyId]: text };
    });
  }, []);
  const pwErrorOnChange = useCallback((valid: ErrorType, keyId: string) => {
    setInfoError((pcev) => {
      return { ...pcev, [keyId]: valid };
    });
  }, []);

  const reset = useCallback(() => {
    setInfo({ pw: '', repw: '' });
    setInfoError({ pw: errMsg, repw: errMsg });
    setDisabled(true);
  }, [errMsg]);

  useEffect(() => {
    if (
      info.repw === info.pw &&
      !infoError.pw.boo &&
      info.pw.length > 8 &&
      info.repw.length > 8
    ) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  }, [info.pw, info.repw, infoError.pw.boo]);

  return {
    pwOnChange,
    pwErrorOnChange,
    disable,
    info,
    infoError,
    reset,
  };
};

export default useChangePw;
