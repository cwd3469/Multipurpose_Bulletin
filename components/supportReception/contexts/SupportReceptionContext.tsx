/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dayjs from 'dayjs';
import { createContext, useCallback, useState } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro';
import useFilter from '@hooks/utils/filter/useFilter';
import { DataPagitionValue, FilterSupportHistoryType } from 'types/table';

const SupportReceptionContext = createContext<{
  filter: FilterSupportHistoryType;
  setInFilter: (value: DataPagitionValue, keyId: string) => void;
  date: DateRange<dayjs.Dayjs>;
  setInDate: (date: DateRange<dayjs.Dayjs>) => void;
}>({
  filter: {
    location: '',
    enterType: '',
    doctorNameKo: '',
    registrationStatus: 'REGIST',
    patientNameKo: '',
    page: 0,
  },
  setInFilter: (value: DataPagitionValue, keyId: string) => {
    return;
  },
  date: [dayjs(), dayjs()],
  setInDate: (date: DateRange<dayjs.Dayjs>) => {
    return;
  },
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const SupportReceptionFilterProvider = ({ children }: Props): JSX.Element => {
  const [filter, setFilter] = useState<FilterSupportHistoryType>({
    location: '',
    enterType: '',
    doctorNameKo: '',
    registrationStatus: 'REGIST',
    patientNameKo: '',
    page: 0,
  });
  const [date, setDate] = useState<DateRange<dayjs.Dayjs>>([dayjs(), dayjs()]);

  const { setInFilter, setInDate } = useFilter({
    url: '/medical-support/telemedicine/reception',
    filter: filter,
    setFilter: setFilter,
    date: date,
    setDate: setDate,
  });

  return (
    <SupportReceptionContext.Provider
      value={{
        filter,
        setInFilter,
        date,
        setInDate,
      }}
    >
      {children}
    </SupportReceptionContext.Provider>
  );
};

export { SupportReceptionContext, SupportReceptionFilterProvider };
