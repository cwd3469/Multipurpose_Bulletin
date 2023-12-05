import React from 'react';
import { Grid } from '@mui/material';
import WSearchInput from '@components/common/inputs/textField/modules/WSearchInput';
import { QueueFilterContext } from '../contexts/QueueFilterContext';
import WDatePickerFilter from '@components/common/datepicker/WDatePickerFilter';
import WSelectTreatmentStatusQueue from '@components/common/select/modules/WSelectTreatmentStatusQueue';

const QueueFilter = () => {
  const { filter, date, setInFilter, setInDate } =
    React.useContext(QueueFilterContext);

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'}>
      <Grid container gap={'10px'} justifyContent="space-between">
        <WDatePickerFilter date={date} setInDate={setInDate} />
        <Grid container width="auto" gap="10px">
          <WSelectTreatmentStatusQueue
            value={filter.status}
            callBack={(id: string) => setInFilter(id, 'status')}
            width="160px"
          />
          <WSearchInput
            queryValue={filter.nameKo}
            search={(txt: string) => setInFilter(txt, 'nameKo')}
            placeholder="환자 이름, 환자 등록번호 검색"
            keyword={'nameKo'}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QueueFilter;
