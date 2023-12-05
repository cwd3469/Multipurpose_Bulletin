import React from 'react';
import { Grid } from '@mui/material';
import WSearchInput from '@components/common/inputs/textField/modules/WSearchInput';
import { SupportReceptionContext } from '../contexts/SupportReceptionContext';
import WDatePickerFilter from '@components/common/datepicker/WDatePickerFilter';
import WDoctorNameSelect from '@components/common/select/modules/WDoctorNameSelect';
import WSelectStatusReception from '@components/common/select/modules/WSelectStatusReception';
import WSelectEnterType from '@components/common/select/modules/WSelectEnterType';

const SupportReceptionFilter = () => {
  const { filter, date, setInFilter, setInDate } = React.useContext(
    SupportReceptionContext,
  );
  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'}>
      <Grid container gap={'10px'} justifyContent="space-between">
        <WDatePickerFilter date={date} setInDate={setInDate} />
        <Grid container width="auto" gap="10px">
          <WSelectEnterType
            value={filter.enterType as string}
            callBack={(id: string) => setInFilter(id, 'enterType')}
          />
          <WSelectStatusReception
            value={filter.registrationStatus as string}
            callBack={(id: string) => setInFilter(id, 'registrationStatus')}
          />
          <WDoctorNameSelect
            setInFilter={function (value: string) {
              setInFilter(value, 'doctorNameKo');
            }}
          />
          <WSearchInput
            queryValue={filter.keyword}
            search={(txt: string) => setInFilter(txt, 'keyword')}
            placeholder="환자 이름 , 환자 등록번호 검색"
            keyword="keyword"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SupportReceptionFilter;
