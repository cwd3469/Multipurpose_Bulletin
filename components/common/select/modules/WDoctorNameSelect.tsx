import { Box, SelectChangeEvent } from '@mui/material';
import WSelect from '../WSelect';
import { useEffect, useState } from 'react';
import { WOptionType } from 'types/common';
import { useDoctorName } from '@hooks/api/hospitalSupport/supportReception';
import { useRouter } from 'next/router';

const WDoctorNameSelect = (props: { setInFilter: (value: string) => void }) => {
  const router = useRouter();
  const query = router.query;
  const { data, isLoading, isSuccess } = useDoctorName();
  const [list, setList] = useState<WOptionType[]>([
    { id: 'ALL', name: '의사 전체' },
  ]);
  const [doctocState, setDoctocState] = useState<string>(
    list.length ? list[0].id : '',
  );

  const handleDoctorName = (event: SelectChangeEvent) => {
    setDoctocState(event.target.value);
    if (event.target.value === 'ALL') {
      props.setInFilter('');
    } else {
      props.setInFilter(event.target.value);
    }
  };

  useEffect(() => {
    const doctorNameKoList: string[] = data
      ? data.data.data.doctorNameKoList
      : [];
    const doctorName: WOptionType[] = doctorNameKoList.map((item, index) => {
      return { id: item, name: item };
    });
    const doctorNameList = [list[0], ...doctorName];
    setList(doctorNameList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (query.doctorNameKo) {
      setDoctocState(query.doctorNameKo as string);
    }
  }, [query.doctorNameKo]);

  if (isLoading) {
    return (
      <Box
        sx={{
          height: '40px',
          lineHeight: '40px',
        }}
      >
        isLoading...
      </Box>
    );
  }

  if (isSuccess)
    return (
      <WSelect
        name={'doctorName'}
        value={doctocState ? doctocState : ''}
        width={'120px'}
        onChange={handleDoctorName}
        options={list}
      />
    );

  return <></>;
};

export default WDoctorNameSelect;
