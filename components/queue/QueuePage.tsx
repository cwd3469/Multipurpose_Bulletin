import { useContext } from 'react';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { Grid, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { ContantsLayout } from '@components/common/layout/Layout';
import QueueFilter from './modules/QueueFilter';
import QueueTable from './modules/QueueTable';
import WPagination from '@components/common/table/WPagination';
import { QueueFilterContext } from './contexts/QueueFilterContext';
import {
  apiTelemedicineTreatQueue,
  useTelemedicineTreatQueue,
} from '@hooks/api/hospitalDoctor/doctorQueue';
import { QUEUE } from '@hooks/api/hospitalDoctor/queryKey';
import { loadingErrorFallbackList } from '@hooks/utils/LoadingErrorFallback';

const QueuePage = () => {
  const { data, isError, isLoading, isWarning } = useTelemedicineTreatQueue();
  const { filter, setInFilter } = useContext(QueueFilterContext);
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
          <QueueFilter />
        </Grid>
        <Grid container sx={{ height: '706px' }}>
          <QueueTable data={info.contents} />
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
  await queryClient.prefetchQuery(QUEUE(queryKey), () =>
    apiTelemedicineTreatQueue(queryString),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default QueuePage;
