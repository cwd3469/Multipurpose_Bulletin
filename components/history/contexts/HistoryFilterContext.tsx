/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dayjs from 'dayjs';
import { createContext, useCallback, useState } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro';
import useFilter from '@hooks/utils/filter/useFilter';
import { DataPagitionValue, FilterHistoryPagitionType } from 'types/table';

const HistoryFilterContext = createContext<{
  filter: FilterHistoryPagitionType;
  setInFilter: (value: DataPagitionValue, keyId: string) => void;
  date: DateRange<dayjs.Dayjs>;
  setInDate: (date: DateRange<dayjs.Dayjs>) => void;
}>({
  filter: {
    page: 0,
    location: '',
    status: '',
    keyword: '',
    isDone: '',
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

const HistoryFilterProvider = ({ children }: Props): JSX.Element => {
  const [filter, setFilter] = useState<FilterHistoryPagitionType>({
    page: 0,
    location: '',
    status: '',
    keyword: '',
    isDone: '',
  });
  const [date, setDate] = useState<DateRange<dayjs.Dayjs>>([
    dayjs().subtract(7, 'day'),
    dayjs(),
  ]);

  const { setInFilter, setInDate } = useFilter({
    url: '/doctor/telemedicine/history',
    filter: filter,
    setFilter: setFilter,
    date: date,
    setDate: setDate,
  });

  return (
    <HistoryFilterContext.Provider
      value={{
        filter,
        setInFilter,
        date,
        setInDate,
      }}
    >
      {children}
    </HistoryFilterContext.Provider>
  );
};

export { HistoryFilterContext, HistoryFilterProvider };
