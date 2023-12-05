import { Box, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import WAlertModal from '@components/common/modal/WAlertModal';

interface WatingRoomPatientAdmissionType {
  open: boolean;
  handleClose: () => void;
}

const WatingRoomPatientAdmission = (props: WatingRoomPatientAdmissionType) => {
  const { open, handleClose } = props;

  return (
    <WAlertModal open={open} handleClose={handleClose} maxWidth={'md'}>
      <Stack padding="40px 0 50px" justifyContent="center" width="350px">
        <Grid container justifyContent={'center'} paddingBottom="25px">
          <Box width="56px">
            <Image
              src={'/assets/icons/processStatusCheck.svg'}
              alt="접수 시작 아이콘"
              width={56}
              height={56}
            />
          </Box>
        </Grid>
        <Stack gap="2px">
          <Typography variant="body2" textAlign={'center'} lineHeight="1.4">
            환자가 진료실에 입장하였습니다.
          </Typography>
          <Typography variant="body2" textAlign={'center'} lineHeight="1.4">
            <span style={{ fontWeight: 'bold' }}>진료 시작 버튼</span>을 눌러
            진료를 시작해 주세요.
          </Typography>
        </Stack>
      </Stack>
    </WAlertModal>
  );
};

export default WatingRoomPatientAdmission;
