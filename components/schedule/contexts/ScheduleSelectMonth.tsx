import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import { createContext, useEffect, useState } from 'react';

type ScheduleSelectMonthContextType = {
  monthRangeDate: DateRange<string | number | Date | Dayjs | null | undefined>;
  setInMonthRangeDate?: (
    range: DateRange<string | number | Date | Dayjs | null | undefined>,
  ) => void;
};
export const ScheduleSelectMonthContext = createContext<ScheduleSelectMonthContextType>({
  monthRangeDate: [dayjs().startOf('month'), dayjs().endOf('month')],
});

export const ScheduleSelectMonthProvider = (props: { children: JSX.Element }) => {
  const [monthRangeDate, setMonthRangeDate] = useState<
    DateRange<string | number | Date | Dayjs | null | undefined>
  >([dayjs().startOf('month'), dayjs().endOf('month')]);

  const setInMonthRangeDate = (
    range: DateRange<string | number | Date | Dayjs | null | undefined>,
  ) => setMonthRangeDate(range);

  return (
    <ScheduleSelectMonthContext.Provider value={{ monthRangeDate, setInMonthRangeDate }}>
      {props.children}
    </ScheduleSelectMonthContext.Provider>
  );
};
