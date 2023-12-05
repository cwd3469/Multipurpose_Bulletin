import React, { useCallback } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import WSubTitle from '@components/common/typography/WSubTitle';
import { DoctorInfoProps } from '../type';
import WTwoTab from '@components/common/buttons/WTwoTab';

const DoctorInfoGender = (props: DoctorInfoProps) => {
  const { state, setState, keyId, err, setErr } = props;

  const active = useCallback(() => {
    if (state === '1') {
      return true;
    } else {
      return false;
    }
  }, [state])();

  const fomatGender = useCallback((boo: boolean) => {
    return boo ? '1' : '2';
  }, []);

  //의사 정보 입력
  const onChangeInfo = useCallback(
    (boo: boolean) => {
      const gender = fomatGender(boo);
      setState(gender, keyId);
    },
    [fomatGender, keyId, setState],
  );

  return (
    <Stack gap="16px">
      <WSubTitle title={'성별'} titleSx={{ lineHeight: '24px' }} />
      <Grid container className="body" sx={{ width: '100%' }}>
        <Box width="100%">
          <WTwoTab
            tab={active}
            setTab={onChangeInfo}
            labelName={{ first: '남성', second: '여성' }}
            sx={{
              justifyContent: 'space-between',
              '& .MuiTypography-root': {
                color: '#999',
              },
              '& .MuiFormGroup-root': {
                gap: '40px',
              },
              '& .Mui-checked': {
                '& .MuiSvgIcon-root': {
                  color: '#4ac6ff',
                },
              },
              '& .MuiSvgIcon-root': {
                color: '#e7e6e7',
                fontSize: 24,
              },
            }}
          />
        </Box>
      </Grid>
    </Stack>
  );
};

export default DoctorInfoGender;
