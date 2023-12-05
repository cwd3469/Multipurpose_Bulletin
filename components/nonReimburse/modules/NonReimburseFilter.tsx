import * as React from 'react';
import { Button, Grid, SelectChangeEvent, styled } from '@mui/material';
import WSearchInput from '@components/common/inputs/textField/modules/WSearchInput';
import NonReimburseRegister from '../modal/NonReimburseRegister';
import { DoctorMgtFilterType } from '@components/doctorMgt/type';
import { NonReimburseFilterContext } from '../contexts/NonReimburseFilterContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const NonReimburseFilter = () => {
  const { setInFilter } = useContext(NonReimburseFilterContext);
  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter();
  const searchEvent = React.useCallback(
    (txt: string) => {
      setInFilter(txt, 'nameKo');
    },
    [setInFilter],
  );
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const query = router.query;

    if (query.nameKo) {
      setKeyword(query.nameKo as string);
    }
  }, [router.query]);

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'}>
      <WSearchInput
        queryValue={keyword}
        search={searchEvent}
        placeholder="항목명 검색"
        keyword="keyword"
      />
      <Grid container width="auto" gap={'10px'}>
        <Button
          size="large"
          variant="outlined"
          sx={{
            backgroundColor: '#fff',
            width: '92px',
            padding: '10px',
            height: '40px',
            border: '1px solid #4ac6ff',
            borderBottom: '1px solid #4ac6ff',
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          등록
        </Button>
        <NonReimburseRegister open={open} handleClose={() => setOpen(false)} />
      </Grid>
    </Grid>
  );
};

export default NonReimburseFilter;
