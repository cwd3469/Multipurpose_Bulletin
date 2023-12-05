import React, { useCallback } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/useValidation';
import Input from '@components/common/inputs/Input';

const WTextFieldDoctorLicenseNumber = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, error, setError, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();

  //의사 정보 입력
  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      if (text.length <= 8) {
        if (valid.regExpNumber.test(text)) {
          setState(text, keyId);
          if (text.length < 4) {
            const errMsg = {
              msg: '의사 면허 번호를 입력해 주세요.',
              boo: true,
            };
            setError(errMsg, keyId);
            return;
          } else {
            const msg = { msg: '', boo: false };
            setError(msg, keyId);
          }
        } else {
          const errMsg = {
            msg: '의사 면허 번호를 입력해 주세요.',
            boo: true,
          };
          setError(errMsg, keyId);
        }
      }
    },
    [keyId, setError, setState, valid.regExpNumber],
  );

  return (
    <Input
      value={stateTxt}
      onChange={onChangeInfo}
      placeholder={'숫자 4-8자리'}
      error={error}
      disabled={disabled}
    />
  );
};

export default WTextFieldDoctorLicenseNumber;
