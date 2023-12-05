import useInModalAlert from '@hooks/utils/modal/useInModalAlert';
import { first } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { ErrorType } from 'types/signin';

export type UseReserveRefusal = {
  refusalValue: string;
  refusalValueError: ErrorType;
  refusalSelect: string;
  refusalDisabled: boolean;
  refusalHandleResetClose: () => void;
  refusalSelectChange: (id: string) => void;
  refusalValueChange: (value: string) => void;
  refusalValueErrorChange: (error: ErrorType) => void;
};
type UseReserveRefusalProp = {
  handleClose: () => void;
};

const useReserveRefusal = (props: UseReserveRefusalProp): UseReserveRefusal => {
  const { handleClose } = props;
  const { onDeleteModalToast } = useInModalAlert();
  const modalToastMsg = useCallback(() => {
    return {
      reset: { on: false, msg: '' },
      msg: {
        on: true,
        msg: '예약 접수 거절/ 진료 취소 사유를 선택해 주세요.',
      },
    };
  }, [])();
  //useReserveRefusal defualt value
  const refusalDefualtValue = useCallback(() => {
    return {
      state: 'DEFAULT',
      direct: '',
      error: {
        msg: '',
        boo: false,
      },
    };
  }, [])();
  //useReserveRefusal State
  const [refusalSelect, setRefusalSelect] = useState<string>(
    refusalDefualtValue.state,
  );
  const [refusalValue, setRefusalInput] = useState<string>(
    refusalDefualtValue.direct,
  );
  const [refusalValueError, setRefusalErrorMsg] = useState<ErrorType>(
    refusalDefualtValue.error,
  );
  //useReserveRefusal value update 기능
  const refusalValueChange = useCallback(
    (text: string) => {
      if (!refusalValueError.boo) onDeleteModalToast && onDeleteModalToast();
      setRefusalInput(text);
    },
    [onDeleteModalToast, refusalValueError.boo],
  );
  //useReserveRefusal select update 기능
  const refusalSelectChange = useCallback(
    (id: string) => {
      onDeleteModalToast && onDeleteModalToast();
      setRefusalSelect(id);
    },
    [onDeleteModalToast],
  );
  //useReserveRefusal error msg update 기능
  const refusalValueErrorChange = useCallback(
    (error: ErrorType) => setRefusalErrorMsg(error),
    [],
  );
  //useReserveRefusal state reset 기능
  const refusalHandleResetClose = useCallback(() => {
    const { state, direct, error } = refusalDefualtValue;
    onDeleteModalToast && onDeleteModalToast();
    setRefusalSelect(state);
    setRefusalInput(direct);
    setRefusalErrorMsg(error);
    handleClose();
  }, [handleClose, onDeleteModalToast, refusalDefualtValue]);

  //useReserveRefusal button disabled 해제 기능
  const refusalDisabledValid = useCallback(() => {
    if (refusalSelect !== 'DIRECT') return false;
    if (refusalValue === '') return true;
    return refusalValueError.boo;
  }, [refusalSelect, refusalValue, refusalValueError.boo]);

  const refusalDisabled = refusalDisabledValid();

  return {
    refusalValue,
    refusalSelect,
    refusalDisabled,
    refusalHandleResetClose,
    refusalValueChange,
    refusalSelectChange,
    refusalValueError,
    refusalValueErrorChange,
  };
};

export default useReserveRefusal;
