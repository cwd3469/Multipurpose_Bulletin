import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  ILocalVideoTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
} from 'agora-rtc-sdk-ng';
import Image from 'next/image';
import {
  Box,
  Button,
  Grid,
  Stack,
  styled,
  SxProps,
  Theme,
} from '@mui/material';
import { TreatmentState } from '../WaitingRoomPage';
import { WaitingInfoContext } from '../context/WaitingInfoContext';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export interface WaitingRoomVideoType {
  localVideoTrack?: ILocalVideoTrack;
  localAudioTrack?: ILocalAudioTrack;
  trackState: boolean;
  remoteUsers: IAgoraRTCRemoteUser[];
  muteVideo: () => Promise<boolean | undefined>;
  muteAudio: () => Promise<boolean | undefined>;
  medicalState: TreatmentState;
  telemedicineType?: string;
}

const VideoStatusBox = (props: {
  trackState: boolean;
  remoteUsers: IAgoraRTCRemoteUser[];
  medicalState: TreatmentState;
  remoteMuteAudioState: boolean;
  remoteMuteVideoState: boolean;
  videoOn: boolean;
  audioOn: boolean;
  leave: boolean;
  state?: string;
}) => {
  const {
    trackState,
    remoteUsers,
    medicalState,
    remoteMuteAudioState,
    remoteMuteVideoState,
    audioOn,
    videoOn,
    leave,
    state,
  } = props;
  const router = useRouter();
  const patientId = router.query.patientId;
  const cookie = getCookie('patients-list');
  const list: string[] = useCallback(() => {
    return cookie ? JSON.parse(cookie as string) : [];
  }, [cookie])();
  const entryCheck = list.includes(patientId as string);

  return (
    <PatientStatusBox
      className={`${trackState ? 'in-treat' : ''} ${
        audioOn ? 'mute-voice' : ''
      } ${remoteMuteAudioState ? 'remote-mute-voice' : ''} ${
        state === 'VIDEO_CALL'
          ? medicalState === 'IN_TREAT'
            ? 'video-call'
            : 'voice-call'
          : 'voice-call'
      } ${
        state === 'VIDEO_CALL'
          ? medicalState === 'IN_TREAT'
            ? leave
              ? ''
              : trackState
              ? remoteMuteAudioState
                ? ''
                : remoteMuteVideoState
                ? ''
                : audioOn
                ? ''
                : videoOn
                ? ''
                : remoteUsers.length
                ? 'display-none'
                : entryCheck
                ? ''
                : ''
              : ''
            : ''
          : ''
      }`}
    >
      <>
        <>
          {medicalState === 'WAIT' ? (
            remoteUsers.length ? (
              <>
                {/* 대기중 환자 없을때 */}
                <p>환자가 진료실에 입장 하였습니다.</p>
                <p>진료를 진행해 주세요.</p>
              </>
            ) : (
              <>
                {/* 대기중 환자 없을때 */}
                <p>환자가 진료실에 입장하지 않았습니다.</p>
                <p>환자 호출 버튼을 눌러주세요.</p>
              </>
            )
          ) : (
            ''
          )}
        </>
        <>
          {medicalState === 'HOLD' ? (
            remoteUsers.length ? (
              <>
                {/* 대기중 환자 없을때 */}
                <p>환자가 진료실에 입장 하였습니다.</p>
                <p>진료를 진행해 주세요.</p>
              </>
            ) : (
              <>
                {/* 대기중 환자 없을때 */}
                <p>환자가 진료실에 입장하지 않았습니다.</p>
                <p>환자 호출 버튼을 눌러주세요.</p>
              </>
            )
          ) : (
            ''
          )}
        </>
        {medicalState === 'IN_TREAT' ? (
          leave ? (
            <p>진료가 끝났습니다.</p>
          ) : trackState ? (
            remoteMuteAudioState ? (
              <p>진료 중 사용자의 마이크가 꺼졌습니다.</p>
            ) : remoteMuteVideoState ? (
              <p>진료 중 사용자의 카메라가 꺼졌습니다.</p>
            ) : audioOn ? (
              <p>비대면 진료를 위해 마이크를 켜주세요.</p>
            ) : videoOn ? (
              <p>비대면 진료를 위해 카메라를 켜주세요.</p>
            ) : remoteUsers.length ? (
              <>
                {/* 진료중 환자가 있을때*/}
                <p>환자와 전화 연결이 되었습니다.</p>
                <p>진료를 진행해 주세요.</p>
              </>
            ) : entryCheck ? (
              <p>환자가 진료실에서 이탈하였습니다.</p>
            ) : (
              <p>환자가 입장 하지 않았습니다.</p>
            )
          ) : (
            <>재접속 해주세요.</>
          )
        ) : (
          ''
        )}
      </>
    </PatientStatusBox>
  );
};

