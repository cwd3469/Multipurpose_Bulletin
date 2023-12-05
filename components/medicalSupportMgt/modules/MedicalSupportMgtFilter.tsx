import * as React from 'react';
import { Grid } from '@mui/material';
import WSearchInput from '@components/common/inputs/textField/modules/WSearchInput';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/router';
import { DoctorAccountButton } from '@components/doctorMgt/DoctorMgtTheme';
import { MedicalSupportContext } from '../contexts/MedicalSupportContext';
import { useEffect } from 'react';

const MedicalSupportMgtFilter = () => {
  const { setInFilter } = React.useContext(MedicalSupportContext);
  const router = useRouter();
  const [nameKo, setNameKo] = React.useState<string>('');
  const onlickRouter = () => {
    router.push(`/hospital-admin/medical-support-info/`, undefined, {
      shallow: true,
    });
  };
  const searchEvent = (txt: string) => {
    setInFilter(txt, 'nameKo');
  };
  useEffect(() => {
    if (router.query.nameKo) {
      setNameKo(router.query.nameKo as string);
    }
  }, [router.query.nameKo]);
  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'}>
      <Grid container width="auto" gap={'10px'}>
        <WSearchInput
          queryValue={nameKo}
          search={searchEvent}
          placeholder="진료 지원 이름 검색"
          keyword="nameKo"
        />
      </Grid>
      <DoctorAccountButton
        size="large"
        variant="outlined"
        onClick={onlickRouter}
        sx={{ width: '210px' }}
      >
        <PersonIcon /> 진료 지원 계정 등록
      </DoctorAccountButton>
    </Grid>
  );
};

export default MedicalSupportMgtFilter;
