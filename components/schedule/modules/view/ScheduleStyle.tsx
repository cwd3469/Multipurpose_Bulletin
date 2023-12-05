/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Box,
  Button,
  ButtonProps,
  Grid,
  GridProps,
  List,
  ListItem,
  ListItemButton,
  Stack,
  SxProps,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonProps,
  Typography,
  styled,
} from '@mui/material';
import Image from 'next/image';
import { DateCalendar, DateCalendarProps, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { TDate } from 'ahooks/lib/useCountDown';
import { Dayjs } from 'dayjs';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { ScheduleComponent } from '../input/ScheduleCalendar';
import {
  DateRangeCalendar,
  DateRangeCalendarProps,
  DateRangePickerDay as MuiDateRangePickerDay,
  DateRangePickerDayProps,
} from '@mui/x-date-pickers-pro';

export const ScheduleModalLayout = (props: {
  src: string;
  mainContents?: string;
  contents?: string;
}) => {
  return (
    <Stack width="450px" gap="24px">
      <Image src={props.src} alt="아이콘" width={55} height={55} />
      <Stack justifyContent="center" alignItems="center">
        {props.mainContents && (
          <Typography color="#666" textAlign="center" fontSize="24px">
            선택한 일자에 예약 시간 스케줄을
          </Typography>
        )}
        <Grid container justifyContent="center" alignItems="center" gap="5px">
          {props.mainContents && (
            <Typography
              color="#666"
              textAlign="center"
              fontSize="24px"
              style={{ fontWeight: 'bold', color: '#4AC6FF' }}
            >
              {props.mainContents}{' '}
            </Typography>
          )}
          <Stack width="auto">
            {props.contents &&
              props.contents.split('\n').map((item, index) => {
                return (
                  <Typography color="#666" textAlign="center" fontSize="24px" key={index}>
                    {item}
                  </Typography>
                );
              })}
          </Stack>
        </Grid>
      </Stack>
      <Box height="16px" />
    </Stack>
  );
};

export const ScheduleTitleStack = (props: {
  children: JSX.Element;
  title: string;
  error: string;
}) => {
  return (
    <Stack gap="12px">
      <Typography variant="subtitle1" fontWeight="500" color="#3c3d47" lineHeight="24px">
        {props.title}
      </Typography>
      {props.children}
      <Typography color="#ED271E" fontSize="12px">
        {props.error}
      </Typography>
    </Stack>
  );
};

export function CalenGuid(props: ScheduleComponent) {
  return (
    <Grid
      className={props.className}
      container
      justifyContent={'center'}
      alignItems={'center'}
      padding="24px"
      gap="10px"
      borderRadius="12px"
      sx={{
        border: '1px solid #ebeced',
        backgroundColor: '#f8f8f8',
        ...props.sx,
      }}
    >
      <CircleRoundedIcon
        sx={{
          color: '#666666',
        }}
      />
      <Typography variant="subtitle1" fontWeight="500" color="#565e65">
        등록된스케줄있음
      </Typography>
      <CircleRoundedIcon
        sx={{
          color: '#4AC6FF',
        }}
      />
      <Typography variant="subtitle1" fontWeight="500" color="#565e65">
        선택된스케줄{' '}
      </Typography>
    </Grid>
  );
}

function CustomDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge key={props.day.toString()}>
      <PickersDay
        {...other}
        className={isSelected ? 'schedule-in-day' : 'schedule-out-day'}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        sx={{
          '&.schedule-in-day': {
            backgroundColor: '#666666',
            color: '#fff',
          },
        }}
      />
    </Badge>
  );
}

const DateRangePickerDay2 = (
  props: DateRangePickerDayProps<TDate> & { highlightedDays?: number[] },
) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const date: Dayjs = day as Dayjs;
  const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(date.date()) >= 0;

  return (
    <MuiDateRangePickerDay
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      className={isSelected ? 'schedule-in-day' : ''}
      sx={{
        '&.schedule-in-day': {
          backgroundColor: '#666666',
          color: '#eee',
          borderRadius: '100%',
          '& .MuiButtonBase-root': {
            color: '#eee',
          },
        },
        '& .MuiDateRangePickerDay-rangeIntervalPreview': {
          border: '0px',
        },
        '& .MuiButtonBase-root': {
          transform: 'scale(1)',
        },
        ...(!outsideCurrentMonth &&
          props.isHighlighting && {
            borderRadius: 0,
            backgroundColor: '#E9F2FD',
            color: '#fff',
            position: 'relative',
            '&:hover, &:focus': {
              backgroundColor: '#4AC6FF',
            },
            '&:after': {
              content: "''",
              position: 'absolute',
              top: '0px',
              right: '-20px',
              width: '20px',
              height: '100%',
              backgroundColor: '#E9F2FD',
            },
            '&.schedule-in-day': {
              backgroundColor: '#E9F2FD',
              color: '#fff',
              borderRadius: 'none',
            },
          }),
        ...(props.isStartOfHighlighting && {
          borderTopLeftRadius: '50%',
          borderBottomLeftRadius: '50%',
        }),
        ...(props.isEndOfHighlighting && {
          borderTopRightRadius: '50%',
          borderBottomRightRadius: '50%',
          '&:after': {
            display: 'none',
          },
        }),
      }}
    />
  );
};

