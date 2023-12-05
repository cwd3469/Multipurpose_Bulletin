import { Stack } from '@mui/material';
import { ContantsLayout } from '@components/common/layout/Layout';
import ReserveFilter from './modules/ReserveFilter';
import ReserveTable from './modules/ReserveTable';
import { useContext } from 'react';
import { ReserveContext } from './contexts/ReserveContext';
import { loadingErrorFallbackList } from '@hooks/utils/LoadingErrorFallback';
import WPagination from '@components/common/table/WPagination';
import useReserveListGet from './hooks/useReserveListGet';

/**ReservePage 예약 목록 페이지 */
const ReservePage = () => {
  const { filter, setInFilter } = useContext(ReserveContext);
  const { data, isError, isLoading, isWarning } = useReserveListGet();

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
        <ReserveFilter />
        <ReserveTable data={info.contents} />
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

export default ReservePage;
