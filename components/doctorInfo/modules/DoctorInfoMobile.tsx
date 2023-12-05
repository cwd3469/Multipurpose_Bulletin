import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import WSubTitle from '@components/common/typography/WSubTitle';
import Input from '@components/common/inputs/Input';
import { ErrorType } from 'types/signin';
import useValidation from '@hooks/useValidation';
import { DoctorInfoProps } from '../type';
import { mobileFormat, mobileFormatOff } from '@utils/formatNumber';

const DoctorInfoMobile = (props: DoctorInfoProps) => {
  const { state, setState, keyId, err, setErr } = props;
  const valid = useValidation();

  const mobile = useCallback(() => {
    return mobileFormat(state);
  }, [state])();

  //의사 정보 입력
  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      if (text.length < 14) {
        if (text.length > 3 && text.substring(0, 3) !== '010') {
          const errorMsg = {
            msg: '앞에 3자리는 010이 들어가야합니다.',
            boo: true,
          };
          setErr(errorMsg, keyId);
          return;
        } else {
          const form = text
            .replace(valid.regExpNum, '')
            .replace(valid.regExpMobile, `$1-$2-$3`);
          setState(form, keyId);
          if (form.length >= 13) {
            const errorMsg = {
              msg: '',
              boo: false,
            };
            setErr(errorMsg, keyId);
          } else {
            const errorMsg = {
              msg: '조건에 맞는 휴대폰 번호를 입력 하세요.',
              boo: true,
            };
            setErr(errorMsg, keyId);
          }
        }
      }
    },
    [keyId, setErr, setState, valid.regExpMobile, valid.regExpNum],
  );

  return (
    <Stack gap="16px" width="320px">
      <WSubTitle title={'휴대폰 번호'} titleSx={{ lineHeight: '24px' }} />
      <Grid container className="body" sx={{ width: '100%' }}>
        <Box width="100%">
          <Input
            value={mobile}
            onChange={onChangeInfo}
            helper={'숫자만 입력이 가능합니다.'}
            placeholder={'휴대폰 번호를 입력해주세요.'}
            error={err}
          />
        </Box>
      </Grid>
    </Stack>
  );
};

export default DoctorInfoMobile;
