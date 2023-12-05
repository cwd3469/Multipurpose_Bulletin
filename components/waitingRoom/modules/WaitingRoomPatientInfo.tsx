import { Box, Grid, Stack, Typography } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { mobileFormat } from '@utils/formatNumber';
import { WaitingRoomHeaderData } from '../type';
import { dateFormat } from '@utils/date';
import { codeToGender } from '@utils/transtext';
import { useContext } from 'react';
import { WaitingInfoContext } from '../context/WaitingInfoContext';

interface WaitingRoomPatientInfoType {
  headerData: WaitingRoomHeaderData;
}

const WaitingRoomPatientInfo = (props: WaitingRoomPatientInfoType) => {
  const { headerData } = props;
  const { info } = useContext(WaitingInfoContext);
  const data = {
    patientId: headerData.registrationUlid,
    patientName: headerData.nameKo,
    patientAge: headerData.age,
    patientGender: codeToGender(headerData.gender),
    patientRegistrationNumber: headerData.patientRegistrationNum,
    patientMobile: headerData.mobileNum,
    bodyProfile: headerData.bodyProfile ? headerData.bodyProfile : '-',
    treatmentStart: headerData.startedAt
      ? dateFormat(headerData.startedAt).dayTime
      : info.startTime
      ? info.startTime
      : '-',
    treatmentEnd: headerData.closedAt
      ? dateFormat(headerData.closedAt).dayTime
      : info.endTime
      ? info.endTime
      : '-',
  };
  return (
    <Box>
      <Grid container justifyContent={'space-between'}>
        <Stack width="680px" gap="10px">
          <Grid
            container
            gap="15px"
            justifyContent={'flex-start'}
            alignItems="center"
            width="auto"
          >
            <Typography variant="subtitle1">
              {data.patientName} / 만 {data.patientAge}세 / {data.patientGender}
            </Typography>
            <Grid container gap="11px" width="auto">
              <Grid container width="auto" alignItems="center">
                <Typography variant="body1" color="#999">
                  진료 시작 시간
                </Typography>
                <ArrowRightIcon htmlColor="#999" fontSize="small" />
                <Typography variant="body1" color="#999">
                  {data.treatmentStart}
                </Typography>
              </Grid>
              <Grid container width="auto" alignItems="center">
                <Typography variant="body1" color="#999">
                  진료 종료 시간
                </Typography>
                <ArrowRightIcon htmlColor="#999" fontSize="small" />
                <Typography variant="body1" color="#999">
                  {data.treatmentEnd}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            gap="3px"
            justifyContent={'flex-start'}
            alignItems="center"
            width="auto"
          >
            <Grid container width="auto" alignItems="center" gap="8px">
              <Typography variant="body2" color="#666" fontWeight={100}>
                환자 등록 번호 :
              </Typography>
              <Typography variant="body2" color="#000">
                {data.patientRegistrationNumber}
              </Typography>
            </Grid>
            <Box
              sx={{ backgroundColor: '#f8f8f8', width: '1px', height: '8px' }}
            />
            <Grid container width="auto" alignItems="center" gap="8px">
              <Typography variant="body2" color="#666" fontWeight={100}>
                휴대폰 번호 :
              </Typography>
              <Typography variant="body2" color="#000">
                {mobileFormat(data.patientMobile)}
              </Typography>
            </Grid>
            <Box
              sx={{ backgroundColor: '#f8f8f8', width: '1px', height: '8px' }}
            />
            <Grid container width="auto" alignItems="center" gap="8px">
              <Typography variant="body2" color="#666" fontWeight={100}>
                신장/체중/BMI :
              </Typography>
              <Typography variant="body2" color="#000">
                {data.bodyProfile.toLocaleLowerCase()}
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Box>
  );
};

export default WaitingRoomPatientInfo;