export default function WaitingRoomVideo(props: WaitingRoomVideoType) {
  const {
    localVideoTrack,
    localAudioTrack,
    trackState,
    remoteUsers,
    muteVideo,
    muteAudio,
    medicalState,
    telemedicineType,
  } = props;
  let state = telemedicineType;
  const { leave } = useContext(WaitingInfoContext);
  const [audioOn, setAudioOn] = useState<boolean>(false);
  const [videoOn, setVideoOn] = useState<boolean>(false);
  const [remoteMuteAudioState, setRemoteMuteAudioState] =
    useState<boolean>(false);
  const [remoteMuteVideoState, setRemoteMuteVideoState] =
    useState<boolean>(false);
  useEffect(() => {
    if (remoteUsers.length) {
      if (remoteUsers[0].audioTrack) {
        setRemoteMuteAudioState(false);
      } else {
        setRemoteMuteAudioState(true);
      }
    }
  }, [remoteUsers]);
  useEffect(() => {
    if (remoteUsers.length) {
      if (remoteUsers[0].videoTrack) {
        setRemoteMuteVideoState(false);
      } else {
        setRemoteMuteVideoState(true);
      }
    }
  }, [remoteUsers]);
  const cookie = getCookie('patients-list');
  useEffect(() => {
    if (cookie) {
      const list: string[] = JSON.parse(cookie as string);
    }
  }, [cookie]);
  return (
    <WatingRoomVideoBox
      sx={{
        backgroundColor:
          state === 'VOICE_CALL' ? (trackState ? '#f3f3f3' : '#000') : '#000',
      }}
    >
      <div className="call">
        <div className="player-container">
          {state === 'VIDEO_CALL' ? (
            trackState ? (
              <div className="local-player-wrapper">
                <DoctorMediaPlayer
                  videoTrack={localVideoTrack}
                  audioTrack={localAudioTrack}
                ></DoctorMediaPlayer>
              </div>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          {state === 'VIDEO_CALL' ? (
            <></>
          ) : (
            <VoiceCallIconBox>
              <Image
                src={
                  trackState
                    ? audioOn
                      ? '/assets/icons/audio_off_icon.svg'
                      : remoteMuteAudioState
                      ? '/assets/icons/audio_off_icon.svg'
                      : '/assets/gif/audio_wave.gif'
                    : '/assets/icons/audio_off_icon.svg'
                }
                alt="음성진료 아이콘"
                width={100}
                height={100}
              />
            </VoiceCallIconBox>
          )}
          {remoteUsers.length ? (
            remoteUsers.map((user, index) => (
              <div className="remote-player-wrapper" key={index}>
                <MediaPlayer
                  videoTrack={
                    state === 'VIDEO_CALL' ? user.videoTrack : undefined
                  }
                  audioTrack={user.audioTrack}
                  sx={{
                    backgroundColor:
                      state === 'VIDEO_CALL'
                        ? '#000'
                        : trackState
                        ? '#f3f3f3'
                        : '#000',
                  }}
                ></MediaPlayer>
              </div>
            ))
          ) : (
            <></>
          )}
          <VideoStatusBox
            trackState={trackState}
            remoteUsers={remoteUsers}
            medicalState={medicalState}
            remoteMuteAudioState={remoteMuteAudioState}
            remoteMuteVideoState={remoteMuteVideoState}
            videoOn={videoOn}
            audioOn={audioOn}
            leave={leave}
            state={state}
          />
          {trackState ? (
            <Grid
              className="video-grid"
              container
              sx={{
                justifyContent:
                  state === 'VIDEO_CALL' ? 'space-between' : 'center',
              }}
            >
              <Button
                className="round-btn"
                variant="contained"
                color="info"
                onClick={async () => {
                  await muteAudio().then((res) => {
                    setAudioOn(res ? res : false);
                  });
                }}
                disabled={medicalState === 'IN_TREAT' ? false : true}
              >
                <Image
                  src={
                    audioOn
                      ? '/assets/icons/audioMuted.svg'
                      : '/assets/icons/audio.svg'
                  }
                  alt="녹음버튼"
                  width={27}
                  height={34}
                ></Image>
              </Button>
              {state === 'VIDEO_CALL' ? (
                <Button
                  className="round-btn"
                  variant="contained"
                  color="info"
                  onClick={async () => {
                    await muteVideo().then((res) => {
                      setVideoOn(res ? res : false);
                    });
                  }}
                  disabled={medicalState === 'IN_TREAT' ? false : true}
                >
                  <Image
                    src={
                      videoOn
                        ? '/assets/icons/videoStop.svg'
                        : '/assets/icons/video.svg'
                    }
                    alt="실시간 영상"
                    width={37}
                    height={38}
                  ></Image>
                </Button>
              ) : (
                ''
              )}
            </Grid>
          ) : (
            <></>
          )}
        </div>
      </div>
    </WatingRoomVideoBox>
  );
}

export interface VideoPlayerProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
}

export interface DoctorVideoProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
  sx?: SxProps<Theme>;
}

const DoctorMediaPlayer = (props: DoctorVideoProps) => {
  const { videoTrack, audioTrack, sx } = props;
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    videoTrack?.play(container.current);
    return () => {
      videoTrack?.stop();
    };
  }, [container, videoTrack]);

  return (
    <DoctorVideoBox ref={container} className="doctor-video-player" sx={sx} />
  );
};

