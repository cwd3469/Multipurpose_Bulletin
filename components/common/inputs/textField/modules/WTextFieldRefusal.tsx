import React, { useCallback } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/useValidation';
import Input from '@components/common/inputs/Input';

type WTextFieldRefusalProps = WTextFieldModulesType & {
  placeholder?: string;
};

const WTextFieldRefusal = (props: WTextFieldRefusalProps) => {
  const { state, setState, keyId, error, setError, disabled, placeholder } =
    props;
  const stateTxt = state as string;
  const valid = useValidation();

  //의사 정보 입력
  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      const errorMsg = {
        msg: '2~20자의 한글, 숫자, 영문 대소문자 입력해 주세요',
        boo: true,
      };
      const successMsg = {
        msg: '',
        boo: false,
      };
      if (text.length > 21) return;
      setState(text, keyId);
      if (!valid.regRefusalCheck.test(text)) return setError(errorMsg, keyId);
      return setError(successMsg, keyId);
    },
    [keyId, setError, setState, valid.regRefusalCheck],
  );

  return (
    <Input
      value={stateTxt}
      onChange={onChangeInfo}
      placeholder={placeholder ? placeholder : '환자에게 전달할 사유 입력'}
      error={error}
      disabled={disabled}
    />
  );
};

export default WTextFieldRefusal;
