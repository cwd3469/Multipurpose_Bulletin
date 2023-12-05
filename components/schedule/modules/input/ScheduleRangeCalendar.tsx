/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { ScheduleContext } from '../../contexts/ScheduleContext';
import {
  CalenGuid,
  ScheduleBox,
  ScheduleWeeksButton,
  ScheduleDateRangeCalendar,
  ScheduleSubTitle,
  ScheduleTitleStack,
} from '../view/ScheduleStyle';
import { Box, Stack, ToggleButtonGroup } from '@mui/material';
import { ScheduleMonthContext } from '../../contexts/ScheduleMonth';
import { DateRange, MultiInputDateRangeField } from '@mui/x-date-pickers-pro';
import { ScheduleCalendarProp } from './ScheduleCalendar';
import { ScheduleSelectMonthContext } from '@components/schedule/contexts/ScheduleSelectMonth';
import { useRouter } from 'next/router';
import ScheduleToggleGroup from './ScheduleToggleGroup';

const weekList = [
  {
    name: '요일 전체 선택',
    id: '8',
  },
  {
    name: '일요일',
    id: '7',
  },
  {
    name: '월요일',
    id: '1',
  },
  {
    name: '화요일',
    id: '2',
  },
  {
    name: '수요일',
    id: '3',
  },
  {
    name: '목요일',
    id: '4',
  },
  {
    name: '금요일',
    id: '5',
  },
  {
    name: '토요일',
    id: '6',
  },
];

const ScheduleRangeCalendar = (props: ScheduleCalendarProp) => {
  const { solt, sx, title } = props;
  const router = useRouter();
  const month = React.useContext(ScheduleMonthContext);
  const changeMonth = React.useContext(ScheduleSelectMonthContext);
  const info = React.useContext(ScheduleContext);
  const calenderProps = {
    className: solt ? (solt.calendar ? solt.calendar.className : undefined) : undefined,
    sx: solt ? (solt.calendar ? solt.calendar.sx : undefined) : undefined,
  };

  const onClickRangeCalendar = (
    newValue: DateRange<string | number | Date | Dayjs | null | undefined>,
  ) => {
    if (info.setInDateRange) info.setInDateRange(newValue);
    const dayStart: Dayjs = newValue[0] as Dayjs;
    const dayEnd: Dayjs = newValue[1] as Dayjs;
    const now = dayjs();
    const day = dayStart.format('D');
    if (month.handleDayTimTable) month.handleDayTimTable(day);
    if (info.catchError) {
      if (now.isAfter(dayStart))
        return info.catchError('최소 내일 날짜를 입력해 주세요.', 'inputDateError');
      if (JSON.stringify(newValue[1]) === 'null')
        return info.catchError('최소 내일 날짜를 입력해 주세요.', 'inputDateError');
      if (dayStart.isAfter(dayEnd))
        return info.catchError('시작 날짜 이후로 입력해 주세요.', 'inputDateError');
      if (dayjs().add(1, 'day').diff(dayEnd, 'year') < 0)
        return info.catchError('최대 1년까지 입력 가능합니다.', 'inputDateError');
      return info.catchError('', 'inputDateError');
    }
  };

  const onClickMonthBtn = (month: string | number | Dayjs | Date | null | undefined) => {
    const now = dayjs();
    const dateJs: Dayjs = month as Dayjs;

    const changeMonthStartEnd: DateRange<string | number | Date | Dayjs | null | undefined> = [
      dateJs.startOf('month'),
      dateJs.endOf('month'),
    ];
    const after = now.isAfter(dateJs);
    onClickRangeCalendar(
      after ? [now.add(1, 'day'), info.rangeDate[1]] : [dateJs, info.rangeDate[1]],
    );
    changeMonth.setInMonthRangeDate && changeMonth.setInMonthRangeDate(changeMonthStartEnd);
  };

  const onWeekListButtonGroup = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    newFormats: string[],
  ) => {
    const { value } = event.target as any;
    event.stopPropagation();
    month.handleWeekList && month.handleWeekList(event, newFormats);
    if (info.catchError) {
      if (value === '8' && newFormats.length === 7)
        return info.catchError('한개 이상의 요일을 선택해 주세요.', 'weekError');
      if (!newFormats.length)
        return info.catchError('한개 이상의 요일을 선택해 주세요.', 'weekError');
      info.catchError('', 'weekError');
    }
  };

  return (
    <Stack gap="16px" sx={sx}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        dateFormats={{ monthAndYear: 'YYYY년 MM월' }}
      >
        <ScheduleSubTitle>{title}</ScheduleSubTitle>
        <ScheduleBox
          className="ScheduleCalendar-ScheduleBox"
          padding="2.000em"
          width={'33.375em'}
          sx={{
            borderRadius: '12px',
          }}
        >
          <ScheduleDateRangeCalendar
            value={info.rangeDate}
            onChange={onClickRangeCalendar}
            onMonthChange={onClickMonthBtn}
            {...calenderProps}
            slotProps={
              {
                day: {
                  highlightedDays: month.scheduleDayList,
                },
              } as any
            }
          />
          <Box height={'24px'} />
          <CalenGuid
            className={
              solt ? (solt.calenderGuid ? solt.calenderGuid.className : undefined) : undefined
            }
            sx={solt ? (solt.calenderGuid ? solt.calenderGuid.sx : undefined) : undefined}
          />
          <>
            <ScheduleToggleGroup />
            <ScheduleTitleStack
              title="선택한 날짜"
              error={info.error ? info.error.inputDateError : ''}
            >
              <MultiInputDateRangeField
                value={info.rangeDate}
                onChange={onClickRangeCalendar}
                format="YYYY.MM.DD"
                maxDate={dayjs().add(1, 'day').add(1, 'year')}
                minDate={dayjs().add(1, 'day')}
                disablePast
                sx={{
                  '& .MuiTypography-body1': {
                    display: 'none',
                  },
                  '& .MuiInputBase-input': {
                    padding: '12.5px 12px',
                    lineHeight: '21px',
                    fontSize: '16px',
                    borderRadius: '6px',
                    color: '#3c3d47',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(216, 216, 216, 0.8)',
                  },
                }}
              />
            </ScheduleTitleStack>
            <Box height="27px" />
            <ScheduleTitleStack title="요일 선택" error={info.error ? info.error.weekError : ''}>
              <ToggleButtonGroup
                value={month.weekList}
                onChange={onWeekListButtonGroup}
                sx={{
                  display: 'flex',
                  gap: '8px',
                  overflow: 'auto',
                  flexWrap: 'wrap',
                }}
              >
                {weekList.map((item, index) => {
                  return (
                    <ScheduleWeeksButton
                      key={index}
                      value={item.id}
                      sx={{
                        width: item.id === '8' ? '100%' : 'auto',
                      }}
                    >
                      {item.name}
                    </ScheduleWeeksButton>
                  );
                })}
              </ToggleButtonGroup>
            </ScheduleTitleStack>
          </>
        </ScheduleBox>
      </LocalizationProvider>
    </Stack>
  );
};

export default ScheduleRangeCalendar;
