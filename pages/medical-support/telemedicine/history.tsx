import { SupportHistoryFilterProvider } from '@components/supportHistory/contexts/SupportHistoryFilterContext';
import SupportHistoryPage from '@components/supportHistory/SupportHistoryPage';
import { Gnb } from '@components/common/layout/gnb/Gnb';

const History = () => {
  return (
    <SupportHistoryFilterProvider>
      <div>
        <Gnb />
        <SupportHistoryPage />
      </div>
    </SupportHistoryFilterProvider>
  );
};

export default History;