const MediaPlayer = (props: DoctorVideoProps) => {
  const { videoTrack, audioTrack, sx } = props;
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    videoTrack?.play(container.current);
    return () => {
      videoTrack?.stop();
    };
  }, [container, videoTrack]);

  useEffect(() => {
    audioTrack?.play();
    return () => {
      audioTrack?.stop();
    };
  }, [audioTrack]);

  return (
    <WatingRoomVideoBox
      ref={container}
      className="patient-video-player"
      sx={sx}
    />
  );
};

export const WatingRoomVideoBox = styled(Box)(({ theme }) => ({
  width: '360px',
  height: '668px',
  backgroundColor: '#000',
  borderRadius: '6px',
  overflow: 'hidden',
  color: '#fff',
  position: 'relative',
  '& .video-grid': {
    width: '200px',
    position: 'absolute',
    bottom: '80px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  '& .round-btn': {
    backgroundColor: '#fff',
    width: '80px',
    minWidth: 'auto',
    height: '80px',
    borderRadius: '100%',
    boxShadow: 'none',
    '&:disabled': {
      backgroundColor: '#333',
    },
  },
}));
const DoctorVideoBox = styled(Box)(({ theme }) => ({
  width: '112px',
  height: '186px',
  backgroundColor: '#000',
  borderRadius: '4px',
  overflow: 'hidden',
  color: '#fff',
  position: 'absolute',
  right: '24px',
  top: '24px',
  zIndex: '3',
}));

const PatientStatusBox = styled(Stack)(({ theme }) => ({
  ...theme.typography.body1,
  backgroundColor: '#666666',
  padding: '20px',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '328px',
  textAlign: 'center',
  fontSize: '14px',
  color: '#cecece',
  justifyContent: 'center',
  borderRadius: '6px',
  zIndex: '9',
  '&.video-call': {
    display: 'none',
    top: '94%',
    padding: '10px 16px',
    ...theme.typography.body2,
    '&.in-treat': {
      display: 'block',
      backgroundColor: 'rgba(248, 248, 248, 0.9)',
      color: '#333',
      '&.display-none': {
        display: 'none',
      },
    },
  },
  '&.voice-call': {
    '&.in-treat': {
      backgroundColor: '#f3f3f3',
      color: '#00a0ea',
      '&.mute-voice': {
        color: '#333',
      },
      '&.remote-mute-voice': {
        color: '#333',
      },
    },
  },
}));

const VoiceCallIconBox = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '33%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  fontSize: '14px',
  justifyContent: 'center',
  width: '98px',
  zIndex: '9',
}));
