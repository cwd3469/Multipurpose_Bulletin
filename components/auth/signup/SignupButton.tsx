import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import SignupStepOne from '@components/auth/signup/modal/SignupStepOne';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SignupButton = () => {
  const [modalOn, setModalOn] = useState<boolean>(false);
  const handleOpen = () => setModalOn(true);
  const handleClose = () => setModalOn(false);
  return (
    <Grid container justifyContent={'space-between'} gap="0px" alignItems="center">
      <Typography
        variant="button"
        display="block"
        fontWeight="normal"
        lineHeight={'1'}
        color="#555555"
        letterSpacing="-0.13px"
      >
        - 제휴를 하고 싶으신가요?
      </Typography>
      <Button
        sx={{
          padding: '0px',
          color: '#000',
          fontWeight: 'normal',
          fontSize: '0.813em',
          letterSpacing: '-0.13px',
        }}
        variant="text"
        onClick={handleOpen}
      >
        - 관리자 회원가입 <ArrowForwardIosIcon sx={{ fontSize: '0.688em', width: '18px' }} />
      </Button>
      <SignupStepOne open={modalOn} handleClose={handleClose} />
    </Grid>
  );
};

export default SignupButton;
