import { Box, Grid, Stack, Typography } from '@mui/material';
import { DisabledBox } from '../MyinfoTheme';
import MyinfoSection from './MyinfoSection';

const MyinfoGuide = () => {
  const wInfo = {
    customerInfo: '정보 변경이 필요하시면 고객센터로 문의해 주세요',
    openTime: '(09:00 ~ 18:00 / 토, 일, 공휴일 휴무)',
    phone: '1533-1451',
  };
  return (
    <MyinfoSection title="고객센터">
      <Stack
        sx={{
          borderRadius: '5px',
          backgroundColor: '#f8f8f8',
          padding: '16px',
        }}
      >
        <Typography color="#666">{wInfo.customerInfo}</Typography>
        <Box sx={{ height: '44px' }} />
        <Grid container gap="8px" alignItems={'center'}>
          <Typography variant="subtitle1" color="#666">
            {wInfo.phone}
          </Typography>
          <Typography color="#666">{wInfo.openTime}</Typography>
        </Grid>
      </Stack>
    </MyinfoSection>
  );
};

export default MyinfoGuide;
