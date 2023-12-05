import React, { useCallback, useState } from 'react';
import { WTextFieldModulesType } from '../type';
import Input from '@components/common/inputs/Input';
import useValidation from '@hooks/useValidation';
import { birthDateFormat } from '@utils/formatNumber';

const WTextFieldBirthDate = (props: WTextFieldModulesType) => {
  const { state, setState, keyId, error, setError } = props;
  const valid = useValidation();

  const birthDate = useCallback(() => {
    return birthDateFormat(state);
  }, [state])();
  const errMsg = useCallback(
    () =>
      setError(
        {
          msg: '생년월일를 입력해 주세요.',
          boo: true,
        },
        keyId,
      ),
    [keyId, setError],
  );
  const successMsg = useCallback(
    () =>
      setError(
        {
          msg: '',
          boo: false,
        },
        keyId,
      ),
    [keyId, setError],
  );
  //의사 정보 입력 포커스 아웃
  const onFocusOutInfo = useCallback(
    (text: string) => {
      if (!valid.regExpBirthDate.test(text)) {
        errMsg();
        return;
      } else {
        if (text[5] + text[6] === '02') {
          if (Number(text[8] + text[9]) > 29) {
            errMsg();
            return;
          }
        }
        if (Number(text[5] + text[6]) < 8) {
          if (Number(text[5] + text[6]) % 2 === 0) {
            if (Number(text[8] + text[9]) > 30) {
              errMsg();
              return;
            }
          }
        } else {
          if (Number(text[5] + text[6]) % 2 !== 0) {
            if (Number(text[8] + text[9]) > 30) {
              errMsg();
              return;
            }
          }
        }
        successMsg();
        return;
      }
    },
    [errMsg, successMsg, valid.regExpBirthDate],
  );

  //의사 정보 입력
  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      if (text.length <= 10) {
        let date = text
          .replace(valid.regExpNum, '')
          .replace(valid.regExpBirthDateOn, `$1.$2.$3`);
        setState(date, keyId);
        onFocusOutInfo(date);
      }
    },
    [keyId, onFocusOutInfo, setState, valid.regExpBirthDateOn, valid.regExpNum],
  );
  return (
    <Input
      value={birthDate}
      onChange={onChangeInfo}
      placeholder={'숫자 8자리'}
      error={error}
    />
  );
};

export default WTextFieldBirthDate;
