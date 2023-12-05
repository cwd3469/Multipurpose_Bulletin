import { useCallback, useState } from 'react';
import { ErrorType } from 'types/signin';
import {
  ModifyInfo,
  ReserveTableType,
  ReserveTableUserInfoType,
  UseReserveModify,
  UseReservePatientInfo,
} from '../type';
import useInModalAlert from '@hooks/utils/modal/useInModalAlert';

/**예약 변경 client fucntion 리엑트 훅  */
const useReserveModify = (props: { origin: UseReservePatientInfo }): UseReserveModify => {
  const { origin } = props;

  const defaultValue = {
    errorReason: { msg: '', boo: false },
    info: {
      updateDate: origin.updateDate,
      timetable: origin.timetable,
      reason: '',
    },
  };

  const { onDeleteModalToast } = useInModalAlert();

  const [reasonSelect, setReasonSelect] = useState<string>('DEFAULT');
  /**useReserveModify State */
  const [reserveModifyError, setReserveModifyError] = useState<ErrorType>(defaultValue.errorReason);
  const [reserveModifyInfo, setReserveModifyInfo] = useState<ModifyInfo>(defaultValue.info);

  const originValue = {
    updateDate: origin.updateDate,
    timetable: origin.timetable,
  };

  const changeValue = {
    updateDate: reserveModifyInfo.updateDate,
    timetable: reserveModifyInfo.timetable,
  };

  /**useReserveModify 수정 정보 변경 */
  const onChangeReserveModifyInfo = useCallback(
    (id: string, keyId: string) => {
      onDeleteModalToast && onDeleteModalToast();
      setReserveModifyInfo((prev) => {
        return { ...prev, [keyId]: id };
      });
    },
    [onDeleteModalToast],
  );

  /**useReserveModify 선택 정보 수정 */
  const onChangeSelect = useCallback(
    (id: string) => {
      onDeleteModalToast && onDeleteModalToast();
      setReasonSelect(id);
      if (id === 'DEFAULT') {
        setReserveModifyError(defaultValue.errorReason);
        onChangeReserveModifyInfo('', 'reason');
      }
    },
    [defaultValue.errorReason, onChangeReserveModifyInfo, onDeleteModalToast],
  );

  /**useReserveModify 수정 정보 변경 error */
  const onChangeReaSonError = useCallback((err: ErrorType) => setReserveModifyError(err), []);

  /**useReserveModify 수정 버튼 활성화  */
  const onDisabledIn = () => {
    if (!reserveModifyInfo.updateDate) return true;
    if (reserveModifyInfo.timetable.length === 0) return true;
    if (reasonSelect === 'DIRECT') {
      if (!reserveModifyInfo.reason) return true;
    }
    if (JSON.stringify(originValue) === JSON.stringify(changeValue)) return true;
    if (reserveModifyError.boo) return true;
    return false;
  };
  const onDisabled = onDisabledIn();

  const value: UseReserveModify = {
    reserveModifyError,
    reserveModifyInfo,
    onChangeReserveModifyInfo,
    onChangeReaSonError,
    onDisabled,
    onChangeSelect,
    reasonSelect,
  };

  return value;
};

export default useReserveModify;
