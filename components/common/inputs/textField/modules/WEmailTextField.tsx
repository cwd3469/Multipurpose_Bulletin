import React, { useCallback } from 'react';
import { WTextFieldModulesType } from '../type';
import Input from '@components/common/inputs/Input';
import useValidation from '@hooks/useValidation';

const WEmailTextField = (props: WTextFieldModulesType) => {
  const valid = useValidation();
  const errMsg = useCallback(() => {
    props.setError(
      {
        msg: '10자 이상 50자 이내의 이메일을 입력해 주세요.',
        boo: true,
      },
      props.keyId,
    );
  }, [props]);

  const passMsg = useCallback(() => {
    props.setError(
      {
        msg: '',
        boo: false,
      },
      props.keyId,
    );
  }, [props]);

  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length <= 50) {
        props.setState(value, props.keyId);
        if (valid.regExpEmail.test(value)) {
          passMsg();
        } else {
          errMsg();
        }
      }
    },
    [errMsg, passMsg, props, valid.regExpEmail],
  );

  return (
    <Input
      name="email"
      placeholder="정산 내역을 전달받을 이메일"
      onChange={onChangeInfo}
      value={props.state}
      error={props.error}
    />
  );
};

export default WEmailTextField;
