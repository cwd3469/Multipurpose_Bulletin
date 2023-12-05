import Image from 'next/image';
import { Box, Stack, Typography } from '@mui/material';
import { ModalType } from 'types/signin';
import WConfirmModal from '@components/common/modal/WConfirmModal';
import { useToastContext } from '@hooks/useToastContext';

interface SupportDoctorSetModalType extends ModalType {
  doctorName: string;
  onClickModify: () => void;
}

const SupportDoctorSetModal = (props: SupportDoctorSetModalType) => {
  const { handleClose, open, doctorName } = props;
  const toast = useToastContext();

  const reset = () => {
    handleClose();
  };

  return (
    <WConfirmModal
      open={open}
      handleClose={reset}
      title="의사 진료 설정 변경"
      btnTitle="변경"
      activeOn
      handleEvent={props.onClickModify}
      titleSx={{
        padding: '50px 20px 60px',
        '& .MuiDialogContentText-root': {
          textAlign: 'left',
        },
      }}
    >
      <Stack width="420px">
        <Stack gap="24px">
          <Image
            src={'/assets/icons/processStatusCheck.svg'}
            alt="확인"
            width={56}
            height={56}
          />
          <Stack
            alignContent="center"
            sx={{ textAlign: 'center', color: '#666666' }}
          >
            <Typography fontSize={'22px'} lineHeight="32px">
              {doctorName} 의사의 진료 설정을
            </Typography>
            <Typography fontSize={'22px'} lineHeight="32px">
              변경하시겠습니까?
            </Typography>
          </Stack>
        </Stack>
        <Box height="85px" />
      </Stack>
    </WConfirmModal>
  );
};
export default SupportDoctorSetModal;
