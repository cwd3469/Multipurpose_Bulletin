import Input from '@components/common/inputs/Input';
import useValidation from '@hooks/useValidation';
import React, { useCallback } from 'react';
import { WTextFieldModulesType } from '../type';

const WTextFieldUserId = (props: WTextFieldModulesType) => {
  const {
    state,
    setState,
    keyId,
    error,
    setError,
    errorMsg,
    placeholder,
    disabled,
  } = props;

  const valid = useValidation();
  const errMsg = useCallback(() => {
    const info = {
      msg: errorMsg
        ? errorMsg
        : '영문 소문자 또는 숫자 조합으로 4~20자리를 입력해 주세요.',
      boo: true,
    };
    return info;
  }, [errorMsg])();
  const successMsg = useCallback(() => {
    const info = {
      msg: '',
      boo: false,
    };
    return info;
  }, [])();

  //의사 정보 입력 포커스 아웃
  const onFocusOutInfo = useCallback(
    (txt: string) => {
      if (txt.length < 4) {
        setError(errMsg, keyId);
        return;
      }
      setError(successMsg, keyId);
    },
    [errMsg, keyId, setError, successMsg],
  );
  //의사 정보 입력
  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      if (text.length <= 20) {
        setState(text, keyId);
        if (valid.regExpId.test(text)) {
          onFocusOutInfo(text);
        } else {
          setError(errMsg, keyId);
        }
      }
    },
    [errMsg, keyId, onFocusOutInfo, setError, setState, valid.regExpId],
  );

  return (
    <Input
      value={state}
      onChange={onChangeInfo}
      error={error}
      maxRows={20}
      disabled={disabled}
      placeholder={
        placeholder ? placeholder : '영어 소문자 또는 숫자 조합 4~20자리'
      }
      sx={{
        '& .input-msg': {
          padding: '5px 0',
          height: '24px',
        },
      }}
    />
  );
};

export default WTextFieldUserId;
