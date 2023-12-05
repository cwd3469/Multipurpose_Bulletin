import { DateRange } from '@mui/x-date-pickers-pro';
import { stringToDey } from '@utils/date';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FilterAllOtions, FilterDateType } from 'types/table';

interface UseFilterEffectType {
  filter?: FilterAllOtions;
  setFilter?: (filterState: FilterAllOtions) => void;
  setDateString?: (date: DateRange<Dayjs>) => void;
}

const useFilterEffect = (props: UseFilterEffectType) => {
  const router = useRouter();

  useEffect(() => {
    const query = router.query;
    const {
      startDate,
      endDate,
      page,
      doctorNameKo,
      treatmentStatus,
      keyword,
      code,
      nameKo,
      location,
      enterType,
      status,
      isDone,
      registrationStatus,
      patientNameKo,
      departmentCode,
      clinicStatus,
    } = query;

    if (props.filter && props.setFilter) {
      let reFilter: FilterAllOtions = props.filter;
      reFilter = {
        ...reFilter,
        ...(page ? { ['page']: Number(page as string) } : { ['page']: 0 }),
        ...(doctorNameKo && { ['doctorNameKo']: doctorNameKo as string }),
        ...(treatmentStatus && { ['treatmentStatus']: treatmentStatus as string }),
        ...(keyword && { ['keyword']: keyword as string }),
        ...(code && { ['code']: code as string }),
        ...(nameKo && { ['nameKo']: nameKo as string }),
        ...(location && { ['location']: location as string }),
        ...(enterType && { ['enterType']: enterType as string }),
        ...(status && { ['status']: status as string }),
        ...(isDone && { ['isDone']: isDone as string }),
        ...(registrationStatus && { ['registrationStatus']: registrationStatus as string }),
        ...(patientNameKo && { ['patientNameKo']: patientNameKo as string }),
        ...(departmentCode && { ['departmentCode']: departmentCode as string }),
        ...(clinicStatus && { ['clinicStatus']: clinicStatus as string }),
      };
      props.setFilter(reFilter);
    }

    if (startDate && endDate) {
      const start = stringToDey(startDate as string);
      const end = stringToDey(endDate as string);
      const range: DateRange<Dayjs> = [start, end];
      if (props.setDateString) {
        props.setDateString(range);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);
};

export default useFilterEffect;
