import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import WSubTitle from '@components/common/typography/WSubTitle';
import Input from '@components/common/inputs/Input';
import useValidation from '@hooks/useValidation';

import { DoctorInfoProps } from '../type';
import { birthDateFormat } from '@utils/formatNumber';

const DoctorInfoBirthDate = (props: DoctorInfoProps) => {
  const { state, setState, keyId, err, setErr } = props;
  const valid = useValidation();

  const birthDate = useCallback(() => {
    return birthDateFormat(state);
  }, [state])();

  //의사 정보 입력 포커스 아웃
  const onFocusOutInfo = useCallback(
    (text: string) => {
      if (!valid.regExpBirthDate.test(text)) {
        const errMsg = {
          msg: '조건에 맞는 생년월일를 입력해 주세요.',
          boo: true,
        };
        setErr(errMsg, keyId);
        return;
      } else {
        if (text[5] + text[6] === '02') {
          if (Number(text[8] + text[9]) > 29) {
            const errMsg = {
              msg: '조건에 맞는 생년월일를 입력해 주세요.',
              boo: true,
            };
            setErr(errMsg, keyId);
            return;
          }
        }
        if (Number(text[5] + text[6]) < 8) {
          if (Number(text[5] + text[6]) % 2 === 0) {
            if (Number(text[8] + text[9]) > 30) {
              const errMsg = {
                msg: '조건에 맞는 생년월일를 입력해 주세요.',
                boo: true,
              };
              setErr(errMsg, keyId);
              return;
            }
          }
        } else {
          if (Number(text[5] + text[6]) % 2 !== 0) {
            if (Number(text[8] + text[9]) > 30) {
              const errMsg = {
                msg: '조건에 맞는 생년월일를 입력해 주세요.',
                boo: true,
              };
              setErr(errMsg, keyId);
              return;
            }
          }
        }
        const errMsg = {
          msg: '',
          boo: false,
        };
        setErr(errMsg, keyId);
        return;
      }
    },
    [keyId, setErr, valid.regExpBirthDate],
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
    <Stack gap="16px" width="320px">
      <WSubTitle title={'생년월일'} titleSx={{ lineHeight: '24px' }} />
      <Grid container className="body" sx={{ width: '100%' }}>
        <Box width="100%">
          <Input
            value={birthDate}
            onChange={onChangeInfo}
            focusOutEvent={() => onFocusOutInfo(birthDate)}
            helper={'생년월일 8자리를 입력해 주세요'}
            placeholder={'생년월일을 입력해주세요.'}
            error={err}
          />
        </Box>
      </Grid>
    </Stack>
  );
};

export default DoctorInfoBirthDate;
