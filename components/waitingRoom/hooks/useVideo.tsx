/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  MicrophoneAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  ILocalVideoTrack,
  ILocalAudioTrack,
  ConnectionState,
  ConnectionDisconnectedReason,
  NetworkQuality,
} from 'agora-rtc-sdk-ng';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

type StateList = {
  description: string;
  value: string | number;
  unit: string;
};

let statsInterval = null;

const useVideo = (
  client: IAgoraRTCClient | undefined,
  telemedicineType?: string,
  agoraToken?: string,
  channelName?: string,
) => {
  const router = useRouter();
  const patientId = router.query.patientId;
  const appid = `${process.env.NEXT_PUBLIC_AGORA_APP_ID}`;
  // useVideo state
  const [localVideoTrack, setLocalVideoTrack] = useState<ILocalVideoTrack | undefined>(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | undefined>(undefined);
  const [trackState, setTrackState] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [localVideoMuteState, setLocalVideoMuteState] = useState(false);
  const [localAudioMuteState, setLocalAudioMuteState] = useState(false);
  //통상 상태 확인
  const [statsList, setStatsList] = useState<StateList[]>([]);
  const [uplinkNetworkQuality, setUplinkNetworkQuality] = useState(0);
  const [localAudioStats, setLocalAudioStats] = useState('');
  const [localVideoStats, setLocalVideoStats] = useState('');
  let networkState = { uplinkNetworkQuality, localAudioStats, localVideoStats };
  // flush stats views
  const flushStats = useCallback(() => {
    if (!client) return;
    // get the client stats message
    const clientStats = client.getRTCStats();
    const clientStatsList = [
      {
        description: 'Number of users in channel',
        value: clientStats.UserCount,
        unit: '',
      },
      {
        description: 'Duration in channel',
        value: clientStats.Duration,
        unit: 's',
      },
      {
        description: 'Bit rate receiving',
        value: clientStats.RecvBitrate,
        unit: 'bps',
      },
      {
        description: 'Bit rate being sent',
        value: clientStats.SendBitrate,
        unit: 'bps',
      },
      {
        description: 'Total bytes received',
        value: clientStats.RecvBytes,
        unit: 'bytes',
      },
      {
        description: 'Total bytes sent',
        value: clientStats.SendBytes,
        unit: 'bytes',
      },
      {
        description: 'Outgoing available bandwidth',
        value: clientStats.OutgoingAvailableBandwidth.toFixed(3),
        unit: 'kbps',
      },
      {
        description: 'RTT from SDK to SD-RTN access node',
        value: clientStats.RTT,
        unit: 'ms',
      },
    ];
    setStatsList(clientStatsList);
  }, [client]);

  const initStats = useCallback(() => {
    statsInterval = setInterval(flushStats, 1000);
  }, [flushStats]);

  // useVideo 트랙 생성
  async function createLocalTracks(
    audioConfig?: MicrophoneAudioTrackInitConfig,
    videoConfig?: CameraVideoTrackInitConfig,
  ): Promise<[IMicrophoneAudioTrack, ICameraVideoTrack]> {
    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack(audioConfig);
    const cameraTrack = await AgoraRTC.createCameraVideoTrack(videoConfig);

    setLocalAudioTrack(microphoneTrack);
    setLocalVideoTrack(cameraTrack);
    return [microphoneTrack, cameraTrack];
  }

  //useVideo join 기능
  const join = useCallback(
    async (appid: string, channel: string, token?: string, uid?: string | number | null) => {
      if (!client) return;
      await client.join(appid, channel, token || null);
      (window as any).client = client;
    },
    [client],
  );

  /**useVideo 음소거 컨트롤 */
  const muteAudio = useCallback(async () => {
    if (!localAudioTrack) return;
    const audioState = !localAudioMuteState;
    await localAudioTrack.setMuted(audioState);
    setLocalAudioMuteState(audioState);
    return audioState;
  }, [localAudioMuteState, localAudioTrack]);

  /**useVideo 화면 차단 컨트롤 */
  const muteVideo = useCallback(async () => {
    if (!localVideoTrack) return;
    const videoState = !localVideoMuteState;
    await localVideoTrack.setMuted(videoState);
    setLocalVideoMuteState(videoState);
    return videoState;
  }, [localVideoMuteState, localVideoTrack]);

  /**useVideo 영상 통화 open 기능 */
  const videoCall = useCallback(async () => {
    if (!client) return;
    const [microphoneTrack, cameraTrack] = await createLocalTracks(
      { encoderConfig: 'music_standard', AEC: true, AGC: true, ANS: true },
      undefined,
    );
    await client.publish([microphoneTrack, cameraTrack]);
    initStats();

    (window as any).client = client;
    (window as any).videoTrack = cameraTrack;
  }, [client, initStats]);

  /**useVideo 음성 통화 open 기능 */
  const voiceCall = useCallback(async () => {
    if (!client) return;
    const [microphoneTrack] = await createLocalTracks(
      { encoderConfig: 'music_standard', AEC: true, AGC: true, ANS: true },
      undefined,
    );
    await client.publish([microphoneTrack]);
    initStats();

    (window as any).client = client;
  }, [client, initStats]);

  /**useVideo 트랙 선택 */
  const trackCall = useCallback(() => {
    if (telemedicineType) {
      if (telemedicineType === 'VIDEO_CALL') {
        videoCall();
        setTrackState(true);
        return;
      }
      if (telemedicineType === 'VOICE_CALL') {
        voiceCall();
        setTrackState(true);
        return;
      }
    }
  }, [telemedicineType, videoCall, voiceCall]);

  /**useVideo 통화 종료 기능 */
  const leave = useCallback(async () => {
    if (!client) return;
    await client.leave();
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }

    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }

    setRemoteUsers([]);
    setLocalVideoMuteState(false);
    setLocalAudioMuteState(false);
    setLocalAudioTrack(undefined);
    setLocalVideoTrack(undefined);
    setTrackState(false);
  }, [client, localAudioTrack, localVideoTrack]);

  /**의사 비대면 진료실 입장 시 join*/
  useEffect(() => {
    if (agoraToken && channelName && appid) {
      join(appid, channelName, agoraToken);
    }
  }, [agoraToken, appid, channelName, join]);

  useEffect(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);
    const handleUserPublished = async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
      await client.subscribe(user, mediaType);
      const cookie = getCookie('patients-list');
      if (cookie) {
        const list: string[] = JSON.parse(cookie as string);
        if (patientId) {
          if (!list.includes(patientId as string)) {
            setCookie('patients-list', JSON.stringify([...list, patientId as string]));
          }
        }
      } else {
        if (patientId) {
          setCookie('patients-list', JSON.stringify([patientId as string]));
        }
      }
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserUnpublished = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserJoined = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleConnectionStateChange = async (
      curState: ConnectionState,
      revState: ConnectionState,
      reason?: ConnectionDisconnectedReason,
    ) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handlePublishedUserList = (users: IAgoraRTCRemoteUser): void => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleException = (event: unknown): void => {
      return console.log(`ERROR ${JSON.stringify(event)}`);
    };
    const handleUplinkNetworkQuality = (quality: NetworkQuality) => {
      setUplinkNetworkQuality(quality.uplinkNetworkQuality);
      setLocalAudioStats(JSON.stringify(client.getLocalAudioStats()));
      setLocalVideoStats(JSON.stringify(client.getLocalVideoStats()));
    };
    //원격 사용자가 오디오 또는 비디오 트랙을 게시할때 발생
    client.on('user-published', handleUserPublished);
    //로컬 오디오 및/또는 비디오 트랙의 게시를 취소
    client.on('user-unpublished', handleUserUnpublished);
    //원격 사용자 또는 호스트가 채널에 참여 할때
    client.on('user-joined', handleUserJoined);
    //원격 사용자가 오프라인이 되면 발생
    client.on('user-left', handleUserLeft);
    //서버간 연결상태가 변하면
    client.on('connection-state-change', handleConnectionStateChange);
    //연결된 사용자 반환
    client.on('published-user-list', handlePublishedUserList);
    client.on('exception', handleException);
    client.on('network-quality', handleUplinkNetworkQuality);

    return () => {
      // client.removeAllListeners();
      client.off('user-published', handleUserPublished);
      client.off('user-unpublished', handleUserUnpublished);
      client.off('user-joined', handleUserJoined);
      client.off('user-left', handleUserLeft);
      client.off('user-left', handleUserLeft);
      client.off('connection-state-change', handleConnectionStateChange);
      client.off('published-user-list', handlePublishedUserList);
      client.off('exception', handleException);
      client.off('network-quality', handleUplinkNetworkQuality);
    };
  }, [client, patientId]);

  return {
    localAudioTrack,
    localVideoTrack,
    trackState,
    leave,
    join,
    remoteUsers,
    muteVideo,
    muteAudio,
    trackCall,
    statsList,
    networkState,
  };
};

export default useVideo;
