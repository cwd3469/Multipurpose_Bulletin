import { SupportQueueFilterProvider } from '@components/supportQueue/contexts/SupportQueueFilterContext';
import SupportQueuePage from '@components/supportQueue/SupportQueuePage';
import { Gnb } from '@components/common/layout/gnb/Gnb';

const Queueing = () => {
  return (
    <SupportQueueFilterProvider>
      <div>
        <Gnb />
        <SupportQueuePage />
      </div>
    </SupportQueueFilterProvider>
  );
};

export default Queueing;
