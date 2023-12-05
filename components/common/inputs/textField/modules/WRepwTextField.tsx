import useValidation from '@hooks/useValidation';
import Input from '@components/common/inputs/Input';
import React, { useCallback, useState } from 'react';
import { WTextFieldModulesType } from '../type';

interface WRepwTextFieldType extends WTextFieldModulesType {
  pw: string;
}

const WRepwTextField = (props: WRepwTextFieldType) => {
  const { state, setState, keyId, error, setError, pw, placeholder, errorMsg } =
    props;
  const stateTxt = state as string;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setError(
      {
        msg: errorMsg
          ? errorMsg
          : '비밀번호가 일치하지 않아 다시 확인해 주세요.',
        boo: true,
      },
      keyId,
    );
  }, [errorMsg, keyId, setError]);

  const passMsg = useCallback(() => {
    setError(
      {
        msg: '',
        boo: false,
      },
      keyId,
    );
  }, [keyId, setError]);

  const onFocusOut = useCallback(
    (value: string) => {
      if (value) {
        if (value === pw) {
          passMsg();
        } else {
          errMsg();
        }
      } else {
        errMsg();
      }
    },
    [errMsg, passMsg, pw],
  );

  //임시 비밀번호 입력
  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length <= 16) {
        setState(value, keyId);
        if (valid.regExpPass.test(value)) {
          onFocusOut(value);
        } else {
          errMsg();
        }
      }
    },
    [errMsg, keyId, onFocusOut, setState, valid.regExpPass],
  );

  return (
    <Input
      type="password"
      value={stateTxt}
      onChange={onChangeInfo}
      focusOutEvent={() => onFocusOut(stateTxt)}
      error={error}
      maxRows={16}
      placeholder={placeholder ? placeholder : '비밀번호 재입력'}
    />
  );
};

WRepwTextField.defaultProps = {
  disabled: false,
};

export default WRepwTextField;
