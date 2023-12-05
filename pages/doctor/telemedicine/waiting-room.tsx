import WLoadingPage from '@components/common/modal/WLoadingPage';
import { QueueFilterProvider } from '@components/queue/contexts/QueueFilterContext';
import {
  WaitingInfoContext,
  WaitingInfoProvider,
} from '@components/waitingRoom/context/WaitingInfoContext';
import { WaitingUlidProvider } from '@components/waitingRoom/context/WaitingUlidContext';
import { WaitingGetDto } from '@components/waitingRoom/type';
import { useDoctorOfficeTreatRoom } from '@hooks/api/hospitalDoctor/doctorOffice';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useToastContext } from '@hooks/useToastContext';
import { Gnb } from '@components/common/layout/gnb/Gnb';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

const WaitingRoomPage = dynamic(
  () => import('../../../components/waitingRoom/WaitingRoomPage'),
  { ssr: false },
);

const WaitingRoom = () => {
  const router = useRouter();

  if (router.query.patientId) {
    const patientId = router.query.patientId as string;
    return (
      <WaitingInfoProvider>
        <WaitingUlidProvider>
          <QueueFilterProvider>
            <WaitingTemplates ulid={patientId} />
          </QueueFilterProvider>
        </WaitingUlidProvider>
      </WaitingInfoProvider>
    );
  }
  return <></>;
};

const WaitingTemplates = (props: { ulid: string }) => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const router = useRouter();
  const { roomState } = useContext(WaitingInfoContext);
  const { data, isError, isLoading } = useDoctorOfficeTreatRoom(props.ulid);
  const res: WaitingGetDto = data?.data.data;
  const code = data?.data.code;

  useEffect(() => {
    if (data) {
      if (code !== '0000') {
        toast?.on(msg.errMsg(code), 'error');
        router.replace('/doctor/telemedicine/queueing', undefined, {
          shallow: true,
        });
      }
    }
  }, [code, data, msg, router, toast]);

  return (
    <>
      <Gnb disabled={roomState === 'IN_TREAT' ? true : false} />
      {isLoading ? (
        <WLoadingPage />
      ) : data ? (
        <WaitingRoomPage data={res} isError={isError} />
      ) : (
        ''
      )}
    </>
  );
};

export default WaitingRoom;
