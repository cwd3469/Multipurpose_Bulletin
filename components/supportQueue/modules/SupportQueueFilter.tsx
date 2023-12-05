import React from 'react';
import { Grid } from '@mui/material';
import WSearchInput from '@components/common/inputs/textField/modules/WSearchInput';
import { SupportQueueFilterContext } from '../contexts/SupportQueueFilterContext';
import WDatePickerFilter from '@components/common/datepicker/WDatePickerFilter';
import WDoctorNameSelect from '@components/common/select/modules/WDoctorNameSelect';
import WSelectTreatmentStatusQueue from '@components/common/select/modules/WSelectTreatmentStatusQueue';
// @components/common/select/modules/W @components/common/select/modules/W
const SupportQueueFilter = () => {
  const { filter, date, setInFilter, setInDate } = React.useContext(
    SupportQueueFilterContext,
  );

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'}>
      <Grid container gap={'10px'} justifyContent="space-between">
        <WDatePickerFilter date={date} setInDate={setInDate} />
        <Grid container width="auto" gap="10px">
          <WSelectTreatmentStatusQueue
            value={filter.treatmentStatus}
            callBack={(id: string) => setInFilter(id, 'treatmentStatus')}
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

export default SupportQueueFilter;
