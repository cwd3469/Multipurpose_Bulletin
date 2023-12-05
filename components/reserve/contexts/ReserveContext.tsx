/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dayjs from 'dayjs';
import { createContext, useCallback, useEffect, useState } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro';
import useFilter from '@hooks/utils/filter/useFilter';
import { DataPagitionValue, FilterReserveType } from 'types/table';
import useAuth from '@hooks/useAuth';
import { transQueryDateToString, transQueryUrlFilter } from '@utils/transtext';
import { useRouter } from 'next/router';

const ReserveContext = createContext<{
  filter: FilterReserveType;
  setInFilter: (value: DataPagitionValue, keyId: string) => void;
  date: DateRange<dayjs.Dayjs>;
  setInDate: (date: DateRange<dayjs.Dayjs>) => void;
  filterReset: () => void;
  queryString: string;
}>({
  filter: {
    page: 0,
    location: '',
    status: '',
    keyword: '',
    enterType: '',
  },
  date: [dayjs().subtract(30, 'day'), dayjs()],
  setInFilter: (value: DataPagitionValue, keyId: string) => undefined,
  setInDate: (date: DateRange<dayjs.Dayjs>) => undefined,
  filterReset: () => undefined,
  queryString: '',
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const ReserveFilterProvider = ({ children }: Props): JSX.Element => {
  const filterDefaultValue = {
    page: 0,
    location: '',
    status: '',
    keyword: '',
    enterType: '',
  };
  const userInfo = useAuth();
  const router = useRouter();
  const dateDefaultValue: DateRange<dayjs.Dayjs> = [dayjs().subtract(30, 'day'), dayjs()];
  const [filter, setFilter] = useState<FilterReserveType>(filterDefaultValue);
  const [date, setDate] = useState<DateRange<dayjs.Dayjs>>(dateDefaultValue);
  const { setInFilter, setInDate, filterReset } = useFilter({
    url: userInfo.permission === 'HOSPITAL_DOCTOR' ? '/doctor/reserve' : '/medical-support/reserve',
    filter: filter,
    setFilter: setFilter,
    date: date,
    setDate: setDate,
    reset: () => {
      setFilter(filterDefaultValue);
      setDate(dateDefaultValue);
    },
  });
  const queryUrl = transQueryUrlFilter(router.query, filter);
  const queryDate = transQueryDateToString(router.query, date);
  const queryString = `${queryUrl}${queryDate}`;

  return (
    <ReserveContext.Provider
      value={{
        filter,
        setInFilter,
        date,
        setInDate,
        filterReset,
        queryString,
      }}
    >
      {children}
    </ReserveContext.Provider>
  );
};

export { ReserveContext, ReserveFilterProvider };
