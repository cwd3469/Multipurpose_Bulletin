import { Stack } from '@mui/material';
import { ContantsLayout } from '@components/common/layout/Layout';
import SupportQueueFilter from './modules/SupportQueueFilter';
import SupportQueueTable from './modules/SupportQueueTable';
import WPagination from '@components/common/table/WPagination';
import { useContext } from 'react';
import { SupportQueueFilterContext } from './contexts/SupportQueueFilterContext';
import { useSupportQueue } from '@hooks/api/hospitalSupport/supportQueue';
import { loadingErrorFallbackList } from '@hooks/utils/LoadingErrorFallback';

const SupportQueuePage = () => {
  const { filter, setInFilter } = useContext(SupportQueueFilterContext);
  const { data, isError, isLoading, isWarning } = useSupportQueue();

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
        <SupportQueueFilter />
        <SupportQueueTable data={info.contents} />
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

export default SupportQueuePage;
