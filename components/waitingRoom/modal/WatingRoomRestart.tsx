import { Grid, Stack, Typography } from '@mui/material';
import WAlertModal from '@components/common/modal/WAlertModal';
import Image from 'next/image';

interface WatingRoomRestartType {
  open: boolean;
  handleClose: () => void;
}

const WatingRoomRestart = (props: WatingRoomRestartType) => {
  const { open, handleClose } = props;

  return (
    <WAlertModal
      open={open}
      handleClose={handleClose}
      handleEvent={handleClose}
      maxWidth="lg"
    >
      <Stack padding="40px 0px 52px" justifyContent="center" width="350px">
        <Grid container justifyContent={'center'} paddingBottom="16px">
          <Stack
            width="55px"
            height="55px"
            borderRadius="100%"
            sx={{
              backgroundColor: '#ebf3fe',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              src={'/assets/icons/restart.svg'}
              alt="다시시작 아이콘"
              width={30}
              height={30}
            />
          </Stack>
        </Grid>
        <Typography variant="body2" textAlign={'center'} lineHeight="1.2">
          진료 중 대기실을 이탈하셨습니다.
        </Typography>
        <Typography variant="body2" textAlign={'center'} lineHeight="1.2">
          다시 진료를 이어서 진행해 주세요.
        </Typography>
      </Stack>
    </WAlertModal>
  );
};

export default WatingRoomRestart;
