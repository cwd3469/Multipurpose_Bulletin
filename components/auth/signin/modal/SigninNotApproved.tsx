import React from 'react';
import WAlertModal from '@components/common/modal/WAlertModal';
import { Box, Stack, Typography } from '@mui/material';
import { ModalType } from 'types/signin';
import { WDialogTitle } from '@components/common/modal/modules/WModalModules';

interface NotApproved extends ModalType {
  type?: 'signup' | 'signin';
}

const SigninNotApproved = (props: NotApproved) => {
  const { open, handleClose, type } = props;
  return (
    <WAlertModal open={open} handleClose={handleClose} maxWidth="lg">
      <Stack width="800px">
        <WDialogTitle sx={{ padding: '60px 20px' }}>
          {' '}
          가입 대기 안내
        </WDialogTitle>
        <Stack padding="0px 40px">
          <Stack
            padding="34px 40px"
            justifyContent={'flex-start'}
            sx={{
              backgroundColor: '#F8F8F8',
            }}
          >
            <Typography color="#4A4A4A" variant="h5">
              가입 승인 대기 중입니다.
            </Typography>
            <Box height="30px" />
            <Box borderTop={'1px solid #EBECED'} />
            <Box height="16px" />
            <Stack gap="5px">
              <Typography color="#4E4E4E" fontWeight={'100'} lineHeight="1.2">
                영업일 기준 2~3일 이내 제휴 담당자가 순차적으로 연락드립니다.
              </Typography>
              <Typography color="#4E4E4E" fontWeight={'100'} lineHeight="1.2">
                가입 승인 이후 서비스 이용이 가능합니다.
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Box height="116px" />
      </Stack>
    </WAlertModal>
  );
};
SigninNotApproved.defaultProps = {
  type: 'signin',
};

export default SigninNotApproved;
