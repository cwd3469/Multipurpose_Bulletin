import { HistoryFilterProvider } from '@components/history/contexts/HistoryFilterContext';
import HistoryPage from '@components/history/HistoryPage';
import { Gnb } from '@components/common/layout/gnb/Gnb';
const History = () => {
  return (
    <HistoryFilterProvider>
      <Gnb />
      <HistoryPage />
    </HistoryFilterProvider>
  );
};

export default History;
