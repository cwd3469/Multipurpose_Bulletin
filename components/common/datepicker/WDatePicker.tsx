import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Image from 'next/image';
import { WDatePickerProps } from './type';
import { Dayjs } from 'dayjs';
import { deDE, koKR } from '@mui/x-date-pickers';

const WDatePicker = (props: WDatePickerProps) => {
  const { date, selectDate } = props;

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        koKR.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <DatePicker
        value={date}
        onChange={(newValue: Dayjs | null) => selectDate(newValue)}
        format="YYYY-MM-DD "
        sx={{
          backgroundColor: '#fff',
          borderRadius: '6px',
          '& .MuiInputBase-input': {
            height: '1.250em',
            letterSpacing: '-0.2px',
            color: '#666',
            padding: '14px 12px',
            paddingRight: '0px',
            fontSize: '16px',
          },
          '& .MuiButtonBase-root': {
            marginRight: '0px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ebeced',
          },
        }}
        slots={{
          openPickerIcon: () => (
            <Image
              src={'/assets/icons/ic_calendar.svg'}
              alt="캘린더 아이콘"
              width="24px"
              height="24px"
            />
          ),
        }}
        slotProps={{
          textField: {
            variant: 'outlined',
            placeholder: '예약 변경할 날짜를 선택해 주세요.',
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

export default WDatePicker;
