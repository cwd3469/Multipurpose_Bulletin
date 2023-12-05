import { Grid, Stack } from '@mui/material';
import { ContantsLayout } from '@components/common/layout/Layout';
import MedicalSupportMgtFilter from './modules/MedicalSupportMgtFilter';
import MedicalSupportMgtTable from './modules/MedicalSupportMgtTable';
import WPagination from '@components/common/table/WPagination';
import useMedicalSupportList from './hooks/useMedicalSupportList';
import { useRouter } from 'next/router';
import { MedicalSupportContext } from './contexts/MedicalSupportContext';
import React from 'react';

const MedicalSupportMgtPage = () => {
  const router = useRouter();
  const { filter, setInFilter } = React.useContext(MedicalSupportContext);
  const { supportListData, totalPages } = useMedicalSupportList({
    filter: router.query,
  });
  const pagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setInFilter(value, 'page');
  };
  return (
    <ContantsLayout bg="#F8F8F8" containerColor="#F8F8F8">
      <Stack gap="12px">
        <Grid container sx={{ height: '40px' }}>
          <MedicalSupportMgtFilter />
        </Grid>
        <Grid container sx={{ height: '706px' }}>
          <MedicalSupportMgtTable data={supportListData} />
        </Grid>
        <WPagination
          paddingTop="4px"
          page={filter.page + 1}
          pagination={pagination}
          count={totalPages}
        />
      </Stack>
    </ContantsLayout>
  );
};

export default MedicalSupportMgtPage;
