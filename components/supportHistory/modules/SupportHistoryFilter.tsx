import React from 'react';
import { Grid } from '@mui/material';
import WSearchInput from '@components/common/inputs/textField/modules/WSearchInput';
import { SupportHistoryFilterContext } from '../contexts/SupportHistoryFilterContext';
import WDatePickerFilter from '@components/common/datepicker/WDatePickerFilter';
import WDoctorNameSelect from '@components/common/select/modules/WDoctorNameSelect';
import WSelectTreatmentStatus from '@components/common/select/modules/WSelectTreatmentStatus';
import WSelectIsDone from '@components/common/select/modules/WSelectIsDone';

const SupportHistoryFilter = () => {
  const { filter, date, setInFilter, setInDate } = React.useContext(
    SupportHistoryFilterContext,
  );

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'}>
      <Grid container gap={'10px'} justifyContent="space-between">
        <WDatePickerFilter date={date} setInDate={setInDate} />
        <Grid container width="auto" gap="10px">
          <WSelectTreatmentStatus
            value={filter.treatmentStatus}
            callBack={(id: string) => setInFilter(id, 'treatmentStatus')}
          />
          <WSelectIsDone
            value={filter.isDone}
            callBack={(id: string) => setInFilter(id, 'isDone')}
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

export default SupportHistoryFilter;
