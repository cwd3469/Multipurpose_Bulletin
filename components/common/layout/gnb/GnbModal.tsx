import React from 'react';
import WConfirmModal from '@components/common/modal/WConfirmModal';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { GnbMobalType } from './types';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useDebounceFn } from 'ahooks';
import Layout from '../Layout';
const GnbModal = (props: GnbMobalType) => {
  const { open, handleClose, timer, resend } = props;
  const onDebounceFnResend = useDebounceFn(resend, {
    wait: 300,
  });
  return (
    <WConfirmModal
      open={open}
      handleClose={handleClose}
      btnTitle="로그인 연장"
      handleEvent={onDebounceFnResend.run}
      activeOn
    >
      <Layout padding="50px 0px 0px">
        <Stack gap="16px">
          <Typography
            color="#1a1a1a"
            variant="h5"
            textAlign="center"
            fontWeight="700"
          >
            자동 로그아웃 안내
          </Typography>
          <Stack>
            <Typography color="#4A4A4A" textAlign="center" variant="body2">
              장시간 활동이 없어 자동으로 로그아웃 됩니다.
            </Typography>
            <Typography color="#4A4A4A" textAlign="center" variant="body2">
              계속 이용하시려면 로그인 시간을 연장해 주세요.
            </Typography>
          </Stack>
        </Stack>
        <Box height="48px" />
        <Stack gap="8px">
          <Typography textAlign="center" variant="body2" fontWeight={'300'}>
            로그아웃까지 남은 시간
          </Typography>
          <Grid
            container
            justifyContent={'center'}
            alignItems="center"
            gap="11px"
          >
            <AccessTimeIcon sx={{ color: '#999999', fontSize: '21px' }} />
            <Typography
              fontSize={'28px'}
              lineHeight="32px"
              fontWeight={'normal'}
              textAlign={'center'}
            >
              {timer}
            </Typography>
          </Grid>
        </Stack>
        <Box height="118px" />
      </Layout>
    </WConfirmModal>
  );
};

GnbModal.defaultProps = {
  type: 'signin',
};

export default GnbModal;
