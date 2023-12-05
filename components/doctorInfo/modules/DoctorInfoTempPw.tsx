import React, { useCallback } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import WSubTitle from '@components/common/typography/WSubTitle';
import Input from '@components/common/inputs/Input';
import useValidation from '@hooks/useValidation';
import { DoctorInfoProps } from '../type';

const DoctorInfoTempPw = (props: DoctorInfoProps) => {
  const { state, setState, keyId, err, setErr, disabled } = props;
  const stateTxt = state as string;
  const valid = useValidation();
  //임시 비밀번호 입력 포커스 인
  const onFocusInInfo = useCallback(() => {
    const errMsg = {
      msg: '',
      boo: false,
    };
    setErr(errMsg, keyId);
  }, [keyId, setErr]);
  //임시 비밀번호 입력 포커스 아웃
  const onFocusOutInfo = useCallback(
    (txt: string) => {
      if (valid.regTempPwValid.test(txt)) {
        const msg = { msg: '', boo: false };
        setErr(msg, keyId);
        return;
      } else {
        const errMsg = {
          msg: '조건에 맞는 비밀번호를 입력해주세요.',
          boo: true,
        };
        setErr(errMsg, keyId);
        return;
      }
    },
    [keyId, setErr, valid.regTempPwValid],
  );
  //임시 비밀번호 입력
  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      if (text.length <= 16) {
        if (valid.regExpPass.test(text)) {
          setState(text, keyId);
          onFocusOutInfo(text);
        } else {
          const errMsg = {
            msg: '조건에 맞는 비밀번호를 입력해주세요.',
            boo: true,
          };
          setErr(errMsg, keyId);
        }
      }
    },
    [keyId, onFocusOutInfo, setErr, setState, valid.regExpPass],
  );

  return (
    <Stack gap="16px">
      <WSubTitle title={'임시 비밀번호'} titleSx={{ lineHeight: '24px' }} />
      <Grid container className="body" sx={{ width: '100%' }}>
        <Box width="100%">
          <Input
            type="password"
            value={stateTxt}
            onChange={onChangeInfo}
            focusOutEvent={() => onFocusOutInfo(stateTxt)}
            // focusInEvent={onFocusInInfo}
            helper={
              '최소 4자리 이상 영어 대문자, 소문자, 숫자, 특수문자를 입력해 주세요.'
            }
            placeholder={'임시 비밀번호를 입력해 주세요.'}
            disabled={disabled ? disabled : false}
            error={err}
          />
        </Box>
      </Grid>
    </Stack>
  );
};

export default DoctorInfoTempPw;
