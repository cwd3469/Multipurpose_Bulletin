import React from 'react';
import Image from 'next/image';
import { Grid } from '@mui/material';
import WSearchInput from '@components/common/inputs/textField/modules/WSearchInput';
import { ReserveContext } from '../contexts/ReserveContext';
import WDatePickerFilter from '@components/common/datepicker/WDatePickerFilter';
import WSelectEnterType from '@components/common/select/modules/WSelectEnterType';
import { WIconButton } from '@components/common/buttons/WIconButton';
import WSelectStatusReserve from '@components/common/select/modules/WSelectStatusReserve';

/**ReserveFilter 예약 목록 필터*/
const ReserveFilter = () => {
  const { filter, date, setInFilter, setInDate, filterReset } = React.useContext(ReserveContext);

  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'}>
      <Grid container gap={'10px'} justifyContent="space-between">
        <WDatePickerFilter date={date} setInDate={setInDate} />
        <Grid container width="auto" gap="10px">
          <WSelectStatusReserve
            value={filter.status}
            callBack={(id: string) => setInFilter(id, 'status')}
          />
          <WSelectEnterType
            value={filter.enterType}
            callBack={(id: string) => setInFilter(id, 'enterType')}
          />
          <WSearchInput
            queryValue={filter.keyword}
            search={(txt: string) => setInFilter(txt, 'keyword')}
            placeholder="환자 이름 검색"
            keyword={'keyword'}
          />
          <WIconButton
            startIcon={
              <Image
                src={'/assets/icons/ic_refresh.svg'}
                alt="검색초기화 아이콘"
                width={18}
                height={18}
              />
            }
            onClick={filterReset}
            sx={{ borderColor: '#ebeced', fontWeight: '400', color: '#666' }}
          >
            검색 초기화
          </WIconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReserveFilter;
