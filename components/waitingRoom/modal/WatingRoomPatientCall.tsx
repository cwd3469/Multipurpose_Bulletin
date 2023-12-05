import WModal from '@components/common/modal/WModal';
import { Box, Grid, Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import useTimer from '@hooks/useTimer';

interface WatingRoomPatientCallType {
  open: boolean;
  handleClose: () => void;
}

const WatingRoomPatientCall = (props: WatingRoomPatientCallType) => {
  const { open, handleClose } = props;
  const { seconds, reStart, minutes } = useTimer({
    time: 1,
    action: () => {
      handleClose();
      setTimeout(() => reStart(), 500);
    },
  });

  return (
    <WModal open={open}>
      <Stack padding="40px 0" justifyContent="center" width="350px">
        <Grid container justifyContent={'center'} paddingBottom="26px">
          <Box width="40px">
            <CircularProgress />
          </Box>
        </Grid>
        <Typography variant="body2" textAlign={'center'}>
          환자에게 진료실 입장을 요청했습니다.
        </Typography>
        <Typography variant="body2" textAlign={'center'}>
          환자의 입장을 위해 잠시 대기해 주세요.
        </Typography>
        <Box padding={'8px 0px 16px'}>
          <Typography
            variant="body2"
            color="#333333"
            sx={{ fontWeight: '500' }}
            textAlign={'center'}
          >{`대기시간 : ${
            minutes ? minutes + '분' : seconds + '초'
          } `}</Typography>
        </Box>
        <Typography variant="body1" color="#575F6A" textAlign="center">
          응답이 없는 경우 연락처를 참고하여 비대면 진료도 가능합니다.
        </Typography>
      </Stack>
    </WModal>
  );
};

export default WatingRoomPatientCall;
