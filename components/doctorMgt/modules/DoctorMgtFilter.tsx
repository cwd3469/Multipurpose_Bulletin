import * as React from 'react';
import { Grid, SelectChangeEvent } from '@mui/material';
import WSearchInput from '@components/common/inputs/textField/modules/WSearchInput';

import { WOptionType } from 'types/common';
import PersonIcon from '@mui/icons-material/Person';
import { DoctorAccountButton } from '../DoctorMgtTheme';
import { useRouter } from 'next/router';
import { DoctorMgtFilterType } from '../type';
import WSelect from '@components/common/select/WSelect';

//TODO:진료과Department
const DoctorMgtFilter = (props: DoctorMgtFilterType) => {
  const { setInFilter } = props;
  const medicalDepartment: WOptionType[] = [
    {
      name: '진료과',
      id: '0',
    },
    {
      name: '내과',
      id: 'D01',
    },
    {
      name: '가정의학과',
      id: 'D02',
    },
    {
      name: '정형외과',
      id: 'D03',
    },
    {
      name: '이비인후과',
      id: 'D04',
    },
    {
      name: '소아청소년과',
      id: 'D05',
    },
    {
      name: '피부과',
      id: 'D06',
    },
    {
      name: '산부인과',
      id: 'D07',
    },
    {
      name: '비뇨의학과',
      id: 'D08',
    },
    {
      name: '정신건강의학과',
      id: 'D09',
    },
    { name: '외과', id: 'D10' },
    { name: '신경외과', id: 'D11' },
    { name: '신경과', id: 'D12' },
    { name: '건강검진센터', id: 'D13' },
  ];
  const [state, setState] = React.useState<string>('0');
  const [nameKo, setNameKo] = React.useState<string>('');
  const router = useRouter();
  const onlickRouter = React.useCallback(() => {
    router.push(`/hospital-admin/doctor-info/`, undefined, {
      shallow: true,
    });
  }, [router]);

  const handleOption = React.useCallback(
    (event: SelectChangeEvent) => {
      setState(event.target.value);
      setInFilter(event.target.value, 'code');
    },
    [setInFilter],
  );

  const searchEvent = React.useCallback(
    (txt: string) => {
      setInFilter(txt, 'nameKo');
    },
    [setInFilter],
  );

  React.useEffect(() => {
    const query = router.query;
    if (query.code) {
      setState(query.code as string);
    }
    if (query.nameKo) {
      setNameKo(query.nameKo as string);
    }
  }, [router.query]);

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'}>
      <Grid container width="auto" gap={'10px'}>
        <WSelect
          name={'country'}
          value={state}
          width={'131px'}
          onChange={handleOption}
          options={medicalDepartment}
        />
        <WSearchInput
          queryValue={nameKo}
          search={searchEvent}
          placeholder="의사 이름 검색"
          keyword="nameKo"
        />
      </Grid>
      <DoctorAccountButton
        size="large"
        variant="outlined"
        onClick={onlickRouter}
      >
        <PersonIcon /> 의사 계정 등록
      </DoctorAccountButton>
    </Grid>
  );
};

export default DoctorMgtFilter;
