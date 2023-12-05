import React, { useCallback, useState } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/useValidation';
import Input from '@components/common/inputs/Input';

const WAddressDetailTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, error, setError, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setError(
      {
        msg: '조건에 맞는 - 상세 주소를 입력해 주세요.',
        boo: true,
      },
      keyId,
    );
  }, [keyId, setError]);
  const passMsg = useCallback(() => {
    setError(
      {
        msg: '',
        boo: false,
      },
      keyId,
    );
  }, [keyId, setError]);

  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length <= 15) {
        if (valid.regAddressDetail.test(value)) {
          setState(value, keyId);
          passMsg();
        } else {
          errMsg();
        }
      }
    },
    [errMsg, keyId, passMsg, setState, valid.regAddressDetail],
  );

  return (
    <Input
      value={stateTxt}
      onChange={onChangeInfo}
      error={error}
      disabled={disabled}
      placeholder="상세주소가 없는 경우 주소지 특징 입력"
    />
  );
};

WAddressDetailTextField.defaultProps = {
  disabled: false,
};

export default WAddressDetailTextField;
