import React from 'react';
import { Grid } from '@mui/material';
import WSearchInput from '@components/common/inputs/textField/modules/WSearchInput';
import { ReceptionFilterContext } from '../contexts/ReceptionFilterContext';
import WDatePickerFilter from '@components/common/datepicker/WDatePickerFilter';
import WSelectEnterType from '@components/common/select/modules/WSelectEnterType';
import WSelectStatusReception from '@components/common/select/modules/WSelectStatusReception';

const ReceptionFilter = () => {
  const { filter, date, setInFilter, setInDate } = React.useContext(
    ReceptionFilterContext,
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
            value={filter.status as string}
            callBack={(id: string) => setInFilter(id, 'status')}
          />
          <WSearchInput
            queryValue={filter.nameKo}
            search={(txt: string) => setInFilter(txt, 'nameKo')}
            placeholder="환자 이름 검색"
            keyword={'nameKo'}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReceptionFilter;
