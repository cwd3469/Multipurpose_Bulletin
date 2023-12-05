import { DateRange } from '@mui/x-date-pickers-pro';
import { WTimeListOption, dayToTimeListUp } from '@utils/date';
import { forinArr } from '@utils/file';
import dayjs, { Dayjs } from 'dayjs';
import { createContext, useCallback, useEffect, useState } from 'react';
export interface TreatTime {
  startTime: string;
  endTime: string;
}
export interface TimeList {
  name: string;
  index: number;
  data: TreatTime;
}
export type TimeValue = {
  time: number;
  timeList: WTimeListOption[];
};
export interface TimeObject {
  [key: string]: TimeValue;
}
export interface ErrorObject {
  [key: string]: string;
  inputDateError: string;
  weekError: string;
}

interface ScheduleContextType {
  setInDateRange?: (day: DateRange<string | number | Date | Dayjs | null | undefined>) => void;
  setInDate?: (dayJs: Dayjs) => void;
  rangeDate: DateRange<string | number | Date | Dayjs | null | undefined>;
  scheduleDate: Dayjs;
  alignment?: string;
  timeList?: WTimeListOption[];
  selectList?: WTimeListOption[];
  initTimeList?: () => void;
  setTimeSelected?: (time: WTimeListOption) => void;
  setTimeNotSelected?: (time: WTimeListOption) => void;
  getTimeDivision?: (time: WTimeListOption[]) => TimeValue[];
  getTimeUpdate?: (time: TreatTime[]) => {
    updateList: WTimeListOption[];
    amList: WTimeListOption[];
    pmList: WTimeListOption[];
  };
  setInAlignment?: (event: React.MouseEvent<HTMLElement>, newAlignment: string) => void;
  validCheck?: boolean;
  validCheckModify?: (schedulDay?: number[]) => boolean;
  validCheckSchedulDay?: (schedulDay?: number[]) => boolean;
  inputErrorCheck?: boolean;
  apmList?: (array: TimeValue[]) => {
    [key: string]: TimeValue[];
    am: TimeValue[];
    pm: TimeValue[];
  };
  clearState?: () => void;
  catchError?: (err: string, key: string) => void;
  error?: ErrorObject;
}

const ScheduleContext = createContext<ScheduleContextType>({
  scheduleDate: dayjs().add(1, 'day'),
  rangeDate: [dayjs().add(1, 'day'), dayjs().add(1, 'day')],
});

