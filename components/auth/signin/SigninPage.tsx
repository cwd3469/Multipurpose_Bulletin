import React from 'react';
import { Stack, Grid, Box } from '@mui/material';
import Image from 'next/image';
import SignupButton from '@components/auth/signup/SignupButton';
import FindAccountButton from '../findAccount/FindAccountButton';
import WHealthcareFacility from '@components/common/inputs/textField/modules/WHealthcareFacility';
import WTextFieldUserId from '@components/common/inputs/textField/modules/WTextFieldUserId';
import WTextFieldUserPw from '@components/common/inputs/textField/modules/WTextFieldUserPw';
import { SaveButton } from '@components/hospitalIntro/modules/SetIntroTheme';
import { SigninLayout } from './SigninTheme';
import WSubTitle from '@components/common/typography/WSubTitle';
import useSignin from '../hook/useSignin';
import { useSigninMutation } from '@hooks/api/user/signin';
import { useDebounceFn } from 'ahooks';
import SigninStateProcess from './SigninStateProcess';

interface SigninPageType {
  hospitalCode?: string;
}

const SigninPage = (props: SigninPageType) => {
  const {
    handleOpenModal,
    handleCloseModal,
    setState,
    setStateErr,
    tokenList,
    modalLabel,
    accountType,
    disabled,
    modalOn,
    siginInfo,
    siginErr,
    setTokenList,
    needPasswordUpdate,
  } = useSignin(props);
  const { onClickSignin } = useSigninMutation();
  const signinOn = () => {
    onClickSignin({
      siginInfo: siginInfo,
      onOpenModal: handleOpenModal,
      setTokenList: (token) => {
        setTokenList(token);
      },
    });
  };
  const onDebounceFnSignin = useDebounceFn(signinOn, {
    wait: 300,
  });
  return (
    <main>
      <>
        <SigninLayout>
          <Grid
            container
            justifyContent={'center'}
            sx={{ paddingBottom: '60px' }}
          >
            <Image
              src={'/assets/images/new_logo_01.svg'}
              alt="로고"
              width={177}
              height={74}
            />
          </Grid>
          <Stack gap="7px" width="380px">
            <Stack gap="16px">
              <WSubTitle
                title="요양기관번호"
                titleSx={{ lineHeight: '1', color: '#333' }}
              />
              <WHealthcareFacility
                disabled={props.hospitalCode ? true : false}
                state={siginInfo.hospitalCode}
                setState={setState}
                keyId="hospitalCode"
                error={siginErr.hospitalCode}
                setError={setStateErr}
              />
            </Stack>
            <Stack gap="16px">
              <WSubTitle
                title="아이디"
                titleSx={{ lineHeight: '1', color: '#333' }}
              />
              <WTextFieldUserId
                state={siginInfo.accountId}
                setState={setState}
                keyId="accountId"
                error={siginErr.accountId}
                setError={setStateErr}
              />
            </Stack>
            <Stack gap="16px">
              <WSubTitle
                title="비밀번호"
                titleSx={{ lineHeight: '1', color: '#333' }}
              />
              <WTextFieldUserPw
                state={siginInfo.password}
                setState={setState}
                keyId="password"
                error={siginErr.password}
                setError={setStateErr}
              />
            </Stack>
            <Box sx={{ paddingTop: '12px' }} />
            <Stack gap="5px">
              <SaveButton
                onClick={onDebounceFnSignin.run}
                disabled={disabled}
                variant="contained"
                sx={{
                  width: '100%',
                  fontSize: '16px',
                }}
              >
                로그인
              </SaveButton>
            </Stack>
            <Box sx={{ paddingTop: '56px' }} />
            <Stack
              sx={{
                borderTop: '1px solid #E3E3E3',
                paddingTop: '15px',
                gap: '10px',
              }}
            >
              <SignupButton />
              <FindAccountButton />
            </Stack>
          </Stack>
        </SigninLayout>
        <SigninStateProcess
          open={modalOn}
          handleClose={handleCloseModal}
          label={modalLabel}
          position={accountType}
          tokenList={tokenList}
          needPasswordUpdate={needPasswordUpdate}
        />
      </>
    </main>
  );
};
export default SigninPage;
