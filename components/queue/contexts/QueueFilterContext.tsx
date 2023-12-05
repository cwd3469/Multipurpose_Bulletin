/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dayjs from 'dayjs';
import { createContext, useState } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro';
import useFilter from '@hooks/utils/filter/useFilter';
import { DataPagitionValue, FilterQueuePagitionType } from 'types/table';

const QueueFilterContext = createContext<{
  filter: FilterQueuePagitionType;
  setInFilter: (value: DataPagitionValue, keyId: string) => void;
  date: DateRange<dayjs.Dayjs>;
  setInDate: (date: DateRange<dayjs.Dayjs>) => void;
}>({
  filter: {
    page: 0,
    location: '',
    status: '',
    keyword: '',
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

const QueueFilterProvider = ({ children }: Props): JSX.Element => {
  const [filter, setFilter] = useState<FilterQueuePagitionType>({
    page: 0,
    location: '',
    status: '',
    keyword: '',
  });
  const [date, setDate] = useState<DateRange<dayjs.Dayjs>>([dayjs(), dayjs()]);

  const { setInFilter, setInDate } = useFilter({
    url: '/doctor/telemedicine/queueing',
    filter: filter,
    setFilter: setFilter,
    date: date,
    setDate: setDate,
  });

  return (
    <QueueFilterContext.Provider
      value={{
        filter,
        setInFilter,
        date,
        setInDate,
      }}
    >
      {children}
    </QueueFilterContext.Provider>
  );
};

export { QueueFilterContext, QueueFilterProvider };
