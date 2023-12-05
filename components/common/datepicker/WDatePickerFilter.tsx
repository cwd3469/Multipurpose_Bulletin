import { DateRange } from '@mui/x-date-pickers-pro';
import { Dayjs } from 'dayjs';
import WDateRangePicker from './WDateRangePicker';

const WDatePickerFilter = (props: {
  setInDate: (date: DateRange<Dayjs>) => void;
  date: DateRange<Dayjs>;
}) => {
  const { date: dateRange, setInDate } = props;
  const handleDate = (
    date: DateRange<Dayjs>,
    keyboardInputValue?: string | undefined,
  ) => {
    const start = date[0] ? date[0] : date[1];
    const end = date[1] ? date[1] : date[0];
    const rang: DateRange<Dayjs> = [start, end];
    setInDate(rang);
  };

  return <WDateRangePicker date={dateRange} selectDate={handleDate} />;
};

export default WDatePickerFilter;