const calendarStyle: SxProps<Theme> = {
  width: '100%',
  minHeight: 'auto',
  maxHeight: '560px',
  gap: '32px',

  //캘린더전체
  '& .MuiYearCalendar-root': {
    width: '33.375em',
    maxHeight: '41.000em',
  },
  '& .MuiPickersCalendarHeader-labelContainer': {
    fontSize: '26px',
    '&.MuiButtonBase-root': {
      display: 'none',
    },
  },
  '& .MuiPickersCalendarHeader-root': {
    padding: '0px',
    margin: '0px',
  },
  //캘린더헤더
  '& .MuiDayCalendar-header': {
    gap: '18px',
    '& .MuiDayCalendar-weekDayLabel': {
      width: '47.5px',
      height: '47.5px',
      fontSize: '24px',
      color: '#565e65',
    },
  },
  '& .MuiPickersArrowSwitcher-root': {
    gap: '11px',
  },
  //캘린더 월이동 버튼
  '& .MuiPickersArrowSwitcher-root .MuiButtonBase-root': {
    padding: '0',
    '& svg': {
      fontSize: '40px',
    },
    '&.Mui-disabled': {
      opacity: '0.3',
    },
  },
  '& .MuiDayCalendar-weekContainer': {
    gap: '18px',
  },
  //캘린더바디<DayButton>
  '& .MuiDayCalendar-monthContainer': {
    display: 'flex',
    flexDirection: 'column',
    gap: '21px',
    paddingTop: '21px',
    position: 'relative',
  },
  '& .MuiDayCalendar-slideTransition': {
    minHeight: 'auto',
    '& .MuiPickersDay-root': {
      width: '47.5px',
      height: '47.5px',
      fontSize: '24px',
      borderRadius: '100%',
      '&.Mui-disabled': {
        backgroundColor: '#fff',
        color: '#ccc',
      },
      '&.Mui-selected': {
        backgroundColor: '#4AC6FF',
      },
    },
    '& .MuiPickersDay-today': {
      border: '0px',
      pointerEvents: 'none',
      backgroundColor: '#fff',
      color: '#ccc',
    },
  },

  '&.Mgt-Schedule-calender': {
    width: '360px',
    maxHeight: '380px',
    gap: '24px',
    overflow: 'hidden',
    '& .MuiButtonBase-root.MuiPickersDay-root': {
      '&.schedule-out-day': {
        pointerEvents: 'none',
      },
    },
    '& .MuiYearCalendar-root': {
      maxHeight: '400px',
      overflow: 'hidden',
    },
    //********************복수 선태 켈린더 css */
    '& .MuiDateRangeCalendar-monthContainer': {
      width: '348px',
      maxHeight: '400px',
      overflow: 'hidden',
      '& .MuiPickersCalendarHeader-root': {
        marginBottom: '24px',
      },
    },
    '& .MuiDayCalendar-monthContainer': {
      gap: '9px',
      paddingTop: '9px',
    },
    '& .MuiPickersCalendarHeader-labelContainer': {
      fontSize: '22px',
    },
    '& .MuiDayCalendar-weekContainer': {
      gap: '13px',
      justifyContent: 'space-between',
      '& .MuiDateRangePickerDay-root:last-child': {
        '&:after': {
          display: 'none',
        },
      },
    },
    '& .MuiPickersCalendarHeader-root': {
      padding: '0px',
      margin: '0px',
    },
    '& .MuiDayCalendar-header': {
      gap: '18px',
      '& .MuiDayCalendar-weekDayLabel': {
        width: '34.7px',
        height: '34.7px',
        fontSize: '16px',
      },
    },
    '& .MuiDayCalendar-slideTransition': {
      '& .MuiPickersDay-root': {
        width: '34.7px',
        height: '34.7px',
        fontSize: '16px',
      },
      '& .MuiPickersDay-today': {
        border: '0px',
        pointerEvents: 'none',
        backgroundColor: '#fff',
        color: '#ccc',
      },
    },
  },
};

