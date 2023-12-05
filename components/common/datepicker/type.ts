import { DateRange } from '@mui/x-date-pickers-pro';
import { Dayjs } from 'dayjs';

export type WDateRangePickerProps = {
  date: DateRange<Dayjs>;
  selectDate: (
    date: DateRange<Dayjs>,
    keyboardInputValue?: string | undefined,
  ) => void;
};

export type WDatePickerProps = {
  date: Dayjs;
  selectDate: (
    date: Dayjs | null,
    keyboardInputValue?: string | undefined,
  ) => void;
};
