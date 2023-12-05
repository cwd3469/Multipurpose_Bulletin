import { Stack } from '@mui/material';
import { ContantsLayout } from '@components/common/layout/Layout';
import SupportReceptionFilter from './modules/SupportReceptionFilter';
import SupportReceptionTable from './modules/SupportReceptionTable';
import WPagination from '@components/common/table/WPagination';
import { useContext } from 'react';
import { SupportReceptionContext } from './contexts/SupportReceptionContext';
import { useSupportReception } from '@hooks/api/hospitalSupport/supportReception';
import { loadingErrorFallbackList } from '@hooks/utils/LoadingErrorFallback';

const SupportReceptionPage = () => {
  const { data, isError, isLoading, isWarning } = useSupportReception();
  const { filter, setInFilter } = useContext(SupportReceptionContext);
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
        <SupportReceptionFilter />
        <SupportReceptionTable data={info.contents} />
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

export default SupportReceptionPage;