export const ScheduleDateCalendar = styled((props: DateCalendarProps<TDate>) => (
  <DateCalendar
    disablePast
    {...props}
    slots={
      {
        day: CustomDay,
        rightArrowIcon: () => {
          return (
            <Image
              src={'/assets/icons/ic_arrow_right_heavy.svg'}
              alt="아이콘"
              width={30}
              height={30}
            />
          );
        },
        leftArrowIcon: () => {
          return (
            <Image
              src={'/assets/icons/ic_arrow_left_heavy.svg'}
              alt="아이콘"
              width={30}
              height={30}
            />
          );
        },
        //),
      } as any
    }
  />
))(({ theme }) => ({
  ...calendarStyle,
}));

export const ScheduleDateRangeCalendar = styled((props: DateRangeCalendarProps<TDate>) => (
  <DateRangeCalendar
    disablePast
    {...props}
    calendars={1}
    slots={
      {
        day: DateRangePickerDay2,
        rightArrowIcon: () => {
          return (
            <Image
              src={'/assets/icons/ic_arrow_right_heavy.svg'}
              alt="아이콘"
              width={30}
              height={30}
            />
          );
        },
        leftArrowIcon: () => {
          return (
            <Image
              src={'/assets/icons/ic_arrow_left_heavy.svg'}
              alt="아이콘"
              width={30}
              height={30}
            />
          );
        },
        //),
      } as any
    }
  />
))(({ theme }) => ({
  ...calendarStyle,
}));

export const ScheduleSubTitle = styled(Typography)(({ theme }) => ({
  fontSize: '22px',
  fontWeight: '500',
  color: '#525362',
  '& .active': {
    color: '#4AC6FF',
  },
}));

export const ScheduleBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '6px',
  border: '1px solid #F2F2F2',
}));

export const ScheduleNoneList = (props: {
  contents?: string;
  sx?: SxProps<Theme>;
  isList?: boolean;
  subText?: string;
}) => {
  const textList = props.contents ? props.contents.split(' ') : [];
  textList.splice(1, 0, '진료');
  const text = props.isList ? props.contents : textList.join(' ');

  return (
    <Stack
      justifyContent={'center'}
      alignItems="center"
      gap="24px"
      sx={{
        position: 'absolute',
        top: '268px',
        left: '50%',
        transform: 'translateX(-50%)',
        ...props.sx,
      }}
    >
      <Image
        src={'/assets/icons/ic_clock_circle.svg'}
        alt="스케줄아이콘"
        width="55px"
        height="55px"
      />
      <Typography
        variant="subtitle1"
        fontWeight="400"
        lineHeight="24px"
        textAlign="center"
        width={props.subText ? '120px' : '160px'}
        color="#999"
      >
        {props.subText ? props.subText : <> {text} 시간이 없습니다.</>}
      </Typography>
    </Stack>
  );
};

export const ScheduleListBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23D8D8D8FF' stroke-width='1' stroke-dasharray='3' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
  borderRadius: '12px',
  padding: '24px',
  height: '843px',
}));

export const ScheduleBoxHeader = styled(Box)(({ theme }) => ({
  padding: '11px',
  borderBottom: '1px solid #000',
  textAlign: 'center',
}));

export const ScheduleItemList = styled(List)(({ theme }) => ({
  width: '100%',
  maxWidth: 360,
  overflowY: 'auto',
  overflowX: 'hidden',
}));

export const ScheduleTimeItem = styled(ListItem)(({ theme }) => ({
  ...theme.typography.body1,
  padding: '12px',
  textAlign: 'center',
  borderRadius: '100px',
  justifyContent: 'center',
  color: '#4AC6FF',
  backgroundColor: '#E2F6FF',
  border: '1px solid #E9F2FD',
  letterSpacing: '0px',
  gap: '6px',
  fontWeight: '500',
  '&.MuiButton-startIcon': {
    marginLeft: '0px',
  },
  '&:hover': {
    boxShadow: 'none',
    color: '#4AC6FF',
    backgroundColor: '#D9F0FA',
  },
}));

export const ScheduleTimeItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: '0px',
  marginBottom: '10px',
  justifyContent: 'center',
  '&.Mui-disabled': {
    opacity: '1',
  },
  '&:last-child': {
    marginBottom: '0px',
  },
  '&:hover': {
    backgroundColor: '#D9F0FA',
  },
}));

export const ScheduleTimeGroupButton = styled((props: ButtonProps) => {
  const iconSrcList = (className?: string) => {
    if (className) {
      const status = className.split(' ').find((element) => {
        if (element === 'select-on' || element === 'cancel-on') return true;
      });
      switch (status) {
        case 'select-on':
          return '/assets/icons/ic_ select_on.svg';
        case 'cancel-on':
          return '/assets/icons/ic_cancle_circle_on.svg';
        default:
          return '/assets/icons/ic_add_circle_off.svg';
      }
    }
    return '/assets/icons/ic_add_circle_off.svg';
  };
  return (
    <Button
      {...props}
      variant="outlined"
      startIcon={
        <Image
          src={iconSrcList(props.className)}
          alt="스케줄리스트아이콘"
          width="20px"
          height="20px"
        />
      }
    />
  );
})(({ theme }) => ({
  borderRadius: '100px',
  padding: '10px 0px',
  color: '#565e65',
  borderColor: '#ebeced',
  background: '#fff',
  lineHeight: '1',
  '&.cancel-on, &.select-on': {
    color: '#4AC6FF',
    backgroundColor: '#E2F6FF',
    border: '1px solid #E9F2FD',
  },
}));

