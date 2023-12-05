import Input from '@components/common/inputs/Input';
import useValidation from '@hooks/useValidation';
import React, { useCallback } from 'react';
import { WTextFieldModulesType } from '../type';

const WTextFieldUserPw = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, error, setError, placeholder, errorMsg } =
    props;
  const valid = useValidation();

  const errorMsgFn = useCallback(() => {
    setError(
      {
        msg: errorMsg
          ? errorMsg
          : '영문 대소문자/숫자/특수문자 조합으로 8~16자리를 입력해 주세요.',
        boo: true,
      },
      keyId,
    );
  }, [errorMsg, keyId, setError]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length <= 16) {
        setState(value, keyId);
        if (valid.regPwFormChack.test(value)) {
          setError(
            {
              msg: '',
              boo: false,
            },
            keyId,
          );
        } else {
          errorMsgFn();
        }
      }
    },
    [errorMsgFn, keyId, setError, setState, valid.regPwFormChack],
  );

  return (
    <Input
      type="password"
      value={state}
      onChange={onChange}
      error={error}
      maxRows={16}
      placeholder={
        placeholder ? placeholder : '영어 대소문자,숫자,특수문자 조합 8~16자리'
      }
    />
  );
};

export default WTextFieldUserPw;
