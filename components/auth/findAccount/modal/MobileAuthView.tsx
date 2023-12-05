import { Grid, Stack, Box } from '@mui/material';
import Input from '@components/common/inputs/Input';
import AuthTimer from '@components/auth/AuthTimer';
import WAlertModal from '@components/common/modal/WAlertModal';
import { WDialogTitle } from '@components/common/modal/modules/WModalModules';
import { AuthButton, TermsGrid } from '@components/auth/AuthTheme';
import { ErrorType } from 'types/signin';
import { ChangeEvent } from 'react';
import { useDebounceFn } from 'ahooks';

interface MobileAuthViewType {
  open: boolean;
  authValue: string;
  mobileValue: string;
  mobileDisabled?: boolean;
  authDisabled: boolean;
  numDisabled: boolean;
  authError: ErrorType;
  authRequestDisabled: boolean;
  authOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  mobileOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTimerDisabled: () => void;
  mobileError: ErrorType;
  onAuthTimeOut: () => void;
  resetModalClose: () => void;
  signupAuthOnClick: () => void;
  bgDisable: boolean;
  onClickAuthNumSend: () => void;
}

const MobileAuthView = (props: MobileAuthViewType) => {
  const {
    open,
    authValue,
    authDisabled,
    mobileValue,
    mobileDisabled,
    numDisabled,
    authError,
    authRequestDisabled,
    authOnChange,
    mobileOnChange,
    onTimerDisabled,
    mobileError,
    onAuthTimeOut,
    resetModalClose,
    signupAuthOnClick,
    bgDisable,
    onClickAuthNumSend,
  } = props;

  const onDebounceFnSignupAuthNumber = useDebounceFn(signupAuthOnClick, {
    wait: 300,
  });
  const onDebounceFnAuthNumSend = useDebounceFn(onClickAuthNumSend, {
    wait: 300,
  });
  return (
    <WAlertModal
      open={open}
      handleClose={resetModalClose}
      maxWidth={'xl'}
      handleEvent={onDebounceFnSignupAuthNumber.run}
      bgDisable={bgDisable}
      disabled={numDisabled}
      btnTitle="다음"
      closeBtnOn
    >
      <>
        <Stack justifyContent="center" width={'720px'} alignItems="center">
          <WDialogTitle sx={{ padding: '80px 20px ' }}>
            휴대폰번호 인증
          </WDialogTitle>
          <Stack width="387px">
            {/* 휴대폰입력 */}
            <TermsGrid sx={{ alignItems: 'flex-start' }}>
              <Box sx={{ width: '257px' }}>
                <Input
                  disabled={mobileDisabled ? mobileDisabled : false}
                  value={mobileValue}
                  onChange={mobileOnChange}
                  placeholder={'숫자 11자리를 입력해 주세요.'}
                  error={mobileError}
                />
              </Box>
              <Box sx={{ width: '120px', height: '48px' }}>
                <AuthButton
                  disabled={
                    mobileValue.length >= 13 ? authRequestDisabled : true
                  }
                  onClick={onDebounceFnAuthNumSend.run}
                >
                  인증번호 발송
                </AuthButton>
              </Box>
            </TermsGrid>
            {/*   */}
            <Input
              error={authError}
              value={authValue}
              onChange={authOnChange}
              disabled={authDisabled}
              placeholder={'인증번호 6자리를 입력해 주세요.'}
            />
            <Grid container justifyContent={'flex-end'}>
              <Box sx={{ height: '20px' }}>
                {!authDisabled ? (
                  <AuthTimer
                    showTime={{
                      minutes: 2,
                      seconds: 30,
                    }}
                    time={3}
                    action={onAuthTimeOut}
                    resend={onDebounceFnAuthNumSend.run}
                    isReStart={true}
                  />
                ) : (
                  ''
                )}
              </Box>
            </Grid>
            <Box sx={{ height: '136px' }} />
          </Stack>
        </Stack>
      </>
    </WAlertModal>
  );
};

export default MobileAuthView;
