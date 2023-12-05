import { Grid, Stack } from '@mui/material';
import { ContantsLayout } from '@components/common/layout/Layout';
import ReceptionFilter from './modules/ReceptionFilter';
import ReceptionTable from './modules/ReceptionTable';
import { Reception } from './type';
import WPagination from '@components/common/table/WPagination';
import { useContext, useEffect } from 'react';
import { ReceptionFilterContext } from './contexts/ReceptionFilterContext';
import { useDoctorReception } from '@hooks/api/hospitalDoctor/doctorReception';
import { loadingErrorFallbackList } from '@hooks/utils/LoadingErrorFallback';

const ReceptionPage = () => {
  const { data, isError, isLoading, isWarning } = useDoctorReception();
  const { filter, setInFilter } = useContext(ReceptionFilterContext);

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
        <ReceptionFilter />
        <ReceptionTable data={info.contents} />
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

export default ReceptionPage;
