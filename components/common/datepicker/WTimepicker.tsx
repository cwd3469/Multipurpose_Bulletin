/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, styled, SxProps, TextField, Theme } from '@mui/material';
import { SyntheticEvent, useRef, useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface WTimepickerType {
  selected?: Date;
  onChange?: (date: Date | null, event?: SyntheticEvent<any, Event>) => void;
  timeIntervals?: number;
  dateFormat?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  maxTime?: Date;
  minTime?: Date;
}
interface WTimeContainerType {
  className: string;
  children: JSX.Element;
}
export const WTimeBox = styled(Box)(({ theme }) => ({
  width: '160px',
  padding: '4px',
  border: '1px solid #EBECED',
  borderRadius: '6px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const WTimeContainerBox = styled(Box)(({ theme }) => ({
  padding: '3px',
  background: '#fff',
  border: '1px solid #000',
  '& .react-datepicker': {
    border: '0px',
  },
  '& .react-datepicker__header': {
    display: 'none',
  },
  '& .react-datepicker__time-container': {
    width: '160px !important',
  },
  '& .react-datepicker__time .react-datepicker__time-box': {
    width: '160px !important',
  },
  '& .react-datepicker__time-list-item': {
    padding: '10px 5px !important',
    fontSize: '14px',
    height: '35px !important',
  },
}));

export const Timepicker = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: '10px',
    textAlign: 'center',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
    borderWidth: '0px !important',
  },
  '& .MuiInputBase-root:hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
      borderWidth: '0px !important',
    },
  },
  '& .Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
      borderWidth: '0px !important',
    },
  },
  '& ::-webkit-calendar-picker-indicator': {
    background: 'none',
    position: 'absolute',
    left: '-7px',
    top: '0px',
    width: '92%',
    height: '90%',
    zIndex: '9099',
  },
}));

const WTimeContainer = (props: WTimeContainerType) => {
  return (
    <WTimeContainerBox>
      <CalendarContainer className={props.className}>
        <Box
          sx={{
            position: 'relative',
            '& ul.react-datepicker__time-list li': {
              '&.react-datepicker__time-list-item--disabled': {
                display: 'none',
              },
            },
          }}
        >
          {props.children}
        </Box>
      </CalendarContainer>
    </WTimeContainerBox>
  );
};

const WTimepicker = (props: WTimepickerType) => {
  const {
    selected,
    onChange,
    timeIntervals,
    dateFormat,
    sx,
    disabled,
    minTime,
    maxTime,
  } = props;
  const [detes, setDate] = useState<Date>(new Date());
  const getDate = (date: Date | null, event?: SyntheticEvent<any, Event>) => {
    if (date) setDate(date);
  };

  return (
    <DatePicker
      minTime={minTime}
      maxTime={maxTime}
      disabled={disabled}
      selected={selected ? selected : detes}
      onChange={onChange ? onChange : getDate}
      showTimeSelect
      showTimeSelectOnly
      timeFormat="aa HH:mm"
      timeIntervals={timeIntervals ? timeIntervals : 30}
      timeCaption="Time"
      dateFormat={dateFormat ? dateFormat : 'HH:mm'}
      customInput={<Timepicker sx={{ textAlign: 'center', ...sx }} />}
      calendarContainer={WTimeContainer}
    />
  );
};

export default WTimepicker;
