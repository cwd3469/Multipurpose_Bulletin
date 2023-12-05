import WConfirmModal from '@components/common/modal/WConfirmModal';
import { Box, Stack } from '@mui/material';
import NonReimburseName from '../inputs/NonReimburseName';
import NonReimbursePayment from '../inputs/NonReimbursePayment';
import { Dispatch, SetStateAction } from 'react';
import { ErrorType } from 'types/signin';

interface NonReimburseViewProps {
  mode: 'register' | 'modify';
  open: boolean;
  disabled?: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  err: ErrorType;
  setErr: Dispatch<SetStateAction<ErrorType>>;
  errAmount: ErrorType;
  setErrAmount: Dispatch<SetStateAction<ErrorType>>;
  modalReset: () => void;
  onDebounceFnModal: () => void;
}

const NonReimburseView = (props: NonReimburseViewProps) => {
  const {
    mode,
    open,
    modalReset,
    disabled,
    onDebounceFnModal,
    value,
    setValue,
    err,
    setErr,
    amount,
    setAmount,
    errAmount,
    setErrAmount,
  } = props;
  return (
    <WConfirmModal
      open={open}
      handleClose={modalReset}
      disabled={disabled}
      title={
        mode === 'register' ? '국내 비급여 항목 등록' : '국내 비급여 항목 수정'
      }
      activeOn
      handleEvent={onDebounceFnModal}
      btnTitle={mode === 'register' ? '등록' : '수정'}
    >
      <Stack gap="4px" width="420px">
        <NonReimburseName
          state={value}
          setState={setValue}
          err={err}
          setErr={setErr}
        />
        <NonReimbursePayment
          state={amount}
          setState={setAmount}
          err={errAmount}
          setErr={setErrAmount}
        />
        <Box height="48px" />
      </Stack>
    </WConfirmModal>
  );
};

export default NonReimburseView;
