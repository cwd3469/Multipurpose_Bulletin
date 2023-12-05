import React, { useCallback } from 'react';
import useValidation from '@hooks/useValidation';
import { WTextFieldModulesType } from '../type';
import Input from '@components/common/inputs/Input';
import { mobileFormat, mobileFormatOff } from '@utils/formatNumber';

const WMobileTextField = (props: WTextFieldModulesType) => {
  const {
    state,
    setState,
    keyId,
    error,
    setError,
    disabled,
    errorMsg,
    placeholder,
  } = props;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    setError(
      {
        msg: errorMsg ? errorMsg : '11자리의 휴대폰 번호를 입력해 주세요',
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

  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const txt = e.target.value;
      if (txt.length <= 13) {
        if (txt.length > 3 && txt.substring(0, 3) !== '010') {
          errMsg();
          return;
        } else {
          if (valid.regExpMobileNumber.test(txt)) {
            const hyphen = mobileFormat(txt);
            const unHyphen = mobileFormatOff(txt);
            setState(hyphen, keyId);
            if (unHyphen.length == 11) {
              passMsg();
            } else {
              if (unHyphen.length === 0) {
                errMsg();
                return;
              }
              errMsg();
            }
            return;
          } else {
            errMsg();
          }
        }
      }
    },
    [errMsg, keyId, passMsg, setState, valid.regExpMobileNumber],
  );

  return (
    <Input
      value={state}
      onChange={onChangeInfo}
      placeholder={
        placeholder ? placeholder : '알림 톡을 연락받을 번호를 입력해 주세요.'
      }
      disabled={disabled}
      error={error}
    />
  );
};

WMobileTextField.defaultProps = {
  disabled: false,
};

export default WMobileTextField;
