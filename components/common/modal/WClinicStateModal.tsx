import WAlertModal from '@components/common/modal/WAlertModal';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { ModalType } from 'types/signin';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const WClinicStateModal = (props: ModalType) => {
  const { open, handleClose } = props;
  const router = useRouter();
  const handleEvent = useCallback(() => {
    router.replace('/doctor/telemedicine/queueing');
    handleClose();
  }, [handleClose, router]);
  return (
    <WAlertModal
      open={open}
      handleEvent={handleEvent}
      btnTitle="진료실 나가기"
      maxWidth="lg"
      style={{
        '& .MuiDialogActions-root': {
          '& .MuiButtonBase-root': {
            padding: '16px',
          },
        },
      }}
    >
      <Stack
        width="350px"
        padding={'40px 0 55px'}
        textAlign="center"
        gap="24px"
      >
        <Image
          src={'/assets/icons/processStatusClose.svg'}
          alt="접수 마감 아이콘"
          width="55px"
          height="55px"
        />
        <Box>
          <Typography variant="body2">
            해당 비대면 진료 접수 건은 이미 취소되어
          </Typography>
          <Typography variant="body2">
            진료 대기열 화면으로 이동합니다.
          </Typography>
        </Box>
      </Stack>
    </WAlertModal>
  );
};

export default WClinicStateModal;
