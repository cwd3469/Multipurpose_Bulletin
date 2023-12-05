import React, { useCallback, useState } from 'react';
import WAlertModal from '@components/common/modal/WAlertModal';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { ModalType } from 'types/signin';
import { WDialogTitle } from '@components/common/modal/modules/WModalModules';

const SigninDormant = (props: ModalType) => {
  const { open, handleClose } = props;

  const [err, setErr] = useState<boolean>(false);
  const info = {
    lastDay: '2021년 10월 10일',
    bormantDay: '2022년 10월 10일',
  };
  const releaseEvent = useCallback(() => {
    let status = 300;
    if (status === 200) {
      alert('휴면계정 해제');
      handleClose();
      setErr(false);
    } else {
      setErr(true);
    }
  }, [handleClose]);
  return (
    <WAlertModal
      open={open}
      handleClose={handleClose}
      maxWidth="lg"
      activeOn
      handleEvent={releaseEvent}
      btnTitle={'휴면 해제'}
      closeBtnOn
    >
      <Stack width="800px">
        <WDialogTitle sx={{ padding: '60px 20px' }}> 휴면 계정 안내</WDialogTitle>
        <Stack padding="0px 40px">
          <Stack
            padding="34px 40px"
            justifyContent={'flex-start'}
            sx={{
              backgroundColor: '#F8F8F8',
            }}
          >
            <Typography color="#333" lineHeight="1.4" variant="body2">
              회원님의 계정은 어디 아파 -관리자 계정에 365일 이상
            </Typography>
            <Typography color="#333" lineHeight="1.4" variant="body2">
              로그인하지 않아 관련 법령에 따라 휴면 계정으로 전환하였습니다
            </Typography>
            <Box height="20px" />
            <Box borderTop={'1px solid #EBECED'} />
            <Box height="16px" />
            <Stack gap="10px">
              <Grid container alignItems={'center'} gap="10px">
                <Typography color="#4E4E4E" fontWeight={'100'} lineHeight="1.2" variant="body2">
                  마지막 접속일
                </Typography>
                <Typography color="#000" lineHeight="1.2" variant="body2" fontWeight={'400'}>
                  {info.lastDay}
                </Typography>
              </Grid>
              <Grid container alignItems={'center'} gap="10px">
                <Typography color="#4E4E4E" fontWeight={'100'} lineHeight="1.2" variant="body2">
                  휴면 전환일
                </Typography>
                <Typography color="#000" lineHeight="1.2" variant="body2" fontWeight={'400'}>
                  {info.lastDay}
                </Typography>
              </Grid>
            </Stack>
          </Stack>
        </Stack>
        <Box height="60px" />
        <Typography color="red" height="26px">
          {err ? '휴면 해제에 실패하였습니다. 잠시 후 다시 시도해주세요. ' : ''}
        </Typography>
      </Stack>
    </WAlertModal>
  );
};

export default SigninDormant;
