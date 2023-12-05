import WAlertModal from '@components/common/modal/WAlertModal';
import { Box, Grid, Typography, styled } from '@mui/material';
import { useCallback } from 'react';
import { ModalType } from 'types/signin';
import SigninNotApproved from '@components/auth/signin/modal/SigninNotApproved';
import useSignup from '@components/auth/hook/useSignup';
import { ItemInput } from '../styled';
import WHealthcareFacility from '@components/common/inputs/textField/modules/WHealthcareFacility';
import WTextFieldUserId from '@components/common/inputs/textField/modules/WTextFieldUserId';
import WTextFieldUserPw from '@components/common/inputs/textField/modules/WTextFieldUserPw';
import WRepwTextField from '@components/common/inputs/textField/modules/WRepwTextField';
import WTextFieldAdminName from '@components/common/inputs/textField/modules/WTextFieldAdminName';
import WHospitalNameField from '@components/common/inputs/textField/modules/WHospitalNameField';
import WAddressSearch from '@components/common/inputs/data/WAddressSearch';
import WAddressDetailTextField from '@components/common/inputs/textField/modules/WAddressDetailTextField';
import WPhoneTextField from '@components/common/inputs/textField/modules/WPhoneTextField';
import WBusinessNumTextField from '@components/common/inputs/textField/modules/WBusinessNumTextField';
import WEmailTextField from '@components/common/inputs/textField/modules/WEmailTextField';
import AuthFilePicker from '@components/auth/inputs/AuthFilePicker';
import { UidList } from '@components/common/fileUpload/types';
import useAuthFileFormMutate from '@components/auth/hook/useAuthFileFormMutate';
import { useSignupInfoMutation } from '@hooks/api/user/signup';
import { useDebounceFn } from 'ahooks';
import Layout from '@components/common/layout/Layout';
const ListLayout = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '330px',
  height: 'auto',
});

interface SignupStepThreeType extends ModalType {
  mobileValue: string;
}