const ScheduleProvider = (props: {
  children: JSX.Element | JSX.Element[];
  contents?: TreatTime[];
}): JSX.Element => {
  const startTimeString = '05';
  const endTimeString = '24';
  const viewFormat = 'HH:mm';
  const IdFormat = 'HHmm';
  const IntervalTime = 10;

  /**ScheduleContext 시간 리스트 */
  const dateTimeList = dayToTimeListUp({
    start: startTimeString,
    end: endTimeString,
    Interval: IntervalTime,
    viewFormat: viewFormat,
    IdFormat: IdFormat,
    ListFormat: 'range',
  });

  /**ScheduleContext 확장된 시간 리스트 변경  */
  const updateListFn = useCallback(
    (time: TreatTime[]) => {
      let updateList: WTimeListOption[] = [];
      for (let i = 0; i < dateTimeList.length; i++) {
        const el = dateTimeList[i];
        for (let k = 0; k < time.length; k++) {
          const item = time[k];
          if (el.id === JSON.stringify(item)) {
            updateList.push(el);
          }
        }
      }
      return { updateList };
    },
    [dateTimeList],
  );

  /**ScheduleContext 확장된 시간 데이터 업데이트 기능 */
  const getTimeUpdate = useCallback(
    (time: TreatTime[]) => {
      const { updateList } = updateListFn(time);
      /**ScheduleContext 오전 시간 리스트 */
      const am = dateTimeList.filter((item) => item.index <= 42);
      /**ScheduleContext 오후 시간 리스트 */
      const pm = dateTimeList.filter((item) => item.index > 42);
      const amList = am.filter((x) => !updateList.includes(x));
      const pmList = pm.filter((x) => !updateList.includes(x));

      return { updateList, amList, pmList };
    },
    [dateTimeList, updateListFn],
  );

  /**ScheduleContext 선택된 스케줄 분리 */
  const apmList = (array: TimeValue[]) => {
    let am: TimeValue[] = [];
    let pm: TimeValue[] = [];
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element.time < 12) {
        am.push(element);
      } else {
        pm.push(element);
      }
    }
    return { am, pm };
  };

  /**ScheduleContext 확장된 시간 데이터 업데이트 기능 */
  const getTimeDivision = useCallback((time: WTimeListOption[]) => {
    const timeObj: TimeObject = {};
    for (let i = 0; i < time.length; i++) {
      const el = time[i];
      const h = el.name.substring(0, 2);
      const value = {
        time: Number(h),
        timeList: timeObj[h]
          ? Array.isArray(timeObj[h].timeList)
            ? [...timeObj[h].timeList, el]
            : [el]
          : [el],
      };
      timeObj[h] = value;
    }
    const forin: TimeValue[] = forinArr(timeObj);
    forin.sort((a, b) => {
      return a['time'] - b['time'];
    });
    return forin;
  }, []);

  const [error, setError] = useState<ErrorObject>({
    weekError: '',
    inputDateError: '',
  });
  const [timeTible, setTimeTible] = useState<TreatTime[]>([]);
  const [amList, setAmList] = useState<WTimeListOption[]>(getTimeUpdate([]).amList);
  const [pmList, setPmList] = useState<WTimeListOption[]>(getTimeUpdate([]).pmList);
  /**ScheduleContext 확정된 시간 리스트 */
  const [selectList, setSelectList] = useState<WTimeListOption[]>([]);
  /**ScheduleContext 오전 오후 탭 상태*/
  const [alignment, setAlignment] = useState<string>('am');
  /**ScheduleContext 켈린더 상태 */
  const [scheduleDate, setScheduleDate] = useState<Dayjs>(dayjs().add(1, 'day'));
  const [rangeDate, setRangeDate] = useState<
    DateRange<string | number | Date | Dayjs | null | undefined>
  >([dayjs().add(1, 'day'), dayjs().add(2, 'day')]);

  const timeList = alignment === 'am' ? amList : pmList;
  const setTimeList = alignment === 'am' ? setAmList : setPmList;

  /**ScheduleContext 오름 차순 적용 */
  timeList.sort((a, b) => {
    return a['index'] - b['index'];
  });
  selectList.sort((a, b) => {
    return a['index'] - b['index'];
  });

  /**ScheduleContext 스케줄 초기화*/
  const initTimeList = useCallback(() => {
    const reTimeList = getTimeUpdate([]);
    setSelectList(reTimeList.updateList);
    setAmList(reTimeList.amList);
    setPmList(reTimeList.pmList);
  }, [getTimeUpdate]);

  /**ScheduleContext 예약 시간 확정 기능 */
  const setTimeSelected = useCallback(
    (time: WTimeListOption) => {
      setTimeList((prec) => {
        return prec.filter((item) => {
          return item.name !== time.name;
        });
      });
      setSelectList((prec) => {
        return [...prec, time];
      });
    },
    [setTimeList],
  );
  /**ScheduleContext 예약 시간 제거 기능 */
  const setTimeNotSelected = useCallback(
    (time: WTimeListOption) => {
      setSelectList((prec) => {
        return prec.filter((item) => {
          return item.name !== time.name;
        });
      });
      setTimeList((prec) => {
        return [...prec, time];
      });
    },
    [setTimeList],
  );
  /**ScheduleContext 복수 날짜 선택 기능 */
  const setInDateRange = useCallback(
    (day: DateRange<string | number | Date | Dayjs | null | undefined>) => {
      setRangeDate(day);
    },
    [],
  );
  /**ScheduleContext 날짜 선택 기능 */
  const setInDate = useCallback((dayJs: Dayjs) => {
    setScheduleDate(dayJs);
  }, []);

  /**ScheduleContext 오전 오후 선태 기능 */
  const setInAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment !== null) setAlignment(newAlignment);
  };
  /**ScheduleContext catchError 기능 */
  const catchError = (err: string, key: string) =>
    setError((prec) => {
      return { ...prec, [key]: err };
    });

  let inputErrorCheck = useCallback(() => {
    if (JSON.stringify(rangeDate[1]) === 'null') return true;
    if (error.inputDateError !== '') return true;
    if (error.weekError !== '') return true;
    return false;
  }, [error, rangeDate])();

  /**ScheduleContext 변경 유효성 검사 기능 */
  let validCheck = useCallback(() => {
    if (inputErrorCheck) return true;
    if (!selectList.length) return true;
    return false;
  }, [inputErrorCheck, selectList.length])();

  /**ScheduleContext 유효성 검사  */
  let validCheckSchedulDay = useCallback(
    (schedulDay?: number[]) => {
      const isSelected = schedulDay
        ? schedulDay.indexOf(scheduleDate.date()) >= 0
          ? false
          : true
        : true;
      return isSelected;
    },
    [scheduleDate],
  );

  /**ScheduleContext 변경 유효성 검사 기능 */
  let validCheckModify = useCallback(
    (schedulDay?: number[]) => {
      const reTimeList = getTimeUpdate(timeTible);
      if (validCheckSchedulDay(schedulDay)) return true;
      if (!selectList.length) return true;
      if (JSON.stringify(selectList) === JSON.stringify(reTimeList.updateList)) return true;
      return false;
    },
    [getTimeUpdate, selectList, timeTible, validCheckSchedulDay],
  );

  useEffect(() => {
    if (props.contents) {
      const reTimeList = getTimeUpdate(props.contents);
      setTimeTible(props.contents);
      setAmList(reTimeList.amList);
      setPmList(reTimeList.pmList);
      setSelectList(reTimeList.updateList);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.contents]);

  const clearState = () => {
    initTimeList();
    setAlignment('am');
    setScheduleDate(dayjs().add(1, 'day'));
    setRangeDate([dayjs().add(1, 'day'), dayjs().add(2, 'day')]);
  };

  return (
    <ScheduleContext.Provider
      value={{
        error,
        rangeDate,
        apmList,
        scheduleDate,
        alignment,
        timeList,
        selectList,
        setInDate,
        setInAlignment,
        setTimeSelected,
        setTimeNotSelected,
        validCheck,
        validCheckModify,
        validCheckSchedulDay,
        inputErrorCheck,
        initTimeList,
        getTimeDivision,
        getTimeUpdate,
        setInDateRange,
        catchError,
        clearState,
      }}
    >
      {props.children}
    </ScheduleContext.Provider>
  );
};

export { ScheduleContext, ScheduleProvider };
