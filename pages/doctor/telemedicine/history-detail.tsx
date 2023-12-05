import HistoryDetailPage from '@components/history/HistoryDetailPage';
import { WaitingUlidProvider } from '@components/waitingRoom/context/WaitingUlidContext';
import { Gnb } from '@components/common/layout/gnb/Gnb';
import { useRouter } from 'next/router';

const History = () => {
  const router = useRouter();
  if (router.query.patientId) {
    const patientId = router.query.patientId as string;
    return (
      <WaitingUlidProvider>
        <>
          <Gnb />
          <HistoryDetailPage ulid={patientId} />
        </>
      </WaitingUlidProvider>
    );
  }
  return <></>;
};

export default History;
