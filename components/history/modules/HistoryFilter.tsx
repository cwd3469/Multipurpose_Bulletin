import React from 'react';
import { Grid } from '@mui/material';
import WSearchInput from '@components/common/inputs/textField/modules/WSearchInput';
import { HistoryFilterContext } from '../contexts/HistoryFilterContext';

import WDatePickerFilter from '@components/common/datepicker/WDatePickerFilter';
import WSelectTreatmentStatus from '@components/common/select/modules/WSelectTreatmentStatus';
import WSelectIsDone from '@components/common/select/modules/WSelectIsDone';

const HistoryFilter = () => {
  const { filter, date, setInFilter, setInDate } =
    React.useContext(HistoryFilterContext);

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'}>
      <Grid container gap={'10px'} justifyContent="space-between">
        <WDatePickerFilter date={date} setInDate={setInDate} />
        <Grid container width="auto" gap="10px">
          <WSelectTreatmentStatus
            value={filter.status}
            callBack={(id: string) => setInFilter(id, 'status')}
          />
          <WSelectIsDone
            value={filter.isDone}
            callBack={(id: string) => setInFilter(id, 'isDone')}
            width={'200px'}
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

export default HistoryFilter;
