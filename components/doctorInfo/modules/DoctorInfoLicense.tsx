import React, { useCallback } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import WSubTitle from '@components/common/typography/WSubTitle';
import Input from '@components/common/inputs/Input';
import useValidation from '@hooks/useValidation';

import { DoctorInfoProps } from '../type';

const DoctorInfoLicense = (props: DoctorInfoProps) => {
  const { state, setState, keyId, err, setErr } = props;
  const stateTxt = state as string;
  const valid = useValidation();

  //의사 정보 입력 포커스 인
  const onFocusInInfo = useCallback(() => {
    const errMsg = {
      msg: '',
      boo: false,
    };
    setErr(errMsg, keyId);
  }, [keyId, setErr]);
  //의사 정보 입력 포커스 아웃
  const onFocusOutInfo = useCallback(
    (text: string) => {
      if (text.length < 4) {
        const errMsg = {
          msg: '조건에 맞는 의사 면허 번호를 입력해 주세요.',
          boo: true,
        };

        setErr(errMsg, keyId);
        return;
      } else {
        const msg = { msg: '', boo: false };
        setErr(msg, keyId);
      }
    },
    [keyId, setErr],
  );

  //의사 정보 입력
  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      if (text.length <= 8) {
        if (valid.regExpNumber.test(text)) {
          setState(text, keyId);
          onFocusOutInfo(text);
        } else {
          const errMsg = {
            msg: '조건에 맞는 의사 면허 번호를 입력해 주세요.',
            boo: true,
          };
          setErr(errMsg, keyId);
        }
      }
    },
    [keyId, onFocusOutInfo, setErr, setState, valid.regExpNumber],
  );

  return (
    <Stack gap="16px" width="320px">
      <WSubTitle title={'면허 번호'} titleSx={{ lineHeight: '24px' }} />
      <Grid container className="body" sx={{ width: '100%' }}>
        <Box width="100%">
          <Input
            value={stateTxt}
            onChange={onChangeInfo}
            focusOutEvent={() => onFocusOutInfo(stateTxt)}
            // focusInEvent={onFocusInInfo}
            helper={'4자리 이상의 의사 면허 번호를 입력해 주세요.'}
            placeholder={'면허 번호를 입력해주세요.'}
            error={err}
          />
        </Box>
      </Grid>
    </Stack>
  );
};

export default DoctorInfoLicense;
