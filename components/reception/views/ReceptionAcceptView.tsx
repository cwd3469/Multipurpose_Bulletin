import { Box, Grid, Stack, Typography } from '@mui/material';
import Input from '@components/common/inputs/Input';
import WConfirmModal from '@components/common/modal/WConfirmModal';
import WSubTitle from '@components/common/typography/WSubTitle';
import { ReceptionAcceptView } from '../type';
import { mobileFormat } from '@utils/formatNumber';
import WCopyButton from '@components/common/buttons/WCopyButton';
import { useDebounceFn } from 'ahooks';
import WAlert from '@components/common/modal/WAlert';

const ReceptionAcceptView = (props: ReceptionAcceptView) => {
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
  } = props;
  const btnStyle = {
    padding: '10px',
    fontSize: '14px',
    lineHeight: '1',
  };

  const onDebounceFnRegistration = useDebounceFn(onRegistration, {
    wait: 300,
  });

  return (
    <WConfirmModal
      open={open}
      handleClose={onOpenReset}
      title="환자 등록번호 등록"
      activeOn
      handleEvent={onDebounceFnRegistration.run}
      disabled={patientRegistrationNum ? false : disabled}
      titleSx={{
        padding: '50px 20px 40px',
      }}
    >
      <Stack gap="24px" width="450px" padding="0px 15px">
        <Stack gap="16px">
          <Grid container alignItems="center" width="100%" gap="8px">
            <Box>
              <WSubTitle title="환자 이름" />
            </Box>
            <WCopyButton copyTxt={name} sx={btnStyle} />
          </Grid>
          <Typography variant="body1" lineHeight={'1'} padding="14px 0">
            {name}
          </Typography>
        </Stack>
        <Stack gap="16px">
          <Grid container alignItems="center" width="100%" gap="8px">
            <Box>
              {' '}
              <WSubTitle title="환자 휴대폰 번호"></WSubTitle>
            </Box>
            <WCopyButton copyTxt={mobileFormat(mobile)} sx={btnStyle} />
          </Grid>
          <Typography
            variant="body1"
            lineHeight={'1'}
            padding="14px 0"
            letterSpacing="1px"
          >
            {mobileFormat(mobile)}
          </Typography>
        </Stack>
        <Stack gap="16px">
          <Grid container alignItems="center" width="100%" gap="8px">
            <Box>
              <WSubTitle title="환자 주민등록번호"></WSubTitle>
            </Box>
            <WCopyButton copyTxt={residentNum} sx={btnStyle} />
          </Grid>
          <Typography
            variant="body1"
            lineHeight={'1'}
            padding="14px 0"
            letterSpacing="1px"
          >
            {residentNum}
          </Typography>
        </Stack>
        <Stack gap="8px">
          <Grid container alignItems="center" width="100%" gap="8px">
            <Grid width="auto">
              <WSubTitle title="EMR 환자 등록번호" unchangeable></WSubTitle>
            </Grid>
            {patientRegistrationNum ? (
              <WCopyButton copyTxt={patientRegistrationNum} sx={btnStyle} />
            ) : (
              ''
            )}
          </Grid>
          {patientRegistrationNum ? (
            <Typography
              variant="body1"
              lineHeight={'1'}
              padding="14px 0"
              letterSpacing="1px"
            >
              {patientRegistrationNum}
            </Typography>
          ) : (
            <Stack gap="8px">
              <WAlert severity="error" variant="standard">
                접수 후 주민등록 번호 조회가 불가능합니다.
              </WAlert>
              <Input
                placeholder="EMR에 등록된 환자 등록번호를 입력해 주세요."
                helper="환자등록번호를 입력해 주세요."
                error={mrnErr}
                value={mrn}
                onChange={onChangeMrm}
              />
            </Stack>
          )}

          <Box height="52px" />
        </Stack>
      </Stack>
    </WConfirmModal>
  );
};
export default ReceptionAcceptView;
