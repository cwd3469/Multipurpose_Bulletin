import { createContext, useCallback, useEffect, useState } from 'react';
import { ScheduleProvider, TreatTime } from './ScheduleContext';
import dayjs from 'dayjs';
import { stringToDate } from '@utils/date';
import { forinKeyArr } from '@utils/file';
import { useDebounceEffect } from 'ahooks';

interface ScheduleMonthContextType {
  /**스케줄 타임 테이블 리스트 */
  dayTimeTable: TreatTime[];
  /**스케줄 check 리스트*/
  scheduleDayList?: number[];
  /**스케줄 타임 테이브 변경 */
  handleDayTimTable?: (day: string) => void;
  /**스케줄 월 데이터  */
  monthData?: MonthDateType;
  /**스케줄 의사 데이터 */
  profileInfo?: ProfileType;
  /**스케줄 일주일 리스트 */
  weekList: string[];
  handleWeekList?: (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => void;
  clearState?: () => void;
}
export interface MonthDateType {
  [key: string]: {
    hasAppointment: boolean;
    timetable: string[];
  };
}
export interface ProfileType {
  doctorAccountUlid: string;
  doctorName: string;
  year: string;
  month: string;
  maxScheduleDate: string;
}

const ScheduleMonthContext = createContext<ScheduleMonthContextType>({
  dayTimeTable: [],
  weekList: [],
});

const ScheduleMonthProvider = (props: {
  children: JSX.Element | JSX.Element[];
  monthDate: MonthDateType;
  profile: ProfileType;
}): JSX.Element => {
  const { monthDate, profile } = props;
  /**ScheduleMonthContext State */
  const [scheduleDayList, setScheduleDayList] = useState<number[]>();
  const [dayTimeTable, setDayTimeTable] = useState<TreatTime[]>([]);
  const [monthData, setMonthData] = useState<MonthDateType>();
  const [profileInfo, setProfileInfo] = useState<ProfileType>();
  const [weekList, setWeekList] = useState<string[]>([]);

  /**ScheduleMonthContext 날짜별 시간 테이블 변경 기능 */
  const handleDayTimeTableChange = useCallback((dayList: MonthDateType, day: string) => {
    if (!dayList) return;
    const arr = dayList[day] ? dayList[day].timetable : [];
    const timeMap: TreatTime[] = arr.map((item) => {
      return {
        startTime: stringToDate(item).format('HHmm'),
        endTime: stringToDate(item).add(10, 'm').format('HHmm'),
      };
    });
    return setDayTimeTable(timeMap);
  }, []);

  /**ScheduleMonthContext 일주일 변경 기능 */
  const handleWeekList = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { value } = event.target as any;
    const all = ['1', '2', '3', '4', '5', '6', '7'];
    const listAll = [...all, '8'];
    const sort = newFormats.sort((a, b) => Number(a) - Number(b));
    const filter = sort.filter((item) => item !== '8');
    if (value === '8') {
      const find = newFormats.find((item) => item === '8');
      if (find) {
        return setWeekList(listAll);
      } else {
        return setWeekList([]);
      }
    }
    if (JSON.stringify(sort) === JSON.stringify(all)) {
      return setWeekList(listAll);
    }
    return setWeekList(filter);
  };

  /**ScheduleMonthContext 날짜별 시간 테이블 변경 기능 */
  const handleDayTimTable = useCallback(
    (day: string) => {
      if (monthData) handleDayTimeTableChange(monthData, day);
    },
    [monthData, handleDayTimeTableChange],
  );

  /**ScheduleMonthContext day list 변경 기능 */
  const handleDayListChange = useCallback((dayList: MonthDateType) => {
    const arr = forinKeyArr(dayList);
    const numList = arr.map((item) => {
      return Number(item);
    });
    setScheduleDayList(numList);
  }, []);

  useDebounceEffect(
    () => {
      if (JSON.stringify(profile) !== JSON.stringify(profileInfo)) setProfileInfo(profile);
    },
    [profile, profileInfo],
    {
      wait: 200,
    },
  );

  useEffect(() => {
    setMonthData(monthDate);
    const tomorrow = dayjs().add(1, 'day').format('D');
    handleDayTimeTableChange(monthDate, tomorrow);
    handleDayListChange(monthDate);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthDate]);

  const clearState = () => {
    setWeekList([]);
  };

  const value = {
    dayTimeTable,
    scheduleDayList,
    handleDayTimTable,
    monthData,
    profileInfo,
    weekList,
    handleWeekList,
    clearState,
  };

  return (
    <ScheduleMonthContext.Provider value={value}>{props.children}</ScheduleMonthContext.Provider>
  );
};

export { ScheduleMonthContext, ScheduleMonthProvider };
