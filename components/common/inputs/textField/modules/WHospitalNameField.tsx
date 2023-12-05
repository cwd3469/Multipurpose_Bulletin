import React, { useCallback, useState } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/useValidation';
import Input from '@components/common/inputs/Input';

const WHospitalNameField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, error, setError, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setError(
      {
        msg: '-명은 영문 대소문자/한글/숫자 조합으로 1~15자리를 입력해 주세요.',
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
        if (valid.regHospitalName.test(value)) {
          setState(value, keyId);
          if (value.length > 0 && value.length <= 15) {
            passMsg();
          } else {
            errMsg();
          }
        } else {
          errMsg();
        }
      }
    },
    [errMsg, keyId, passMsg, setState, valid.regHospitalName],
  );

  return (
    <Input
      value={stateTxt}
      onChange={onChangeInfo}
      error={error}
      disabled={disabled}
      placeholder="한글, 숫자, 영어 대소문자 조합 1~15자리"
    />
  );
};

WHospitalNameField.defaultProps = {
  disabled: false,
};

export default WHospitalNameField;
