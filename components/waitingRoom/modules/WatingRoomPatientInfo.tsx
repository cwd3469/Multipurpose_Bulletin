import { Box, Grid, Stack, Typography } from '@mui/material';
import { TreatmentState } from '../WaitingRoomPage';
import WCopyButton from '@components/common/buttons/WCopyButton';
import { WatingRoomPatientInfoData } from '../type';
import WaitingRoomTreatHistory from './WaitingRoomTreatHistory';
import WaitingRoomPatientMessage from './WaitingRoomPatientMessage';
import { useRouter } from 'next/router';

interface WatingRoomPatientInfo {
  state: TreatmentState;
  patientInfoData: WatingRoomPatientInfoData;
  patientMessage?: string;
}

const WatingRoomPatientInfo = (props: WatingRoomPatientInfo) => {
  const { state, patientInfoData, patientMessage } = props;
  const router = useRouter();
  const patientId = router.query.patientId;
  const healthInfo = {
    pastHistory: patientInfoData.pastMedicalHistories,
    takingMedications: patientInfoData.takingMedications,
    smoking: patientInfoData.smoking,
    drinking: patientInfoData.drinking,
    allergy: patientInfoData.adverseDrugReactions,
  };

  return (
    <Stack sx={{ width: '344px' }}>
      <Stack gap="12px">
        <Typography variant="subtitle1" lineHeight={'1'}>
          기본 건강 정보
        </Typography>
        <Stack
          gap="8px"
          height="152px"
          paddingRight={'8px'}
          sx={{
            overflowY: 'scroll',
          }}
        >
          <HealthInfo title="과거력" contents={healthInfo.pastHistory} />
          <HealthInfo title="흡연" contents={healthInfo.smoking} />
          <HealthInfo title="음주" contents={healthInfo.drinking} />
          <HealthInfo
            title="복용중인 약"
            contents={healthInfo.takingMedications}
          />
          <HealthInfo title="알레르기,부작용" contents={healthInfo.allergy} />
        </Stack>
      </Stack>
      <Box height={'14px'} />
      <WaitingRoomPatientMessage
        state={state}
        patientMessage={patientMessage}
      />
      {patientId ? (
        <WaitingRoomTreatHistory patientId={patientId as string} />
      ) : (
        <></>
      )}
    </Stack>
  );
};

const HealthInfo = (props: { title: string; contents: string }) => {
  const { title, contents } = props;
  return (
    <Grid
      container
      width="100%"
      gap="3px"
      justifyContent="space-between"
      alignItems="start"
    >
      <Typography variant="body1" color="#848484" width="90px">
        {title}
      </Typography>
      <Typography variant="body1" color="#000" width="150px" lineHeight="1.3x">
        {contents}
      </Typography>
      <WCopyButton copyTxt={contents} />
    </Grid>
  );
};

export default WatingRoomPatientInfo;
