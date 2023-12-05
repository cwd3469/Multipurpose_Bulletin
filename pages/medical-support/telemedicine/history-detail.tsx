import SupportHistoryDetailPage from '@components/supportHistory/SupportHistoryDetailPage';
import { WaitingUlidProvider } from '@components/waitingRoom/context/WaitingUlidContext';
import { Gnb } from '@components/common/layout/gnb/Gnb';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const HistoryDetail = () => {
  const router = useRouter();
  if (router.query.patientId) {
    const patientId = router.query.patientId as string;
    return (
      <WaitingUlidProvider>
        <>
          <Gnb />
          <SupportHistoryDetailPage ulid={patientId} />
        </>
      </WaitingUlidProvider>
    );
  }
  return <></>;
};

export default HistoryDetail;
