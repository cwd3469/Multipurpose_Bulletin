import React, { useCallback } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import WSubTitle from '@components/common/typography/WSubTitle';
import Input from '@components/common/inputs/Input';
import useValidation from '@hooks/useValidation';
import { DoctorInfoProps } from '../type';

const DoctorInfoName = (props: DoctorInfoProps) => {
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
    (txt: string) => {
      if (!valid.regKorean.test(txt)) {
        const errMsg = {
          msg: '조건에 맞는 이름을 입력해 주세요.',
          boo: true,
        };
        setErr(errMsg, keyId);
        return;
      }
      if (txt.length < 2) {
        const errMsg = {
          msg: '조건에 맞는 이름을 입력해 주세요.',
          boo: true,
        };
        setErr(errMsg, keyId);
        return;
      }
      const msg = { msg: '', boo: false };
      setErr(msg, keyId);
    },
    [keyId, setErr, valid.regKorean],
  );

  //의사 정보 입력
  const onChangeInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      if (text.length <= 5) {
        if (valid.regKorean.test(text)) {
          setState(text, keyId);

          onFocusOutInfo(text);
        } else {
          const errMsg = {
            msg: '조건에 맞는 이름을 입력해 주세요.',
            boo: true,
          };
          setErr(errMsg, keyId);
        }
      }
    },
    [keyId, onFocusOutInfo, setErr, setState, valid.regKorean],
  );
  return (
    <Stack gap="16px" width="320px">
      <WSubTitle title={'이름'} titleSx={{ lineHeight: '24px' }} />
      <Grid container className="body" sx={{ width: '100%' }}>
        <Box width="100%">
          <Input
            value={stateTxt}
            onChange={onChangeInfo}
            focusOutEvent={() => onFocusOutInfo(stateTxt)}
            // focusInEvent={onFocusInInfo}
            helper={'한글만 입력이 가능합니다.'}
            placeholder={'이름을 입력해주세요.'}
            error={err}
          />
        </Box>
      </Grid>
    </Stack>
  );
};

export default DoctorInfoName;
