import { Stack } from '@mui/material';
import { ContantsLayout } from '@components/common/layout/Layout';
import ReserveFilter from './modules/ReserveFilter';
import { useContext } from 'react';
import { ReserveContext } from './contexts/ReserveContext';
import { loadingErrorFallbackList } from '@hooks/utils/LoadingErrorFallback';
import WPagination from '@components/common/table/WPagination';
import ReserveTable from './modules/ReserveTable';
import { useSupportReserveList } from './hooks/useReserveListGet';

/**SupportReservePage 진료지원 예약 페이지 컴포넌트 */
const SupportReservePage = () => {
  const { filter, setInFilter } = useContext(ReserveContext);
  const { data, isError, isLoading, isWarning } = useSupportReserveList();

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

export default SupportReservePage;
