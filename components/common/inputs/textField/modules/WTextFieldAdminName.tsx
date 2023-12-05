import React, { useCallback, useState } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/useValidation';
import Input from '@components/common/inputs/Input';

const WTextFieldAdminName = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, error, setError, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setError(
      {
        msg: '이름을 정확히 입력해 주세요.',
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
      if (value.length <= 5) {
        if (valid.regKorean.test(value)) {
          setState(value, keyId);
          if (valid.regExpAdminNameVerify.test(value)) {
            if (value.length < 2) {
              errMsg();
            } else {
              passMsg();
            }
          } else {
            errMsg();
          }
        } else {
          errMsg();
        }
      }
    },
    [
      errMsg,
      keyId,
      passMsg,
      setState,
      valid.regExpAdminNameVerify,
      valid.regKorean,
    ],
  );

  return (
    <Input
      value={stateTxt}
      onChange={onChangeInfo}
      error={error}
      disabled={disabled}
      placeholder="한글 2~5자리"
    />
  );
};

WTextFieldAdminName.defaultProps = {
  disabled: false,
};

export default WTextFieldAdminName;
