import * as React from 'react';
import { Box, Popover, Button, Grid, Typography, styled } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { colors } from '../../../../styles';
import { useRouter } from 'next/router';
import UserInfoContext from '../../../../hooks/contexts/UserInfoContext';

const GnbPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPaper-root': {
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
    borderRadius: '12px',
  },
}));

export default function GnbMyInfo(props: { disabled?: boolean }) {
  const { disabled } = props;
  const { signOut, handleTokenInfo } = React.useContext(UserInfoContext);
  const { permission, accountInfo } = React.useContext(UserInfoContext);
  const router = useRouter();

  const gnbInfo = React.useCallback(() => {
    const name =
      permission === 'HOSPITAL_DOCTOR'
        ? '- 의사님'
        : permission === 'HOSPITAL_ADMIN'
        ? '- -관리자님'
        : '- 진료 지원님';
    return { name };
  }, [permission])();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const mypageOpen = () => {
    handleTokenInfo();
    switch (permission) {
      case 'HOSPITAL_DOCTOR':
        return router.push(
          {
            pathname: `/doctor/myinfo`,
          },
          undefined,
          {
            shallow: true,
          },
        );
      case 'MEDICAL_SUPPORT':
        return router.push(
          {
            pathname: `/medical-support/myinfo`,
          },
          undefined,
          {
            shallow: true,
          },
        );
      case 'HOSPITAL_ADMIN':
        return router.push(
          {
            pathname: `/hospital-admin/myinfo`,
          },
          undefined,
          {
            shallow: true,
          },
        );
      default:
        break;
    }
  };

  const signoutOn = signOut;

  if (accountInfo)
    return (
      <div>
        <Button
          disabled={disabled}
          aria-describedby={id}
          variant="text"
          onClick={handleClick}
          color="info"
          sx={{ padding: '0px', fontWeight: 'bold' }}
        >
          <span>내기본정보</span>
          <ArrowDropDownIcon />
        </Button>
        <GnbPopover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Grid
            container
            sx={{
              padding: '28px 20px 12px',
            }}
            flexDirection="column"
            width="220px"
          >
            <Typography variant="h5">{accountInfo.nameKo} 님</Typography>
            <Box height="16px" />
            <Box>
              <Typography variant="body2" lineHeight={'22px'}>
                {gnbInfo.name}
              </Typography>
              <Typography variant="body2" lineHeight={'22px'}>
                환영합니다👋🏻
              </Typography>
            </Box>
            <Box height="32px" />
            <Button
              variant="text"
              sx={{
                color: colors.gray_01,
                backgroundColor: colors.gray_09,
                fontWeight: '700',
                padding: '10px',
                borderRadius: '6px',
              }}
              onClick={mypageOpen}
            >
              기본정보
            </Button>
            <Button
              variant="text"
              sx={{
                color: colors.gray_07,
                padding: '10px',
                '&:hover': {
                  backgroundColor: colors.gray_11,
                },
              }}
              onClick={signoutOn}
            >
              로그아웃
            </Button>
          </Grid>
        </GnbPopover>
      </div>
    );
  return <></>;
}
