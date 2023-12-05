import { Stack } from '@mui/material';
import { ContantsLayout } from '@components/common/layout/Layout';
import SupportHistoryFilter from './modules/SupportHistoryFilter';
import SupportHistoryTable from './modules/SupportHistoryTable';
import WPagination from '@components/common/table/WPagination';
import { useContext } from 'react';
import { SupportHistoryFilterContext } from './contexts/SupportHistoryFilterContext';
import { useSupportHistoryTreat } from '@hooks/api/hospitalSupport/supportHistory';
import { loadingErrorFallbackList } from '@hooks/utils/LoadingErrorFallback';

const SupportHistoryPage = () => {
  const { filter, setInFilter } = useContext(SupportHistoryFilterContext);
  const { data, isError, isLoading, isWarning } = useSupportHistoryTreat();

  const pagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setInFilter(value, 'page');
  };

  const info = loadingErrorFallbackList({
    data: data,
    isError: isError,
    isLoading: isLoading,
    isWarning: isWarning,
  });

  return (
    <ContantsLayout bg="#F8F8F8" containerColor="#F8F8F8">
      <Stack gap="12px">
        <SupportHistoryFilter />
        <SupportHistoryTable data={info.contents} />
        <WPagination
          paddingTop="4px"
          page={filter.page + 1}
          pagination={pagination}
          count={info.totalPages}
        />
      </Stack>
    </ContantsLayout>
  );
};

export default SupportHistoryPage;
