import { useCallback, useContext } from 'react';
import { ScheduleSelectMonthContext } from '../contexts/ScheduleSelectMonth';
import useInModalAlert from '@hooks/utils/modal/useInModalAlert';
import { ScheduleMonthContext } from '../contexts/ScheduleMonth';
import { ScheduleContext } from '../contexts/ScheduleContext';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { Dayjs } from 'dayjs';
import { useQueryClient } from 'react-query';
import { ScheduleListKey } from '@hooks/api/hospitalDoctor/doctorSchedule';

export type SchedulePostDto = {
  doctorAccountUlid: string;
  startDate: string;
  endDate: string;
  weekDayNumber: string[];
  timeTable: string[];
};

export type ScheduleDeleteDto = {
  doctorAccountUlid: string;
  startDate: string;
  endDate: string;
  weekDayNumber: string[];
};

export type ScheduleUpdateDto = {
  doctorAccountUlid: string;
  updateDate: string;
  timeTable: string[];
};

export type ScheduleReserveDto = {
  doctorAccountUlid: string;
  startDate: string;
  endDate: string;
  weekDayNumber?: string[];
};

const useScheduleDto = (props: { handleClose: () => void; mode?: 'modify' | 'delete' }) => {
  const { handleClose, mode } = props;
  const queryClient = useQueryClient();
  const { monthRangeDate } = useContext(ScheduleSelectMonthContext);
  const { onSetModalToast } = useInModalAlert();
  const { profileInfo, weekList, clearState: monthClear } = useContext(ScheduleMonthContext);
  const { selectList, rangeDate, clearState, scheduleDate } = useContext(ScheduleContext);
  const msg = useCodeMsgBundle();

  const timeTable = useCallback(
    () => (selectList ? selectList.map((item) => item.name.split(' ~ ')[0]) : []),
    [selectList],
  )();
  const updateDate = scheduleDate.format('YYYY-MM-DD');
  const doctorAccountUlid = profileInfo ? profileInfo.doctorAccountUlid : '';
  const weekDayNumber = weekList.filter((item) => Number(item) < 8);
  const dayjsArr = rangeDate.map((item) => {
    const dayDate: Dayjs = item as Dayjs;
    return dayDate.format('YYYY-MM-DD');
  });
  const startDate = dayjsArr[0];
  const endDate = dayjsArr[1];

  const onSuccess = useCallback(() => {
    handleClose();
    queryClient.invalidateQueries(ScheduleListKey(monthRangeDate));
    monthClear && monthClear();
    clearState && clearState();
  }, [clearState, handleClose, monthClear, monthRangeDate, queryClient]);

  const onWarning = useCallback(
    (code: string) => {
      return onSetModalToast({
        msg: msg.errMsg(code),
        on: true,
        severity: 'error',
      });
    },
    [msg, onSetModalToast],
  );

  const onError = useCallback(
    (str: string) => {
      return onSetModalToast({
        msg: `스케줄 ${str}에 실패하였습니다. 잠시 후, 다시 시도해 주세요.`,
        on: true,
        severity: 'error',
      });
    },
    [onSetModalToast],
  );

  const dtoPost: SchedulePostDto = {
    doctorAccountUlid,
    startDate,
    endDate,
    weekDayNumber,
    timeTable,
  };

  const dtoUpdate: ScheduleUpdateDto = {
    doctorAccountUlid,
    updateDate,
    timeTable,
  };

  const dtoDelete: ScheduleDeleteDto = {
    doctorAccountUlid,
    startDate,
    endDate,
    weekDayNumber,
  };
  const dtoReserve: ScheduleReserveDto = {
    doctorAccountUlid,
    startDate: mode === 'modify' ? updateDate : startDate,
    endDate: mode === 'modify' ? updateDate : endDate,
    weekDayNumber: mode === 'delete' ? weekDayNumber : undefined,
  };
  const dto = {
    post: dtoPost,
    update: dtoUpdate,
    delete: dtoDelete,
    reserve: dtoReserve,
  };

  return {
    onSuccess,
    onWarning,
    onError,
    dto,
  };
};

export default useScheduleDto;
