import WAlertModal from '@components/common/modal/WAlertModal';
import WSubTitle from '@components/common/typography/WSubTitle';
import WTextFieldRefusal from '@components/common/inputs/textField/modules/WTextFieldRefusal';
import { Box, Stack } from '@mui/material';
import { ErrorType } from 'types/signin';
import { UseReserveRefusal } from '../hooks/useReserveRefusal';
import { UseResetveRefusalData } from '../hooks/useResetveRefusalMutation';
import WSelectRefusal from '@components/common/select/modules/WSelectRefusal';
import useInModalAlert from '@hooks/utils/modal/useInModalAlert';

export type RefusalModalProps = {
  refusalOpen: boolean;
};

export type RefusalModalViewViewProps = RefusalModalProps &
  UseReserveRefusal &
  UseResetveRefusalData & {
    refusalUlid: string;
  };

/**RefusalModalViewView 예약 거절 모달 view */
const RefusalModalViewView = (props: RefusalModalViewViewProps) => {
  const {
    refusalUlid,
    refusalOpen,
    refusalValue,
    refusalValueError,
    refusalSelect,
    refusalDisabled,
    refusalHandleResetClose,
    refusalSelectChange,
    refusalValueChange,
    refusalValueErrorChange,
    refusalHandleEvent,
  } = props;
  const info = useInModalAlert();
  function alertBreakValue<T>(defalut: T, desired: T): T {
    return refusalValueError.boo || !refusalValue
      ? refusalSelect === 'DIRECT'
        ? desired
        : defalut
      : defalut;
  }
  const alertInfo: {
    on: boolean | undefined;
    msg: string | undefined;
  } = {
    on: alertBreakValue<boolean | undefined>(info.modalToast?.on, true),
    msg: alertBreakValue<string | undefined>(
      info.modalToast?.msg,
      '예약 접수 거절/ 진료 취소 사유를 선택해 주세요.',
    ),
  };

  return (
    <WAlertModal
      open={refusalOpen}
      handleClose={refusalHandleResetClose}
      title="예약 접수 거절/진료 취소 사유"
      subTitle={'해당 환자의 예약 접수 거절 또는 진료를 취소할 \n 사유를 선택해 주세요.'}
      disabled={refusalDisabled}
      titleSx={{ padding: '56px 40px 40px', gap: '1.000em' }}
      handleEvent={() => refusalHandleEvent(refusalSelect, refusalValue)}
      closeBtnOn
      setAlert
      onAlert={alertInfo.on}
      msg={alertInfo.msg}
      severity={'error'}
    >
      <Stack width="28.125em" minHeight="21.125em" padding="0px 15px">
        <Stack padding="2.500em 2.500em 2.000em" bgcolor="#f8f8f8" borderRadius="12px">
          <Stack gap="1.000em">
            <WSubTitle
              title={'접수 거절/진료 취소 사유'}
              titleSx={{ fontWeight: '500', lineHeight: '1.3' }}
              require
            />
            <WSelectRefusal callBack={refusalSelectChange} width="338px" />
          </Stack>
          <Box height="2.125em" />
          {refusalSelect === 'DIRECT' && (
            <Stack gap="1.000em">
              <WSubTitle title={'직접 입력'} titleSx={{ fontWeight: '500', lineHeight: '1.3' }} />
              <WTextFieldRefusal
                state={refusalValue}
                setState={(txt) => refusalValueChange(txt)}
                keyId={''}
                error={refusalValueError}
                setError={(errMsg: ErrorType) => refusalValueErrorChange(errMsg)}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </WAlertModal>
  );
};
export default RefusalModalViewView;
