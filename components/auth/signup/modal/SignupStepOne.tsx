import { Box, Stack, Typography } from '@mui/material';
import WAlertModal from '@components/common/modal/WAlertModal';
import { ModalType } from 'types/signin';
import useTerms from '@components/auth/hook/useTerms';
import SignupStepTwo from '@components/auth/signup/modal/SignupStepTwo';
import { useCallback, useState } from 'react';
import SignupTerms from './SignupTerms';
import { TermsButton, TermsCheckBox, TermsGrid } from '@components/auth/AuthTheme';
import { RequiredTitle } from '@components/common/typography/WTheme';
import PartnerAgree from '@pages/terms/partner-agree';
import PrivacyPolicy from '@pages/terms/privacy-policy';
import PrivacyAgree from '@pages/terms/privacy-agree';
import { WDialogTitle } from '@components/common/modal/modules/WModalModules';
const SignupStepOne = (props: ModalType) => {
  const {
    handleCloseAll,
    handleEvent,
    onCheckBox,
    allAgreeCheck,
    disabled,
    modalOn,
    all,
    agreeTermA,
    agreeTermB,
    agreeAdvertising,
    open,
    setAgreeTermA,
    setAgreeTermB,
    setAgreeAdvertising,
  } = useTerms(props);

  const [termsOn, setTermsOn] = useState<boolean>(false);
  const [partnerAgreeOn, setPartnerAgreeOn] = useState<boolean>(false);
  const [privacyAgreeOn, setPrivacyAgreeOn] = useState<boolean>(false);
  const [privacyPolicyOn, setPrivacyPolicyOn] = useState<boolean>(false);

  const [bgDisable, setBgDisable] = useState<boolean>(false);
  const resetModalClose = () => {
    handleCloseAll();
    setBgDisable(false);
    setTermsOn(false);
  };

  const onPressModal = useCallback(() => {
    setTimeout(() => {
      setTermsOn(true);
      setBgDisable(true);
    }, 300);
  }, []);

  /**SignupStepOne 약관 모달 on 기능 */
  const onTermsPartnerAgree = () => {
    onPressModal();
    setPartnerAgreeOn(true);
  };
  /**SignupStepOne 약관 모달 on 기능 */
  const onTermsPrivacyAgree = () => {
    onPressModal();
    setPrivacyAgreeOn(true);
  };
  /**SignupStepOne 약관 모달 on 기능 */
  const onTermsPrivacyPolicy = () => {
    onPressModal();
    setPrivacyPolicyOn(true);
  };
  const onCloseTerms = () => {
    setTermsOn(false);
    setBgDisable(false);
    setTimeout(() => {
      setPrivacyAgreeOn(false);
      setPrivacyPolicyOn(false);
      setPartnerAgreeOn(false);
    }, 300);
  };
  return (
    <WAlertModal
      open={open}
      handleClose={resetModalClose}
      handleEvent={() => {
        handleEvent();
        setBgDisable(true);
      }}
      disabled={disabled}
      bgDisable={bgDisable}
      maxWidth="lg"
      btnTitle="다음"
      closeBtnOn
    >
      <Stack sx={{ width: '720px', padding: '0px 40px' }}>
        <WDialogTitle sx={{ padding: '60px 20px' }}>가입 안내</WDialogTitle>
        <Typography variant="subtitle1" fontWeight={'400'}>
          어디 아파에 오신 -관리자 사용자님 반갑습니다.
        </Typography>
        <Box height="10px" />
        <Typography variant="h5">안전한 서비스 사용을 위해</Typography>
        <Typography variant="h5">서비스 약관 정보 제공 동의를 해주세요.</Typography>
        <Box paddingTop={'40px'} />
        <Stack border="1px solid #ebeced">
          <TermsGrid padding={'24px 24px'} borderBottom="1px solid #ebeced">
            <TermsGrid gap="16px">
              <TermsCheckBox checked={all} onChange={allAgreeCheck} />
              <RequiredTitle
                title="전체 동의 하기"
                textStyle={{ fontWeight: '400', color: '#333' }}
                onClick={allAgreeCheck}
              />
            </TermsGrid>
          </TermsGrid>
          <TermsGrid padding={'24px 24px'}>
            <TermsGrid gap="16px">
              <TermsCheckBox
                checked={agreeTermA}
                onChange={() => {
                  onCheckBox(agreeTermA, setAgreeTermA);
                }}
              />
              <RequiredTitle
                title="서비스 이용약관 동의"
                required
                textStyle={{ fontWeight: '400', color: '#333' }}
                onClick={() => {
                  onCheckBox(agreeTermA, setAgreeTermA);
                }}
              />
            </TermsGrid>
            <TermsButton onClick={onTermsPartnerAgree}>전문보기</TermsButton>
          </TermsGrid>
          <TermsGrid padding={'24px 24px'}>
            <TermsGrid gap="16px">
              <TermsCheckBox
                checked={agreeTermB}
                onChange={() => {
                  onCheckBox(agreeTermB, setAgreeTermB);
                }}
              />
              <RequiredTitle
                title="개인정보 보호 의무 동의"
                required
                textStyle={{ fontWeight: '400', color: '#333' }}
                onClick={() => {
                  onCheckBox(agreeTermB, setAgreeTermB);
                }}
              />
            </TermsGrid>
            <TermsButton onClick={onTermsPrivacyAgree}>전문보기</TermsButton>
          </TermsGrid>
          <TermsGrid padding={'24px 24px'}>
            <TermsGrid gap="16px">
              <TermsCheckBox
                checked={agreeAdvertising}
                onChange={() => {
                  onCheckBox(agreeAdvertising, setAgreeAdvertising);
                }}
              />
              <RequiredTitle
                title="개인정보 처리방침 동의"
                required
                textStyle={{ fontWeight: '400', color: '#333' }}
                onClick={() => {
                  onCheckBox(agreeAdvertising, setAgreeAdvertising);
                }}
              />
            </TermsGrid>
            <TermsButton onClick={onTermsPrivacyPolicy}>전문보기</TermsButton>
          </TermsGrid>
        </Stack>
        <Box height="100px" />
        <SignupStepTwo open={modalOn} handleClose={resetModalClose} />
        {/* 파트너사 이용약관을 조회 */}
        {partnerAgreeOn ? (
          <SignupTerms
            open={partnerAgreeOn && termsOn}
            handleClose={onCloseTerms}
            html={<PartnerAgree />}
            title="서비스 이용약관 동의"
          />
        ) : (
          ''
        )}
        {/* 개인정보 처리에 관한 동의서를 조회 */}
        {privacyAgreeOn ? (
          <SignupTerms
            open={privacyAgreeOn && termsOn}
            handleClose={onCloseTerms}
            html={<PrivacyPolicy />}
            title="개인정보 보호 의무 동의"
          />
        ) : (
          ''
        )}
        {/* 파트너 개인정보 보호 의무 동의를 조회 */}
        {privacyPolicyOn ? (
          <SignupTerms
            open={privacyPolicyOn && termsOn}
            handleClose={onCloseTerms}
            html={<PrivacyAgree />}
            title="개인정보 처림방침 동의"
          />
        ) : (
          ''
        )}
      </Stack>
    </WAlertModal>
  );
};

export default SignupStepOne;
