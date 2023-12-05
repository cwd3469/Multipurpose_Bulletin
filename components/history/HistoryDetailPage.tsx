import { Box, Grid, Typography, Stack } from '@mui/material';
import { ContantsLayout } from '@components/common/layout/Layout';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import WaitingRoomHeader from '@components/waitingRoom/modules/WaitingRoomHeader';
import WatingRoomSymptom from '@components/waitingRoom/modules/WatingRoomSymptom';
import WatingRoomPatientInfo from '@components/waitingRoom/modules/WatingRoomPatientInfo';
import { TreatmentState } from '@components/waitingRoom/WaitingRoomPage';
import {
  WaitingRoomHeaderData,
  WatingRoomPatientInfoData,
  WatingRoomSymptomData,
} from '@components/waitingRoom/type';
import useHistoryDetailTreat from './hooks/useHistoryDetailTreat';
import WaitingUlidContext from '@components/waitingRoom/context/WaitingUlidContext';

const HistoryDetailPage = (props: { ulid: string }) => {
  const { query } = useRouter();
  const { ulid, setInUlid } = useContext(WaitingUlidContext);
  const { historyDetailData, isLoading } = useHistoryDetailTreat(props.ulid);
  const [medicalState, setMedicalState] = useState<TreatmentState>('MODIFY');
  const [headerData, setHeaderData] = useState<WaitingRoomHeaderData>();
  const [symptomData, setSymptomData] = useState<WatingRoomSymptomData>();
  const [patientMessage, setPatientMessage] = useState<string>();
  const [patientInfoData, setPatientInfoData] =
    useState<WatingRoomPatientInfoData>();

  useEffect(() => {
    if (historyDetailData) {
      setHeaderData({
        patientRegistrationNum: historyDetailData.patientRegistrationNum,
        startedAt: historyDetailData.startedAt,
        closedAt: historyDetailData.closedAt,
        registrationUlid: historyDetailData.registrationUlid,
        nameKo: historyDetailData.nameKo,
        age: historyDetailData.age,
        gender: historyDetailData.gender,
        mobileNum: historyDetailData.mobileNum,
        bodyProfile: historyDetailData.bodyProfile,
      });
      setSymptomData({
        symptom: historyDetailData.symptom,
        symptomImages: historyDetailData.symptomImages,
        documents: historyDetailData.documents
          ? historyDetailData.documents
          : [],
        medicalHistoryTalk: historyDetailData.medicalHistoryTalk,
      });
      setPatientInfoData({
        drinking: historyDetailData.drinking,
        smoking: historyDetailData.smoking,
        takingMedications: historyDetailData.takingMedications,
        pastMedicalHistories: historyDetailData.pastMedicalHistories,
        adverseDrugReactions: historyDetailData.adverseDrugReactions,
      });
      setPatientMessage(historyDetailData.patientMessage);
    }
    return () => {
      setHeaderData(undefined);
      setSymptomData(undefined);
      setPatientInfoData(undefined);
    };
  }, [historyDetailData]);

  useEffect(() => {
    setInUlid(props.ulid);
    return () => {
      setInUlid('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (headerData && symptomData && patientInfoData) {
    return (
      <Stack>
        <ContantsLayout
          bg="#F8F8F8"
          containerColor="#F8F8F8"
          sx={{ padding: '20px 0' }}
        >
          <Stack
            sx={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              border: '1px solid #f2f2f2',
              padding: '16px 30px 10px',
            }}
          >
            <WaitingRoomHeader
              state={medicalState}
              headerData={headerData}
              trackState={false}
              patientStatus={false}
            />
            <Box sx={{ margin: '20px 0', borderBottom: '1px solid #f2f2f2' }} />
            <Grid
              container
              padding={'0 0 10px'}
              gap="16px"
              justifyContent={'center'}
            >
              <WatingRoomSymptom symptomData={symptomData} />
              <WatingRoomPatientInfo
                state={medicalState}
                patientInfoData={patientInfoData}
                patientMessage={patientMessage}
              />
            </Grid>
          </Stack>
        </ContantsLayout>
      </Stack>
    );
  }

  return <></>;
};

export default HistoryDetailPage;
