import {
  DateRange,
  DateRangePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import React from 'react';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { WDateRangePickerProps } from './type';

const WDateRangePicker = (props: WDateRangePickerProps) => {
  const { date, selectDate } = props;

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ start: '', end: '' }}
    >
      <DateRangePicker
        value={date}
        format="YYYY. MM. DD "
        slots={{ field: SingleInputDateRangeField }}
        onChange={(newValue: DateRange<Dayjs>) => selectDate(newValue)}
        sx={{
          height: '40px',
          width: '230px',
          backgroundColor: '#fff',
          borderRadius: '6px',
          '& .MuiInputBase-input': {
            padding: '10px',
            textAlign: 'center',
            letterSpacing: '-0.2px',
            color: '#666',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ebeced',
          },
        }}
        dayOfWeekFormatter={(day) => {
          switch (day) {
            case 'Su':
              return '일';
            case 'Mo':
              return '월';
            case 'Tu':
              return '화';
            case 'We':
              return '수';
            case 'Th':
              return '목';
            case 'Fr':
              return '금';
            case 'Sa':
              return '토';
            default:
              return '-';
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default WDateRangePicker;
