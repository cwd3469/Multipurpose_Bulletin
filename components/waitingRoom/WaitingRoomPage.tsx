import { Box, Button, Grid, Stack } from '@mui/material';
import { ContantsLayout } from '@components/common/layout/Layout';
import AgoraRTC from 'agora-rtc-sdk-ng';
import WaitingRoomHeader from './modules/WaitingRoomHeader';
import WatingRoomPatientInfo from './modules/WatingRoomPatientInfo';
import WatingRoomSymptom from './modules/WatingRoomSymptom';
import useVideo from './hooks/useVideo';
import WaitingRoomVideo from './modules/WaitingRoomVideo';
import { useContext, useEffect, useState } from 'react';
import {
  WaitingGetDto,
  WaitingRoomHeaderData,
  WatingRoomAgoraData,
  WatingRoomPatientInfoData,
  WatingRoomSymptomData,
} from './type';
import WaitingUlidContext from './context/WaitingUlidContext';
import WatingRoomRestart from './modal/WatingRoomRestart';
import { StateBox } from './WaitingRoomTheme';
import { jsonStringToArrey } from '@utils/transtext';
import { WaitingInfoContext } from './context/WaitingInfoContext';

const client = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });

export type TreatmentState = 'WAIT' | 'IN_TREAT' | 'CLOSE' | 'MODIFY' | 'HOLD' | 'CANCEL';

const WaitingRoomPage = (props: { data: WaitingGetDto; isError: boolean }) => {
  const { setInUlid } = useContext(WaitingUlidContext);
  const { setInRoomState } = useContext(WaitingInfoContext);
  const [stateBoxOn] = useState<boolean>(false);
  const [restart, setRestart] = useState<boolean>(false);
  const [medicalState, setMedicalState] = useState<TreatmentState>('WAIT');
  const [headerData, setHeaderData] = useState<WaitingRoomHeaderData>();
  const [agoraData, setAgoraData] = useState<WatingRoomAgoraData>();
  const [symptomData, setSymptomData] = useState<WatingRoomSymptomData>();
  const [patientInfoData, setPatientInfoData] = useState<WatingRoomPatientInfoData>();
  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    trackState,
    remoteUsers,
    muteVideo,
    muteAudio,
    trackCall,
    statsList,
    networkState,
  } = useVideo(client, agoraData?.telemedicineType, agoraData?.agoraToken, agoraData?.agoraChannel);

  // 진료 재시작
  useEffect(() => {
    if (props.data.status === 'IN_TREAT') {
      setRestart(true);
    }
  }, [props.data.status, setInRoomState]);
  // 페이지가 사라질때 카메라 마이크 끔
  useEffect(() => {
    return () => {
      setInUlid('');
      leave();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setHeaderData({
      patientRegistrationNum: props.data.patientRegistrationNum,
      startedAt: props.data.startedAt,
      closedAt: props.data.closedAt,
      registrationUlid: props.data.registrationUlid,
      nameKo: props.data.nameKo,
      age: props.data.age,
      gender: props.data.gender,
      mobileNum: props.data.mobileNum,
      bodyProfile: props.data.bodyProfile,
    });
    setAgoraData({
      agoraToken: props.data.agoraToken,
      agoraChannel: props.data.agoraChannel,
      telemedicineType: props.data.telemedicineType,
    });
    setSymptomData({
      symptom: props.data.symptom,
      symptomImages: props.data.symptomImages,
      documents: props.data.documents ? props.data.documents : [],
      medicalHistoryTalk: props.data.medicalHistoryTalk,
    });
    setPatientInfoData({
      drinking: props.data.drinking,
      smoking: props.data.smoking,
      takingMedications: props.data.takingMedications,
      pastMedicalHistories: props.data.pastMedicalHistories,
      adverseDrugReactions: props.data.adverseDrugReactions,
    });
    setInUlid(props.data.registrationUlid);
    setMedicalState(props.data.status);
    setInRoomState(props.data.status);
    return () => {
      setHeaderData(undefined);
      setAgoraData(undefined);
      setSymptomData(undefined);
      setPatientInfoData(undefined);
    };
  }, [props.data, setInRoomState, setInUlid]);

  if (headerData && agoraData && symptomData && patientInfoData) {
    const onClickRestart = () => {
      trackCall();
      setRestart(false);
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (
      <Stack>
        <ContantsLayout bg="#F8F8F8" containerColor="#F8F8F8" sx={{ padding: '20px 0px' }}>
          <Stack
            sx={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              border: '1px solid #f2f2f2',
              padding: '20px 30px 15px',
            }}
          >
            {stateBoxOn ? (
              <>
                <StateBox>
                  {statsList.map((item, index) => {
                    return (
                      <div key={index}>
                        {item.description}:{item.value} {item.unit}
                      </div>
                    );
                  })}
                </StateBox>
                <StateBox sx={{ top: '600px', width: '500px' }}>
                  =====localAudioStats====
                  <Stack gap="10px">
                    {networkState.localAudioStats
                      ? jsonStringToArrey(networkState.localAudioStats).map((item, index) => {
                          return <div key={index}>{`${item.key} : ${item.value}`}</div>;
                        })
                      : ''}
                  </Stack>
                  =====localVideoStats====
                  <Stack gap="10px">
                    {networkState.localVideoStats
                      ? jsonStringToArrey(networkState.localVideoStats).map((item, index) => {
                          return <div key={index}>{`${item.key} : ${item.value}`}</div>;
                        })
                      : ''}
                  </Stack>
                  =====uplinkNetworkQuality=====
                  <div>{'uplinkNetworkQuality ' + networkState.uplinkNetworkQuality}</div>
                </StateBox>
              </>
            ) : (
              ''
            )}

            <WaitingRoomHeader
              trackCall={trackCall}
              headerData={headerData}
              leave={leave}
              setState={(state) => {
                setMedicalState(state);
                setInRoomState(state);
              }}
              state={medicalState}
              trackState={trackState}
              patientStatus={remoteUsers.length ? true : false}
            />
            <Box sx={{ margin: '20px 0', borderBottom: '1px solid #f2f2f2' }} />
            <Grid container gap="16px">
              <WaitingRoomVideo
                localAudioTrack={localAudioTrack}
                localVideoTrack={localVideoTrack}
                trackState={trackState}
                remoteUsers={remoteUsers}
                muteVideo={muteVideo}
                muteAudio={muteAudio}
                medicalState={medicalState}
                telemedicineType={agoraData?.telemedicineType}
              />
              <WatingRoomSymptom symptomData={symptomData} />
              <WatingRoomPatientInfo state={medicalState} patientInfoData={patientInfoData} />
            </Grid>
          </Stack>
          <WatingRoomRestart open={restart} handleClose={onClickRestart} />
        </ContantsLayout>
      </Stack>
    );
  }

  return (
    <Stack>
      <ContantsLayout bg="#F8F8F8" containerColor="#F8F8F8" sx={{ padding: '20px 0px' }}>
        <Stack
          sx={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            border: '1px solid #f2f2f2',
            padding: '20px 30px 15px',
          }}
        >
          <Box sx={{ margin: '20px 0', borderBottom: '1px solid #f2f2f2' }} />
        </Stack>
      </ContantsLayout>
    </Stack>
  );
};

export default WaitingRoomPage;
