/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dayjs from 'dayjs';
import { createContext, useCallback, useState } from 'react';
import { DateRange } from '@mui/x-date-pickers-pro';
import useFilter from '@hooks/utils/filter/useFilter';
import { DataPagitionValue, FilterSupportQueueType } from 'types/table';

const SupportQueueFilterContext = createContext<{
  filter: FilterSupportQueueType;
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

const SupportQueueFilterProvider = ({ children }: Props): JSX.Element => {
  const [filter, setFilter] = useState<FilterSupportQueueType>({
    location: '',
    doctorNameKo: '',
    treatmentStatus: '',
    keyword: '',
    page: 0,
  });
  const [date, setDate] = useState<DateRange<dayjs.Dayjs>>([dayjs(), dayjs()]);

  const { setInFilter, setInDate } = useFilter({
    url: '/medical-support/telemedicine/queueing',
    filter: filter,
    setFilter: setFilter,
    date: date,
    setDate: setDate,
  });

  return (
    <SupportQueueFilterContext.Provider
      value={{
        filter,
        setInFilter,
        date,
        setInDate,
      }}
    >
      {children}
    </SupportQueueFilterContext.Provider>
  );
};

export { SupportQueueFilterContext, SupportQueueFilterProvider };
