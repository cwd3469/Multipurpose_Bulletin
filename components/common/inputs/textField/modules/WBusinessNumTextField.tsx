import React, { useCallback } from 'react';
import { WTextFieldModulesType } from '../type';
import { mobileFormatOff } from '@utils/formatNumber';
import useValidation from '@hooks/useValidation';
import Input from '@components/common/inputs/Input';

const WBusinessNumTextField = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, error, setError, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();

  const errMsg = useCallback(() => {
    setError(
      {
        msg: '사업자 등록번호는 10자리를 입력해 주세요.',
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
        if (valid.regBusinessNumber.test(txt)) {
          const hyphen = txt
            .replace(/[^0-9]/g, '')
            .replace(valid.regExpBusinessNum, `$1-$2-$3`);
          const unHyphen = mobileFormatOff(txt);
          setState(hyphen, keyId);
          if (unHyphen.length === 10) {
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
    [
      errMsg,
      keyId,
      passMsg,
      setState,
      valid.regBusinessNumber,
      valid.regExpBusinessNum,
    ],
  );

  return (
    <Input
      value={stateTxt}
      onChange={onChangeInfo}
      placeholder={'숫자 10자리'}
      disabled={disabled}
      error={error}
    />
  );
};

WBusinessNumTextField.defaultProps = {
  disabled: false,
};

export default WBusinessNumTextField;
