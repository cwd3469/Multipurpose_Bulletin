import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { ScheduleContext } from '../../contexts/ScheduleContext';
import {
  CalenGuid,
  ScheduleBox,
  ScheduleDateCalendar,
  ScheduleSubTitle,
  ScheduleTitleStack,
  ScheduleToggleButton,
  ScheduleToggleButtonGroup,
} from '../view/ScheduleStyle';
import { Box, Stack, SxProps, Theme } from '@mui/material';
import { ScheduleMonthContext } from '../../contexts/ScheduleMonth';
import { useDebounceFn } from 'ahooks';
import { ScheduleSelectMonthContext } from '@components/schedule/contexts/ScheduleSelectMonth';
import { DateField, DateRange } from '@mui/x-date-pickers-pro';
import ScheduleToggleGroup from './ScheduleToggleGroup';

export type ScheduleComponent = {
  className?: string;
  sx?: SxProps<Theme>;
};

export type Solt = {
  calendar?: ScheduleComponent;
  calenderGuid?: ScheduleComponent;
};

export type ScheduleCalendarProp = {
  solt?: Solt;
  sx?: SxProps<Theme>;
  title?: string;
  mode?: 'modify' | 'register';
};

const ScheduleCalendar = (props: ScheduleCalendarProp) => {
  const { solt, sx, title, mode } = props;
  const changeMonth = React.useContext(ScheduleSelectMonthContext);
  const month = React.useContext(ScheduleMonthContext);
  const info = React.useContext(ScheduleContext);
  /**ScheduleCalendar 날짜 추출 기능 */
  const onCalendarDatePicker = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (date: any) => {
      const dayjs: Dayjs = date;
      const day = dayjs.format('D');
      if (month.handleDayTimTable) month.handleDayTimTable(day);
      if (info.setInDate) info.setInDate(dayjs);
    },
    [info, month],
  );

  const onDebounceHandle = useDebounceFn(onCalendarDatePicker, {
    wait: 100,
  });

  const onMonthChange = (month: string | number | Dayjs | Date | null | undefined) => {
    const now = dayjs();
    const dateJs: Dayjs = month as Dayjs;
    const changeMonthStartEnd: DateRange<string | number | Date | Dayjs | null | undefined> = [
      dateJs.startOf('month'),
      dateJs.endOf('month'),
    ];
    const after = now.isAfter(dateJs);
    onDebounceHandle.run(after ? now.add(1, 'day') : dateJs);
    changeMonth.setInMonthRangeDate && changeMonth.setInMonthRangeDate(changeMonthStartEnd);
  };

  const calenderProps = {
    className: solt ? (solt.calendar ? solt.calendar.className : undefined) : undefined,
    sx: solt ? (solt.calendar ? solt.calendar.sx : undefined) : undefined,
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
          <ScheduleDateCalendar
            value={info.scheduleDate}
            onChange={onDebounceHandle.run}
            onMonthChange={onMonthChange}
            {...calenderProps}
            slotProps={
              {
                day: {
                  highlightedDays: month.scheduleDayList,
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } as any
            }
          />
          <Box height="24px" />
          <CalenGuid
            className={
              solt ? (solt.calenderGuid ? solt.calenderGuid.className : undefined) : undefined
            }
            sx={solt ? (solt.calenderGuid ? solt.calenderGuid.sx : undefined) : undefined}
          />
          {mode === 'modify' && (
            <>
              <ScheduleToggleGroup />
              <ScheduleTitleStack
                title="선택한 날짜"
                error={info.error ? info.error.inputDateError : ''}
              >
                <DateField
                  value={info.scheduleDate}
                  onChange={onDebounceHandle.run}
                  format="YYYY.MM.DD"
                  maxDate={dayjs().add(1, 'year')}
                  minDate={dayjs().add(1, 'day')}
                  sx={{
                    width: '100%',
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
                  onError={(err) => {
                    if (info.catchError) {
                      if (err === 'minDate' || err === 'invalidDate')
                        return info.catchError('시작 날짜 이후로 입력해 주세요.', 'inputDateError');
                      if (err === 'maxDate')
                        return info.catchError('최대 1년까지 입력 가능합니다.', 'inputDateError');
                      return info.catchError('', 'inputDateError');
                    }
                  }}
                />
              </ScheduleTitleStack>
            </>
          )}
        </ScheduleBox>
      </LocalizationProvider>
    </Stack>
  );
};

export default ScheduleCalendar;
