import { Grid, Stack } from '@mui/material';
import { ContantsLayout } from '@components/common/layout/Layout';
import SupportTreatmentSetFilter from './modules/SupportTreatmentSetFilter';
import SupportTreatmentSetTable from './modules/SupportTreatmentSetTable';
import WPagination from '@components/common/table/WPagination';
import { useContext } from 'react';
import { useSupportDoctorTreat } from '@hooks/api/hospitalSupport/supportDoctorTreat';
import { SupportTreatFilterContext } from './contexts/SupportTreatFilterContext';
import { loadingErrorFallbackList } from '@hooks/utils/LoadingErrorFallback';

const SupportTreatmentSetPage = () => {
  const { data, isError, isLoading, isWarning } = useSupportDoctorTreat();
  const { filter, setInFilter } = useContext(SupportTreatFilterContext);

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
        <Grid container>
          <SupportTreatmentSetFilter />
        </Grid>
        <Grid container sx={{ height: '706px' }}>
          <SupportTreatmentSetTable data={info.contents} />
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

export default SupportTreatmentSetPage;
