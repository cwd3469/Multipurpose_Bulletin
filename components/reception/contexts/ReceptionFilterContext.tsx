/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dayjs from 'dayjs';
import { createContext, useCallback, useState } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro';
import useFilter from '@hooks/utils/filter/useFilter';
import { DataPagitionValue, FilterReceptionPagitionType } from 'types/table';

const ReceptionFilterContext = createContext<{
  filter: FilterReceptionPagitionType;
  setInFilter: (value: DataPagitionValue, keyId: string) => void;
  date: DateRange<dayjs.Dayjs>;
  setInDate: (date: DateRange<dayjs.Dayjs>) => void;
}>({
  filter: {
    nameKo: '',
    page: 0,
    location: '',
    enterType: '',
    status: 'REGIST',
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

const ReceptionFilterProvider = ({ children }: Props): JSX.Element => {
  const [filter, setFilter] = useState<FilterReceptionPagitionType>({
    nameKo: '',
    page: 0,
    location: '',
    enterType: '',
    status: 'REGIST',
  });
  const [date, setDate] = useState<DateRange<dayjs.Dayjs>>([dayjs(), dayjs()]);

  const { setInFilter, setInDate } = useFilter({
    url: '/doctor/telemedicine/reception',
    filter: filter,
    setFilter: setFilter,
    date: date,
    setDate: setDate,
  });

  return (
    <ReceptionFilterContext.Provider
      value={{
        filter,
        setInFilter,
        date,
        setInDate,
      }}
    >
      {children}
    </ReceptionFilterContext.Provider>
  );
};

export { ReceptionFilterContext, ReceptionFilterProvider };