export const ScheduleToggleButton = styled(ToggleButton)(({ theme }) => ({
  width: '50%',
  border: '0px',
  borderRadius: '6px',
  padding: '6px',
  fontSize: '16px',
  lineHeight: '22px',
  gap: '6px',
  alignItems: 'center',
  color: '#999999',
  '&.MuiButtonBase-root:not(:last-of-type)': {
    borderTopRightRadius: '6px',
    borderBottomRightRadius: '6px',
  },
  '& img': {
    opacity: '0.5',
  },
  '&.Mui-selected': {
    color: '#000',
    backgroundColor: '#fff',
    border: '1px solid rgba(235,236,237,0.6)',
    '& img': {
      opacity: '1',
    },
  },
  '&.WModify-selected': {
    padding: '11px 8px',
    '&.Mui-selected': {
      color: '#fff',
      backgroundColor: '#4AC6FF',
      border: '1px solid rgba(235,236,237,0.6)',
      boxShadow: '0 3px 8px 0 rgba(0, 0, 0, 0.12)',
    },
  },
}));

export const ScheduleToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  width: '100%',
  padding: '3px',
  backgroundColor: 'rgba(235,236,237,0.6)',
}));

export const ScheduleProgileBox = styled((props: GridProps) => <Grid {...props} container />)(
  ({ theme }) => ({
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 32px',
  }),
);

export const ScheduleWeeksButton = styled((props: ToggleButtonProps) => {
  return (
    <ToggleButton
      {...props}
      sx={{
        '&::after': {
          backgroundImage: props.selected
            ? `url("/assets/icons/ic_checkbox_on.svg")`
            : `url("/assets/icons/ic_checkbox_off.svg")`,
        },
      }}
    >
      {props.children}
    </ToggleButton>
  );
})(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '6px',
  border: '1px solid  #ebeced',
  color: '#cccccc',
  fontSize: '14px',
  gap: '4px',
  letterSpacing: '0px',
  fontWeight: '400',
  padding: '11px 9px',
  lineHeight: '1',
  boxSizing: 'border-box',
  position: 'relative',
  '&::after': {
    content: "''",
    width: '20px',
    height: '20px',
  },

  '&.MuiButtonBase-root:not(:last-of-type)': {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderLeft: '1px solid #ebeced',
  },
  '&.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderLeft: '1px solid #ebeced',
    marginLeft: '0px',
  },
  '&.MuiButtonBase-root.Mui-selected': {
    backgroundColor: '#E9F2FD',
    border: '1px solid #4AC6FF',
    color: '#4AC6FF',
    borderLeft: '1px solid #4AC6FF !important',
    '&:not(:last-of-type)': {
      border: '1px solid #4AC6FF !important',
    },
    '&:not(:first-of-type)': {
      border: '1px solid #4AC6FF !important',
    },
  },
}));

export const ScheduleButton = styled((props: ButtonProps) => (
  <Button {...props} variant="contained" />
))(({ theme }) => ({
  backgroundColor: '#E2F6FF',
  boxShadow: 'none',
  height: '48px',
  borderRadius: '12px',
  padding: '12px 16px',
  fontSize: '18px',
  fontWeight: '600',
  color: '#4AC6FF',
  border: '1px solid #E9F2FD',

  '&.Mui-disabled': {
    backgroundColor: '#f8f8f8',
    color: '#999999',
    '& .MuiButton-startIcon': {
      '& img': {
        color: '#000',
      },
    },
  },
  '&.MuiButton-startIcon': {
    marginLeft: '0px',
  },
  '&:hover': {
    boxShadow: 'none',
    color: '#4AC6FF',
    backgroundColor: '#D9F0FA',
  },
}));
export const ScheduleEventButtom = styled((props: ButtonProps) => (
  <Button {...props} variant="contained" />
))(({ theme }) => ({
  width: '180px',
  padding: '20px',
  fontSize: '16px',
  lineHeight: '1.2',
  boxShadow: 'none',
  borderRadius: ' 6px',
  '&.Delete-btn': {
    backgroundColor: '#fc5935',
    '&.Mui-disabled': {
      opacity: '0.3',
      color: '#fff',
    },
  },
}));
