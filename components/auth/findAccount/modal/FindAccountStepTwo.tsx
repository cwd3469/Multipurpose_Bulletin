import React, { useCallback } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { FindAccountPasswordDto, ModalType, VerifyRes } from 'types/signin';
import useChangePw from '../../hook/useChangePw';
import WConfirmModal from '@components/common/modal/WConfirmModal';

import { useToastContext } from '@hooks/useToastContext';
import { useEditPassword } from '@hooks/api/user/findAccount';
import WRepwTextField from '@components/common/inputs/textField/modules/WRepwTextField';
import WTextFieldUserPw from '@components/common/inputs/textField/modules/WTextFieldUserPw';
import { WDialogTitle } from '@components/common/modal/modules/WModalModules';

interface FindAccountStepTwoType extends ModalType {
  res?: VerifyRes;
}

const FindAccountStepTwo = (props: FindAccountStepTwoType) => {
  const {
    pwOnChange,
    pwErrorOnChange,
    disable,
    info,
    infoError,
    reset: changePwStateReset,
  } = useChangePw();

  const verifyData = {
    accountUlid: props.res ? props.res.accountUlid : '',
    maskedAccountId: props.res ? props.res.maskedAccountId : '',
    verificationCode: props.res ? props.res.verificationCode : '',
  };
  const { mutate: postEditPasswordMutate } = useEditPassword();
  const toast = useToastContext();
  const userId = verifyData.maskedAccountId;
  const resetModal = useCallback(() => {
    changePwStateReset();
    props.handleClose();
  }, [changePwStateReset, props]);
  const pwChangeEvent = useCallback(() => {
    const data: FindAccountPasswordDto = {
      accountUlid: verifyData.accountUlid,
      verificationCode: verifyData.verificationCode,
      password: info.pw,
      reenterPassword: info.repw,
    };
    postEditPasswordMutate(data, {
      onSuccess: (res) => {
        if (res.data.status === 'SUCCESS') {
          if (res.data.data.result) {
            resetModal();
          }
        }
        if (res.data.status === 'FAIL') {
          toast?.on(`${res.data.message}`, 'error');
          return;
        }
      },
      onError: (err) => {
        toast?.on('입력하신 비밀번호와 일치하지 않습니다.', 'error');
      },
    });
  }, [
    info.pw,
    info.repw,
    postEditPasswordMutate,
    resetModal,
    toast,
    verifyData.accountUlid,
    verifyData.verificationCode,
  ]);

  return (
    <WConfirmModal
      open={props.open}
      handleClose={resetModal}
      handleEvent={pwChangeEvent}
      btnTitle={'비밀번호 변경'}
      disabled={disable}
      activeOn
      maxWidth={'xl'}
      closeBtnOn
    >
      <>
        <Stack justifyContent="center" width={'720px'} alignItems="center">
          <Stack sx={{ padding: '80px 20px 40px' }}>
            <WDialogTitle>계정 찾기</WDialogTitle>
          </Stack>
          <Stack
            gap="20px"
            justifyContent="center"
            alignItems="center"
            sx={{
              padding: '40px',
              borderRadius: '6px',
              backgroundColor: '#F8F8F8',
            }}
          >
            <Stack
              gap="20px"
              justifyContent="center"
              alignItems="center"
              width="560px"
            >
              <Typography
                variant="subtitle1"
                color="#4a4a4a"
                textAlign={'center'}
                fontWeight="400"
              >
                회원님의 아이디는{' '}
                <span style={{ color: '#4AC6FF' }}>{userId}</span> (으)로
                등록되어 있습니다
              </Typography>
              <Typography
                variant="body2"
                color="#999"
                textAlign={'center'}
                fontWeight="100"
              >
                * 개인정보 도용에 대한 피해 방지를 위하여 일부 아이디만
                노출됩니다.
              </Typography>
            </Stack>

            <Box
              height="1px"
              width="100%"
              margin="20px 0"
              bgcolor={'#EBECED'}
            />
            <Stack width="320px" gap="8px">
              <Typography variant="body2" lineHeight={'1'}>
                비밀번호 변경
              </Typography>
              <Box height="8px" />
              <WTextFieldUserPw
                state={info.pw}
                setState={pwOnChange}
                keyId={'pw'}
                error={infoError.pw}
                setError={pwErrorOnChange}
              />
              <WRepwTextField
                state={info.repw}
                setState={pwOnChange}
                keyId={'repw'}
                error={infoError.repw}
                setError={pwErrorOnChange}
                pw={info.pw}
                placeholder="비밀번호 확인"
              />
            </Stack>
          </Stack>

          <Box paddingTop={'80px'} />
        </Stack>
      </>
    </WConfirmModal>
  );
};

export default FindAccountStepTwo;