const SignupStepThree = (props: SignupStepThreeType) => {
  const signup = useSignup(props);
  const { authFileFormMutate } = useAuthFileFormMutate();
  const { onSignup } = useSignupInfoMutation({
    info: signup.info,
    authFileUlid: signup.fileUlid,
    mobile: props.mobileValue,
  });
  /**회원가입 신청 이벤트 */
  const signupOn = useCallback(() => {
    onSignup(() => {
      signup.handleOpenModal();
    });
  }, [onSignup, signup]);

  const onDebounceFnSignup = useDebounceFn(signupOn, {
    wait: 300,
  });
  return (
    <WAlertModal
      open={signup.open}
      handleClose={signup.handleCloseAll}
      handleEvent={onDebounceFnSignup.run}
      maxWidth={'xl'}
      btnTitle="다음"
      bgDisable={signup.modalOn}
      disabled={signup.btnDisable}
      title={'- 정보 입력'}
      titleSx={{ padding: '54px 0 20px' }}
      activeOn
      closeBtnOn
    >
      <Layout width="720px" padding="15px 0">
        <Grid container justifyContent={'space-between'} width="720px">
          <ListLayout>
            <ItemInput title={'요양기관 번호'} require>
              <WHealthcareFacility
                state={signup.info.hospitalCode}
                error={signup.infoErr.hospitalCodeErr}
                setState={signup.setInInfo}
                setError={signup.setInInfoErr}
                keyId={'hospitalCode'}
              />
            </ItemInput>
            <ItemInput title={'아이디'} require>
              <WTextFieldUserId
                state={signup.info.id}
                error={signup.infoErr.idErr}
                setState={signup.setInInfo}
                setError={signup.setInInfoErr}
                keyId={'id'}
              />
            </ItemInput>
            <ItemInput title={'비밀번호 입력'} require>
              <WTextFieldUserPw
                state={signup.info.pw}
                error={signup.infoErr.pwErr}
                setState={signup.setInInfo}
                setError={signup.setInInfoErr}
                keyId={'pw'}
              />
            </ItemInput>
            <ItemInput title={'비밀번호 확인'} require>
              <WRepwTextField
                state={signup.info.repw}
                error={signup.infoErr.repwErr}
                setState={signup.setInInfo}
                setError={signup.setInInfoErr}
                keyId={'repw'}
                pw={signup.info.pw}
              />
            </ItemInput>
            <ItemInput title={'담당자 이름'} require>
              <WTextFieldAdminName
                state={signup.info.name}
                error={signup.infoErr.nameErr}
                setState={signup.setInInfo}
                setError={signup.setInInfoErr}
                keyId={'name'}
              />
            </ItemInput>
            <ItemInput title={'담당자 전화번호'} require>
              <Box padding="14px 0">
                <Typography>{signup.formChanger}</Typography>
              </Box>
            </ItemInput>
            <Box height="20px" />
            <ItemInput title="사업자 등록증 첨부" require sx={{ gap: '12px' }}>
              <AuthFilePicker
                label="사업자 등록증 파일명"
                target="businessLicense"
                deleteUid={function (): void {
                  signup.setInFileUlid('', 'businessLicense');
                  signup.setInInfo(undefined, 'businessLicense');
                }}
                fileUpLoad={(file: File[], uidList?: UidList[] | undefined) => {
                  authFileFormMutate(
                    (ulid: string, img: File) => {
                      signup.setInFileUlid(ulid, 'businessLicense');
                      signup.setInInfo(img, 'businessLicense');
                    },
                    file,
                    uidList,
                  );
                }}
                files={[]}
                multi={false}
              />
            </ItemInput>
          </ListLayout>
          <ListLayout>
            <ItemInput title={'-명'} require>
              <WHospitalNameField
                state={signup.info.hocName}
                error={signup.infoErr.hocNameErr}
                setState={signup.setInInfo}
                setError={signup.setInInfoErr}
                keyId={'hocName'}
              />
            </ItemInput>
            <ItemInput title="- 주소" require>
              <WAddressSearch setAddress={signup.addressOnChange} />
            </ItemInput>
            <Box height="8px" />
            <ItemInput title="- 상세 주소">
              <WAddressDetailTextField
                state={signup.info.addressDetail}
                error={signup.infoErr.addressDetailErr}
                setState={signup.setInInfo}
                setError={signup.setInInfoErr}
                keyId={'addressDetail'}
              />
            </ItemInput>
            <ItemInput title="- 대표 전화번호" require>
              <WPhoneTextField
                state={signup.info.hocPhone}
                error={signup.infoErr.hocPhoneErr}
                setState={signup.setInInfo}
                setError={signup.setInInfoErr}
                keyId={'hocPhone'}
              />
            </ItemInput>
            <ItemInput title="사업자 등록 번호" require>
              <WBusinessNumTextField
                state={signup.info.buisNum}
                error={signup.infoErr.buisNumErr}
                setState={signup.setInInfo}
                setError={signup.setInInfoErr}
                keyId={'buisNum'}
              />
            </ItemInput>
            <ItemInput title="담당자 이메일" require>
              <WEmailTextField
                state={signup.info.email}
                error={signup.infoErr.emailErr}
                setState={signup.setInInfo}
                setError={signup.setInInfoErr}
                keyId={'email'}
              />
            </ItemInput>
            <ItemInput title="통장 사본 첨부" require sx={{ gap: '12px' }}>
              <AuthFilePicker
                label="통장 사본 파일명"
                target="bankbookCopy"
                deleteUid={function (): void {
                  signup.setInFileUlid('', 'bankbookCopy');
                  signup.setInInfo(undefined, 'bankbookCopy');
                }}
                fileUpLoad={(file: File[], uidList?: UidList[] | undefined) => {
                  authFileFormMutate(
                    (ulid: string, img: File) => {
                      signup.setInFileUlid(ulid, 'bankbookCopy');
                      signup.setInInfo(img, 'bankbookCopy');
                    },
                    file,
                    uidList,
                  );
                }}
                files={[]}
                multi={false}
              />
            </ItemInput>
          </ListLayout>
          <SigninNotApproved
            open={signup.modalOn}
            handleClose={signup.handleCloseAll}
            type="signup"
          />
        </Grid>
      </Layout>
    </WAlertModal>
  );
};

export default SignupStepThree;
