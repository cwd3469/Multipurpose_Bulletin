import React, { useCallback } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ModalType } from 'types/signin';
import WAlertModal from '@components/common/modal/WAlertModal';

interface ErrorModalType extends ModalType {
  event: () => void;
}

const ErrorModal = (props: ErrorModalType) => {
  const { open, handleClose, event } = props;

  const router = useRouter();

  const handleEvent = useCallback(() => {
    event();
    handleClose();
  }, [event, handleClose]);

  return (
    <WAlertModal
      maxWidth="lg"
      title="안내"
      btnTitle={'확인'}
      handleEvent={handleEvent}
      open={open}
      activeOn
      titleSx={{ padding: '50px 0' }}
    >
      <>
        <Stack width="450px" gap="24px">
          <Grid container justifyContent="center">
            <Image
              src={'/assets/images/warningIcon.png'}
              alt="접수 시작 아이콘"
              width="52px"
              height="47px"
            />
          </Grid>

          <Box textAlign="center">
            <Typography
              color="#666"
              textAlign="center"
              fontSize="24px"
              lineHeight={'1.2'}
            >
              일시적인 오류가 발생하여
            </Typography>
            <Typography
              color="#666"
              textAlign="center"
              fontSize="24px"
              lineHeight={'1.2'}
            >
              로그인 페이지로 이동합니다.
            </Typography>
          </Box>
        </Stack>
        <Box height="150px" />
      </>
    </WAlertModal>
  );
};

export default ErrorModal;
