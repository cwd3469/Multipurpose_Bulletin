import { Grid, Stack } from '@mui/material';
import { ContantsLayout } from '@components/common/layout/Layout';
import NonReimburseFilter from './modules/NonReimburseFilter';
import NonReimbursementTable from './modules/NonReimburseTable';
import { NoneReimbursePageDto } from './type';
import WPagination from '@components/common/table/WPagination';
import { useContext, useEffect } from 'react';
import { useNonReimbursement } from '@hooks/api/hospitalDoctor/nonReimbursement';
import { NonReimburseFilterContext } from './contexts/NonReimburseFilterContext';
import { useRouter } from 'next/router';
import { useToastContext } from '@hooks/useToastContext';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';

const NonReimbursePage = () => {
  const router = useRouter();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const query = router.query;
  const { data, isError, isLoading } = useNonReimbursement(query);

  const code = data?.data.code;
  const contents: NoneReimbursePageDto[] = isLoading
    ? []
    : code === '0000'
    ? data?.data.data.page.content
    : [];

  const totalPages = code === '0000' ? data?.data.data.page.totalPages : 0;

  useEffect(() => {
    if (data) {
      if (code !== '0000') {
        toast?.on(msg.errMsg(code), 'error');
      }
    }
  }, [code, data, msg, toast]);

  return <NonReimburseTemplet data={contents} totalData={totalPages} />;
};

const NonReimburseTemplet = (props: {
  data?: NoneReimbursePageDto[];
  totalData?: number;
}) => {
  const { filter, setInFilter } = useContext(NonReimburseFilterContext);

  const pagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setInFilter(value, 'page');
  };

  return (
    <ContantsLayout bg="#F8F8F8" containerColor="#F8F8F8">
      <Stack gap="12px">
        <Grid container sx={{ height: '40px' }}>
          <NonReimburseFilter />
        </Grid>
        <Grid container sx={{ height: '706px' }}>
          <NonReimbursementTable data={props.data ? props.data : []} />
        </Grid>
        <WPagination
          paddingTop="4px"
          page={filter.page + 1}
          pagination={pagination}
          count={props.totalData ? props.totalData : 0}
        />
      </Stack>
    </ContantsLayout>
  );
};

export default NonReimbursePage;
