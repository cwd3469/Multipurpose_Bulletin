import { Grid, Stack, Typography } from '@mui/material';
import { mobileFormat } from '@utils/formatNumber';
import { useDebounceFn } from 'ahooks';
import WAlertModal from '@components/common/modal/WAlertModal';
import WModalContentsField, {
  WModalContentsGrid,
  WModalContentsLine,
} from '@components/common/modal/WModalContentsField';
import { ErrorType } from 'types/signin';
import { ReserveModifyViewProps } from '../type';
import WDatePicker from '@components/common/datepicker/WDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import ReserveTimePicker from '../modules/ReserveTimePicker';
import WSelectRefusal from '@components/common/select/modules/WSelectRefusal';
import WTextFieldRefusal from '@components/common/inputs/textField/modules/WTextFieldRefusal';
import useInModalAlert from '@hooks/utils/modal/useInModalAlert';

/**ReserveModifyView 예약 수정 모달 view */
const ReserveModifyView = (props: ReserveModifyViewProps) => {
  const {
    reserveModifyError,
    reserveModifyInfo,
    onChangeReserveModifyInfo,
    onChangeReaSonError,
    onDisabled,
    open,
    handleClose,
    modalFunction,
    patientInfo,
    reasonSelect,
    onChangeSelect,
  } = props;

  const onDeModalFunction = useDebounceFn(modalFunction, {
    wait: 300,
  });
  const { name, registration, patientRegistrationNum, mobile } = patientInfo;

  const info = useInModalAlert();

  const reserveDateToDayjs = dayjs(reserveModifyInfo.updateDate);
  return (
    <WAlertModal
      open={open}
      handleClose={handleClose}
      title="예약 변경"
      activeOn
      handleEvent={() => {
        return onDeModalFunction.run();
      }}
      disabled={onDisabled}
      titleSx={{
        padding: '56px 20px 27px',
      }}
      maxWidth="lg"
      setAlert={info.modalToast?.on}
      onAlert={info.modalToast?.on}
      msg={info.modalToast?.msg}
      severity="error"
      subTitle={
        <Typography
          variant="body2"
          textAlign="center"
          color="#565e65"
          lineHeight="1"
          paddingTop="8px"
        >
          <span style={{ color: '#3DA1FF', fontWeight: 'bold' }}>
            사전에 환자와 전화상으로 안내
          </span>{' '}
          후 예약 변경을 진행해주세요.
        </Typography>
      }
    >
      <Stack
        gap="1.500em"
        width="46.875em"
        padding="0 0.938em 3.750em"
        paddingBottom={info.modalToast ? '1.500em' : '3.750em'}
      >
        <WModalContentsGrid
          sx={{
            gap: '1.875em',
            paddingBottom: reasonSelect === 'DIRECT' ? '12px' : '40px',
          }}
        >
          <Grid container justifyContent="space-between" gap="1.500em">
            <WModalContentsField
              contants={name}
              title={'환자 이름'}
              sx={{ width: '30%' }}
              copyButton
            />
            <WModalContentsField
              contants={mobileFormat(mobile)}
              title={'환자 전화번호'}
              sx={{ width: '30%' }}
              copyButton
            />
            <WModalContentsField
              title={'EMR 등록번호'}
              contants={patientRegistrationNum}
              sx={{ width: '30%' }}
              copyButton
            />
          </Grid>
          <WModalContentsLine />
          <Grid container justifyContent="space-between">
            <WModalContentsField
              contants={name}
              title={'예약 변경 날짜'}
              sx={{ width: '47.5%' }}
              require
              initInput={
                <WDatePicker
                  selectDate={function (date: Dayjs | null): void {
                    if (date) onChangeReserveModifyInfo(date.format('YYYY-MM-DD'), 'updateDate');
                  }}
                  date={reserveDateToDayjs}
                />
              }
            />
            <WModalContentsField
              contants={name}
              title={'예약 시간 선택'}
              sx={{ width: '47.5%' }}
              require
              initInput={
                <ReserveTimePicker
                  onChange={(date: string) => {
                    const obj = JSON.parse(date);
                    onChangeReserveModifyInfo(obj.startTime, 'timetable');
                  }}
                  value={reserveModifyInfo.timetable}
                />
              }
            />
          </Grid>
          <Grid container justifyContent="space-between">
            <WModalContentsField
              contants={''}
              title={'예약 변경 사유'}
              sx={{ width: '47.5%' }}
              require
              initInput={<WSelectRefusal width="304px" callBack={onChangeSelect} />}
            />
            <WModalContentsField
              contants={'예약 변경 사유를 직접 입력해주세요.'}
              title={'직접 입력'}
              sx={{ width: '47.5%' }}
              initInput={
                reasonSelect === 'DIRECT' ? (
                  <WTextFieldRefusal
                    state={reserveModifyInfo.reason}
                    setState={onChangeReserveModifyInfo}
                    keyId={'reason'}
                    error={reserveModifyError}
                    placeholder={'예약 변경 사유를 입력해주세요.'}
                    setError={(errMsg: ErrorType) => onChangeReaSonError(errMsg)}
                  />
                ) : undefined
              }
            />
          </Grid>
        </WModalContentsGrid>
      </Stack>
    </WAlertModal>
  );
};
export default ReserveModifyView;
