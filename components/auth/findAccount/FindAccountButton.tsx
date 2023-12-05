import { Button, Grid, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import FindAccNursingNum from './modal/FindAccNursingNum';
import FindAccountStepOne from './modal/FindAccountStepOne';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const FindAccountButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  /** 계정 찾기 모달 on 이벤트 */
  const modalOpen = useCallback(() => setOpen(true), [setOpen]);
  const modalClose = useCallback(() => setOpen(false), [setOpen]);
  return (
    <Grid
      container
      justifyContent={'space-between'}
      gap="10px"
      alignItems={'center'}
    >
      <Typography
        variant="button"
        display="block"
        fontWeight="normal"
        lineHeight={'1'}
        color="#555555"
        letterSpacing="-0.13px"
      >
        계정을 잊어버리셨나요?
      </Typography>
      <Button
        sx={{
          padding: '0px',
          color: '#000',
          fontWeight: 'normal',
          fontSize: '13px',
          letterSpacing: '-0.13px',
        }}
        onClick={modalOpen}
      >
        계정 찾기{' '}
        <ArrowForwardIosIcon sx={{ fontSize: '11px', width: '18px' }} />
      </Button>
      <FindAccNursingNum open={open} handleClose={modalClose} />
    </Grid>
  );
};

export default FindAccountButton;
