import { Grid, Stack } from '@mui/material';
import { ContantsLayout } from '@components/common/layout/Layout';
import DoctorMgtFilter from './modules/DoctorMgtFilter';
import DoctorMgtTable from './modules/DoctorMgtTable';
import {
  ApiGetDoctorProfileTableKeyValue,
  ApiGetDoctorProfileTableType,
  DoctorMgtDtoType,
} from './type';
import WPagination from '@components/common/table/WPagination';
import { useCallback, useContext, useEffect, useState } from 'react';
import { apiGetProfileDoctor } from '@hooks/api/hospitalAdmin/doctorMgt';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { transQueryString, transQueryUrl } from '@utils/transtext';
import { useToastContext } from '@hooks/useToastContext';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';

const DoctorMgtPage = () => {
  const router = useRouter();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const [filter, setFilter] = useState<ApiGetDoctorProfileTableType>({
    code: '0',
    nameKo: '',
    page: 1,
    // sort:[]
  });
  const setInFilter = useCallback(
    (value: ApiGetDoctorProfileTableKeyValue, keyId: string) => {
      const reFilter: ApiGetDoctorProfileTableType = {
        ...filter,
        [keyId]: value,
      };
      setFilter(reFilter);
      const key = transQueryUrl(reFilter);
      const query = `${key}`.substring(1);
      router.push(`/hospital-admin/doctor-mgt?${query}`, undefined, {
        shallow: true,
      });
    },
    [filter, router],
  );

  useEffect(() => {
    const query = router.query;
    const nameKo = query.nameKo;
    const code = query.code;
    const page = query.page;
    let reFilter: ApiGetDoctorProfileTableType = filter;

    reFilter = code
      ? {
          ...reFilter,
          ['code']: code as string,
        }
      : reFilter;

    reFilter = nameKo
      ? {
          ...reFilter,
          ['nameKo']: nameKo as string,
        }
      : reFilter;

    reFilter = page
      ? {
          ...reFilter,
          ['page']: Number(page as string) + 1,
        }
      : reFilter;

    setFilter(reFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const query = transQueryString(router.query);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['adiminDoctorMgt', router.query],
    queryFn: async () => {
      const data = await apiGetProfileDoctor(query);
      return data;
    },
    keepPreviousData: true,
  });

  const code = data?.data.code;
  const apiData: DoctorMgtDtoType[] =
    data?.data.code === '0000' ? data?.data.data.page.content : [];
  const totalPages = code === '0000' ? data?.data.data.page.totalPages : 0;

  useEffect(() => {
    if (data) {
      if (code !== '0000') {
        toast?.on(msg.errMsg(code), 'error');
      }
    }
  }, [code, data, msg, toast]);

  return (
    <ContantsLayout bg="#F8F8F8" containerColor="#F8F8F8">
      <Stack gap="12px">
        <Grid container sx={{ height: '40px' }}>
          <DoctorMgtFilter setInFilter={setInFilter} />
        </Grid>
        <Grid container sx={{ height: '706px' }}>
          <DoctorMgtTable data={isLoading ? [] : isError ? [] : apiData} />
        </Grid>
        <WPagination
          paddingTop="4px"
          page={filter.page}
          pagination={(event: React.ChangeEvent<unknown>, value: number) => {
            setInFilter(value, 'page');
          }}
          count={totalPages}
        />
      </Stack>
    </ContantsLayout>
  );
};

export default DoctorMgtPage;
