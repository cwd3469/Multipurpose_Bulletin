import { ChangeEvent } from 'react';
import { Box, Stack } from '@mui/material';
import { ErrorType } from 'types/signin';
import WConfirmModal from '@components/common/modal/WConfirmModal';
import Input from '@components/common/inputs/Input';
import { RequiredTitle } from '@components/common/typography/WTheme';
import { useDebounceFn } from 'ahooks';

interface QueueCancellationView {
  handleRefusal: (e: ChangeEvent<HTMLInputElement>) => void;
  refusalVaild: (text: string) => void;
  disabled: boolean;
  err: ErrorType;
  value: string;
  modlaClose: () => void;
  registration: () => void;
  open: boolean;
}

const QueueCancellationView = (props: QueueCancellationView) => {
  const {
    handleRefusal,
    refusalVaild,
    disabled,
    err,
    value,
    modlaClose,
    registration,
    open,
  } = props;

  const onDebounceFnRegistration = useDebounceFn(registration, {
    wait: 300,
  });

  return (
    <WConfirmModal
      open={open}
      handleClose={modlaClose}
      disabled={disabled}
      title="진료 취소 사유"
      subTitle="해당 환자의 진료를 취소하기 위해서는 사유를 입력해 주세요"
      activeOn
      handleEvent={onDebounceFnRegistration.run}
      titleSx={{
        '& .MuiDialogContentText-root': {
          textAlign: 'left',
        },
      }}
    >
      <Stack width="450px" gap="40px">
        <Stack gap="16px">
          <RequiredTitle title={'진료 취소 사유'} required />
          <Input
            helper="환자에게 전달할 진료 취소사유를 입력해주세요."
            placeholder="환자에게 전달할 진료 취소사유를 입력해주세요."
            value={value}
            onChange={handleRefusal}
            error={err}
            focusOutEvent={() => refusalVaild(value)}
          />
          <Box height="62px" />
        </Stack>
      </Stack>
    </WConfirmModal>
  );
};
export default QueueCancellationView;
