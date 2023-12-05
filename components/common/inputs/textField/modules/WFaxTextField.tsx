import React, { useCallback } from 'react';
import { WTextFieldModulesType } from '../type';
import useValidation from '@hooks/useValidation';
import Input from '@components/common/inputs/Input';

const WFaxTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, error, setError, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();

  const errMsg = useCallback(() => {
    setError(
      {
        msg: '- 팩스번호는 숫자 8~12자리 입니다.',
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
      const txt = e.target.value;
      if (txt.length <= 12) {
        if (valid.regExFaxNumber.test(txt)) {
          setState(txt, keyId);
          if (txt.length <= 12 && txt.length >= 8) {
            passMsg();
          } else {
            errMsg();
          }
        } else {
          errMsg();
          return;
        }
      }
    },
    [errMsg, keyId, passMsg, setState, valid.regExFaxNumber],
  );

  return (
    <Input
      value={stateTxt}
      onChange={onChangeInfo}
      placeholder={'숫자 8~12자리'}
      disabled={disabled}
      error={error}
    />
  );
};

WFaxTextField.defaultProps = {
  disabled: false,
};

export default WFaxTextField;
