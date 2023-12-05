import React, { useCallback } from 'react';
import { WTextFieldModulesType } from '../type';
import { mobileFormatOff, phoneFormat } from '@utils/formatNumber';
import useValidation from '@hooks/useValidation';
import Input from '@components/common/inputs/Input';

const WPhoneTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, error, setError, disabled } = props;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setError(
      {
        msg: '- 전화번호는 8~12자리를 입력해 주세요.',
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
      if (txt.length <= 14) {
        if (valid.regExpPhoneNumber.test(txt)) {
          const hyphen = phoneFormat(txt);
          const unHyphen = mobileFormatOff(txt);

          setState(hyphen, keyId);
          if (unHyphen.length >= 8 && unHyphen.length <= 13) {
            passMsg();
          } else {
            errMsg();
          }
          return;
        } else {
          errMsg();
        }
      }
    },
    [errMsg, keyId, passMsg, setState, valid.regExpPhoneNumber],
  );

  return (
    <Input
      value={state}
      onChange={onChangeInfo}
      placeholder={'숫자 8~12자리'}
      disabled={disabled}
      error={error}
    />
  );
};

WPhoneTextField.defaultProps = {
  disabled: false,
};

export default WPhoneTextField;
