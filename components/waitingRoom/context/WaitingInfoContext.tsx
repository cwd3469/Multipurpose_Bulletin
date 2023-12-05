import { createContext, useCallback, useEffect, useState } from 'react';
import { TreatmentState } from '../WaitingRoomPage';

interface WaitingRoomInfo {
  [key: string]: string;
  startTime: string;
  endTime: string;
}

interface WaitingUlidType {
  setInfoFn: (data: string, keyId: string) => void;
  info: WaitingRoomInfo;
  setInLeave: (data: boolean) => void;
  setInRoomState: (state: TreatmentState) => void;
  leave: boolean;
  roomState: TreatmentState;
}

const WaitingInfoContext = createContext<WaitingUlidType>({
  setInRoomState: (state) => undefined,
  setInfoFn: (data: string, keyId: string) => undefined,
  setInLeave: (data: boolean) => undefined,
  roomState: 'WAIT',
  info: {
    startTime: '',
    endTime: '',
  },
  leave: false,
});

function WaitingInfoProvider(props: { children: JSX.Element }) {
  const { children } = props;
  const [roomState, setRoomState] = useState<TreatmentState>('WAIT');
  const [leave, setLeave] = useState<boolean>(false);
  const [info, setInfo] = useState<WaitingRoomInfo>({
    startTime: '',
    endTime: '',
  });
  const setInRoomState = useCallback((state: TreatmentState) => {
    setRoomState(state);
  }, []);

  const setInfoFn = (data: string, keyId: string) => {
    setInfo((state) => {
      return { ...state, [keyId]: data };
    });
  };
  const setInLeave = (data: boolean) => {
    setLeave(data);
  };

  const value = {
    info,
    setInfoFn,
    leave,
    setInLeave,
    roomState,
    setInRoomState,
  };

  useEffect(() => {
    return () => {
      setInfo({
        startTime: '',
        endTime: '',
      });
      setLeave(false);
    };
  }, []);

  return (
    <WaitingInfoContext.Provider value={value}>
      {children}
    </WaitingInfoContext.Provider>
  );
}
export { WaitingInfoProvider, WaitingInfoContext };
