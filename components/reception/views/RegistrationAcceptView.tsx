import { Grid, Stack, Typography } from '@mui/material';
import Input from '@components/common/inputs/Input';
import { ReceptionAcceptView } from '../type';
import { mobileFormat } from '@utils/formatNumber';
import { useDebounceFn } from 'ahooks';
import WAlertModal from '@components/common/modal/WAlertModal';
import WModalContentsField, {
  WModalContentsGrid,
} from '@components/common/modal/WModalContentsField';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
const RegistrationAcceptView = (props: ReceptionAcceptView) => {
  const {
    name,
    mobile,
    open,
    mrn,
    mrnErr,
    disabled,
    residentNum,
    patientRegistrationNum,
    onOpenReset,
    onChangeMrm,
    onRegistration,
    bgDisabled,
  } = props;

  const onDebounceFnRegistration = useDebounceFn(onRegistration, {
    wait: 300,
  });
  const isRegistrationNum = patientRegistrationNum ? true : false;
  return (
    <WAlertModal
      open={open}
      handleClose={onOpenReset}
      title="환자 등록번호 등록"
      activeOn
      handleEvent={onDebounceFnRegistration.run}
      disabled={patientRegistrationNum ? false : disabled}
      titleSx={{
        padding: '56px 20px 40px',
      }}
      maxWidth="lg"
      bgDisable={bgDisabled}
    >
      <Stack gap="1.500em" width="46.875em" padding="0 0.938em 3.750em">
        <WModalContentsGrid
          sx={{ paddingBottom: isRegistrationNum ? '' : '0.750em' }}
        >
          <Grid container justifyContent="space-between" gap="2.500em">
            <WModalContentsField
              contants={name}
              title={'환자 이름'}
              sx={{ width: '46%' }}
              copyButton
            />
            <WModalContentsField
              contants={residentNum}
              title="환자 주민등록번호"
              sx={{ width: '46%' }}
              copyButton
            />
          </Grid>
          <WModalContentsField
            contants={mobileFormat(mobile)}
            title={'환자 전화번호'}
            copyButton
          />
          <WModalContentsField
            title={'EMR 환자 등록번호'}
            contants={patientRegistrationNum}
            copyButton={isRegistrationNum}
            unchangeable
            initInput={
              patientRegistrationNum ? undefined : (
                <Input
                  placeholder="EMR에 등록된 환자 등록번호를 입력해 주세요."
                  helper="환자등록번호를 입력해 주세요."
                  error={mrnErr}
                  value={mrn}
                  onChange={onChangeMrm}
                />
              )
            }
            subTitle={
              <Grid
                container
                alignItems="center"
                gap="6px"
                width="auto"
                height="34px"
              >
                <InfoOutlinedIcon sx={{ fontSize: '16px', color: '#fc5935' }} />
                <Typography color="#ed271e">
                  접수 후 주민등록 번호 조회가 불가능합니다.
                </Typography>
              </Grid>
            }
          />
        </WModalContentsGrid>
      </Stack>
    </WAlertModal>
  );
};
export default RegistrationAcceptView;
