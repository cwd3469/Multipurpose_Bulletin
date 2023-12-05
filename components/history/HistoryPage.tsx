import { Box, Grid, Stack } from '@mui/material';
import { ContantsLayout } from '@components/common/layout/Layout';
import HistoryFilter from './modules/HistoryFilter';
import HistoryTable from './modules/HistoryTable';
import WPagination from '@components/common/table/WPagination';
import { useContext } from 'react';
import { HistoryFilterContext } from './contexts/HistoryFilterContext';
import {
  apiHistoryTreat,
  useHistoryTreat,
} from '@hooks/api/hospitalDoctor/doctorHistory';
import { GetServerSideProps } from 'next';
import dayjs from 'dayjs';
import { dehydrate, QueryClient } from 'react-query';
import { HISTORY } from '@hooks/api/hospitalDoctor/queryKey';
import { loadingErrorFallbackList } from '@hooks/utils/LoadingErrorFallback';

const HistoryPage = () => {
  const { data, isError, isLoading, isWarning } = useHistoryTreat();
  const { filter, setInFilter } = useContext(HistoryFilterContext);

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
        <Grid container sx={{ height: '40px' }}>
          <HistoryFilter />
        </Grid>
        <Grid container sx={{ height: '706px' }}>
          <HistoryTable data={info.contents} />
        </Grid>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const now = dayjs().format('YYYY-MM-DD');
  const queryKey = { page: '0', startDate: now, endDate: now };
  const queryString = `?page=0&startDate=${now}&endDate=${now}`;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(HISTORY(queryKey), () =>
    apiHistoryTreat(queryString),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HistoryPage;
