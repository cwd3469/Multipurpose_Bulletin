/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dayjs from 'dayjs';
import { createContext, useCallback, useState } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro';
import useFilter from '@hooks/utils/filter/useFilter';
import { DataPagitionValue, FilterSupportHistoryType } from 'types/table';

const SupportHistoryFilterContext = createContext<{
  filter: FilterSupportHistoryType;
  setInFilter: (value: DataPagitionValue, keyId: string) => void;
  date: DateRange<dayjs.Dayjs>;
  setInDate: (date: DateRange<dayjs.Dayjs>) => void;
}>({
  filter: {
    location: '',
    doctorNameKo: '',
    treatmentStatus: '',
    keyword: '',
    page: 0,
    isDone: '',
  },
  setInFilter: (value: DataPagitionValue, keyId: string) => {
    return;
  },
  date: [dayjs(), dayjs().add(1, 'day')],
  setInDate: (date: DateRange<dayjs.Dayjs>) => {
    return;
  },
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const SupportHistoryFilterProvider = ({ children }: Props): JSX.Element => {
  const [filter, setFilter] = useState<FilterSupportHistoryType>({
    location: '',
    doctorNameKo: '',
    treatmentStatus: '',
    keyword: '',
    page: 0,
    isDone: '',
  });
  const [date, setDate] = useState<DateRange<dayjs.Dayjs>>([
    dayjs().subtract(7, 'day'),
    dayjs(),
  ]);

  const { setInFilter, setInDate } = useFilter({
    url: '/medical-support/telemedicine/history',
    filter: filter,
    setFilter: setFilter,
    date: date,
    setDate: setDate,
  });

  return (
    <SupportHistoryFilterContext.Provider
      value={{
        filter,
        setInFilter,
        date,
        setInDate,
      }}
    >
      {children}
    </SupportHistoryFilterContext.Provider>
  );
};

export { SupportHistoryFilterContext, SupportHistoryFilterProvider };
