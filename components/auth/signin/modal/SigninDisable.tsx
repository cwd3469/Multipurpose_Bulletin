import React from 'react';
import WAlertModal from '@components/common/modal/WAlertModal';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { ModalType } from 'types/signin';
import { WDialogTitle } from '@components/common/modal/modules/WModalModules';

interface DisableType extends ModalType {
  position?: string;
}

const SigninDisable = (props: DisableType) => {
  const { open, handleClose, position } = props;
  return (
    <WAlertModal open={open} handleClose={handleClose} maxWidth="lg">
      <Stack width="800px">
        <WDialogTitle sx={{ padding: '60px 20px' }}> 비활성 계정 안내</WDialogTitle>
        <Stack padding="0px 40px">
          <Stack
            padding="34px 40px"
            justifyContent={'flex-start'}
            sx={{
              backgroundColor: '#F8F8F8',
            }}
          >
            <Typography color="#333" variant="body2">
              정지 사유 안내
            </Typography>
            <Box height="10px" />
            <Typography color="#4A4A4A" variant="h5">
              {position === 'medical'
                ? '- 관리자에 의해 계정이 비활성화되었습니다.'
                : '비정상적인 활동이 확인되어 정지 되었습니다'}
            </Typography>
            <Box height="30px" />
            <Box borderTop={'1px solid #EBECED'} />
            <Box height="16px" />
            <Stack gap="5px">
              <Typography color="#4E4E4E" fontWeight={'100'} lineHeight="1.2">
                {position === 'medical'
                  ? '- 관리자에 의해 계정이 비활성화되었습니다.'
                  : '약관 및 정책에 따른 사유로 계정이 정지되었습니다.'}
              </Typography>
              <Typography color="#4E4E4E" fontWeight={'100'} lineHeight="1.2">
                {position === 'medical'
                  ? '계정에 대한 문의는 - 관리자에게 문의해 주세요.'
                  : '계정 관련 문의는 아래 고객센터로 문의 바랍니다.'}
              </Typography>
              <Box height="20px" />
              {position === 'medical' ? (
                <Box height="17px" />
              ) : (
                <Grid container gap="10px" alignItems={'center'}>
                  <Typography color="#4E4E4E" fontWeight={'100'} lineHeight="1.2">
                    - 고객센터
                  </Typography>
                  <Box height="14px" width="1px" bgcolor={'#CCC'} />
                  <Typography color="#000" lineHeight="1.2">
                    02-123-123
                  </Typography>
                </Grid>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Box height="80px" />
      </Stack>
    </WAlertModal>
  );
};
SigninDisable.defaultProps = {
  type: 'signin',
};

export default SigninDisable;
