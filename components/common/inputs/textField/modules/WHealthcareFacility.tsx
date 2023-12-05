import Input from '@components/common/inputs/Input';
import useValidation from '@hooks/useValidation';
import React, { useCallback } from 'react';
import { WTextFieldModulesType } from '../type';

const WHealthcareFacility = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, error, setError, disabled } = props;
  const valid = useValidation();
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length <= 8) {
        if (valid.regHospitalCode.test(value)) {
          setState(value, keyId);
          if (valid.regHospitalCodeAll.test(value)) {
            setError(
              {
                msg: '',
                boo: false,
              },
              keyId,
            );
          } else {
            setError(
              {
                msg: '해당 -의 요양기관번호 8자리를 입력해 주세요.',
                boo: true,
              },
              keyId,
            );
          }
        } else {
          setError(
            {
              msg: '해당 -의 요양기관번호 8자리를 입력해 주세요.',
              boo: true,
            },
            keyId,
          );
        }
      }
    },
    [keyId, setError, setState, valid.regHospitalCode, valid.regHospitalCodeAll],
  );

  return (
    <Input
      disabled={disabled}
      value={state}
      onChange={onChange}
      error={error}
      maxRows={8}
      placeholder="숫자 8자리"
      sx={{
        '& .input-msg': {
          padding: '5px 0',
          height: '24px',
        },
      }}
    />
  );
};

export default WHealthcareFacility;
