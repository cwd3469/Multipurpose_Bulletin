import { Box, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import WAlertModal from '@components/common/modal/WAlertModal';
import { ModalType } from 'types/signin';

const HistoryPaymentFailed = (props: ModalType) => {
  const { open, handleClose } = props;

  return (
    <WAlertModal open={open} handleClose={handleClose} maxWidth={'md'}>
      <Stack padding="70px 0" justifyContent="center" width="450px">
        <Grid container justifyContent={'center'}>
          <Image
            src={'/assets/images/paymentfalid.png'}
            alt="접수 시작 아이콘"
            width="56px"
            height="56px"
          />
        </Grid>
        <Box height="40px" />
        <Typography fontSize={'22px'} textAlign={'center'} lineHeight="1.4">
          진료비 청구 요청이 실패하였습니다.
        </Typography>
        <Box height="8px" />
        <Stack>
          <Typography variant="body1" textAlign={'center'} lineHeight="1.4" color="#666">
            해당 현상이 지속될 경우 아래의 고객센터로 문의해 주세요.
          </Typography>
          <Typography variant="body1" textAlign={'center'} lineHeight="1.4" color="#666">
            - 고객센터 : 1533-1451
          </Typography>
        </Stack>
      </Stack>
    </WAlertModal>
  );
};

export default HistoryPaymentFailed;
