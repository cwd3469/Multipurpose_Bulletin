import Image from 'next/image';
import { Box, Stack, Typography } from '@mui/material';
import WConfirmModal from '@components/common/modal/WConfirmModal';

interface NonReimburseDeleteViewProps {
  open: boolean;
  handleClose: () => void;
  onDebounceFnModal: () => void;
}

const NonReimburseDeleteView = (props: NonReimburseDeleteViewProps) => {
  const { open, handleClose, onDebounceFnModal } = props;

  return (
    <WConfirmModal
      open={open}
      handleClose={handleClose}
      title={'국내 비급여 항목 삭제'}
      activeOn
      handleEvent={onDebounceFnModal}
      btnTitle={'삭제'}
    >
      <Stack gap="4px" width="420px">
        <Stack gap="24px">
          <Image
            src={'/assets/icons/processStatus.svg'}
            alt="삭제"
            width={56}
            height={56}
          ></Image>
          <Typography
            variant="h5"
            fontWeight="400"
            color="#666"
            textAlign="center"
          >
            정말 삭제하시겠습니까?
          </Typography>
          <Box height="46px" />
        </Stack>
        <Box height="48px" />
      </Stack>
    </WConfirmModal>
  );
};
export default NonReimburseDeleteView;
