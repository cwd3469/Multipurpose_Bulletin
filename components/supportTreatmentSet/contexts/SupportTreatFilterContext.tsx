/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dayjs from 'dayjs';
import { createContext, useCallback, useState } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro';
import useFilter from '@hooks/utils/filter/useFilter';
import { DataPagitionValue, FilterSupportTreatSetType } from 'types/table';

const SupportTreatFilterContext = createContext<{
  filter: FilterSupportTreatSetType;
  setInFilter: (value: DataPagitionValue, keyId: string) => void;
}>({
  filter: {
    page: 0,
    departmentCode: '',
    clinicStatus: '',
    doctorNameKo: '',
    location: '',
  },
  setInFilter: (value: DataPagitionValue, keyId: string) => {
    return;
  },
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const SupportTreatFilterProvider = ({ children }: Props): JSX.Element => {
  const [filter, setFilter] = useState<FilterSupportTreatSetType>({
    page: 0,
    departmentCode: '',
    clinicStatus: '',
    doctorNameKo: '',
    location: '',
  });

  const { setInFilter, setInDate } = useFilter({
    url: '/medical-support/treatment-set',
    filter: filter,
    setFilter: setFilter,
  });

  return (
    <SupportTreatFilterContext.Provider
      value={{
        filter,
        setInFilter,
      }}
    >
      {children}
    </SupportTreatFilterContext.Provider>
  );
};

export { SupportTreatFilterContext, SupportTreatFilterProvider };
