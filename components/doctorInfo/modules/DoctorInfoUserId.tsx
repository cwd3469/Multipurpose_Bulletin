import React, { useCallback } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import WSubTitle from '@components/common/typography/WSubTitle';
import Input from '@components/common/inputs/Input';
import useValidation from '@hooks/useValidation';
import { DoctorInfoProps } from '../type';

const DoctorInfoUserId = (props: DoctorInfoProps) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();
  const errMsg = useCallback(() => {
    const info = {
      msg: '조건에 맞는 아이디를 입력해 주세요.',
      boo: true,
    };
    return info;
  }, [])();
  const successMsg = useCallback(() => {
    const info = {
      msg: '',
      boo: false,
    };
    return info;
  }, [])();

  //의사 정보 입력 포커스 아웃
  const onFocusOutInfo = useCallback(
    (txt: string) => {
      if (txt.length < 4) {
        setErr(errMsg, keyId);
        return;
      }
      setErr(successMsg, keyId);
    },
    [errMsg, keyId, setErr, successMsg],
  );
  //의사 정보 입력
  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      if (text.length <= 20) {
        if (valid.regExpId.test(text)) {
          setState(text, keyId);
          onFocusOutInfo(text);
        } else {
          setErr(errMsg, keyId);
        }
      }
    },
    [errMsg, keyId, onFocusOutInfo, setErr, setState, valid.regExpId],
  );

  return (
    <Stack gap="16px">
      <WSubTitle title={'아이디'} titleSx={{ lineHeight: '24px' }} />
      <Grid container className="body" sx={{ width: '100%' }}>
        <Box width="100%">
          <Input
            value={stateTxt}
            onChange={onChangeInfo}
            helper={'4자이상의 아이디(영문 또는 숫자)를 입력해주세요.'}
            placeholder={'아이디를 입력해주세요.'}
            disabled={disabled ? disabled : false}
            error={err}
          />
        </Box>
      </Grid>
    </Stack>
  );
};

export default DoctorInfoUserId;
