import React, { useState } from 'react';
import { Grid } from '@mui/material';
import WSearchInput from '@components/common/inputs/textField/modules/WSearchInput';
import { SupportTreatFilterContext } from '../contexts/SupportTreatFilterContext';
import WSelectStatusReceptionDoctor from '@components/common/select/modules/WSelectStatusReceptionDoctor';
import WSelectMedicalDepartment from '@components/common/select/modules/WSelectMedicalDepartment';
import { WButton } from '@components/common/buttons/WButton';
import SupportSetAllReceptionState from '../modal/SupportSetAllReceptionState';

const SupportTreatmentSetFilter = () => {
  const { filter, setInFilter } = React.useContext(SupportTreatFilterContext);
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const allClose = React.useCallback(() => {
    setStatus(false);
    setOpen(true);
  }, []);
  const allOpen = React.useCallback(() => {
    setStatus(true);
    setOpen(true);
  }, []);
  return (
    <Grid container alignItems={'center'} justifyContent={'space-between'}>
      <Grid container gap={'10px'} justifyContent="space-between">
        <Grid container width="auto" gap="10px">
          <WSelectMedicalDepartment
            value={filter.departmentCode as string}
            callBack={(id: string) => setInFilter(id, 'departmentCode')}
          />
          <WSelectStatusReceptionDoctor
            value={filter.clinicStatus as string}
            callBack={(id: string) => setInFilter(id, 'clinicStatus')}
          />
          <WSearchInput
            queryValue={filter.doctorNameKo}
            search={(txt: string) => setInFilter(txt, 'doctorNameKo')}
            placeholder="의사 이름 검색"
            keyword="doctorNameKo"
          />
        </Grid>
        <Grid container alignContent="center" width="auto" gap="10px">
          <WButton
            onClick={allOpen}
            color="info"
            sx={{
              borderColor: '#4AC6FF',
              minWidth: '103px',
              bgcolor: '#E9F2FD',
              color: '#4AC6FF',
              fontSize: '14px',
            }}
          >
            의사 전체 OFF
          </WButton>
          <WButton
            onClick={allClose}
            color="info"
            sx={{
              borderColor: '#4AC6FF',
              minWidth: '103px',
              bgcolor: '#4AC6FF',
              color: '#fff',
              fontSize: '14px',
            }}
          >
            의사 전체 ON
          </WButton>
        </Grid>
      </Grid>
      <SupportSetAllReceptionState state={status} open={open} handleClose={() => setOpen(false)} />
    </Grid>
  );
};

export default SupportTreatmentSetFilter;
