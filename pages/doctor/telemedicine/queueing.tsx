import QueuePage from '@components/queue/QueuePage';
import { QueueFilterProvider } from '@components/queue/contexts/QueueFilterContext';
import { Gnb } from '@components/common/layout/gnb/Gnb';

const Queueing = () => {
  return (
    <QueueFilterProvider>
      <Gnb />
      <QueuePage />
    </QueueFilterProvider>
  );
};

export default Queueing;
