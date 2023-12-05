import React, { useCallback, useContext } from 'react';
import { Stack, Box } from '@mui/material';
import { ModalType } from 'types/signin';
import WConfirmModal from '@components/common/modal/WConfirmModal';
import useChangePw from '../../hook/useChangePw';
import WRepwTextField from '@components/common/inputs/textField/modules/WRepwTextField';
import WTextFieldUserPw from '@components/common/inputs/textField/modules/WTextFieldUserPw';
import { useDebounceFn } from 'ahooks';
import UserInfoContext from '@hooks/contexts/UserInfoContext';
import useSigninExcessChange from '@components/auth/hook/useSigninExcessChange';

interface SigninExcessChangePw extends ModalType {
  tokenList: {
    accessToken: string;
    refreshToken: string;
  };
}

const SigninExcessChangePw = (props: SigninExcessChangePw) => {
  const {
    pwOnChange,
    pwErrorOnChange,
    disable,
    info,
    infoError,
    reset: changePwStateReset,
  } = useChangePw();
  const { signinOn } = useContext(UserInfoContext);

  const { handlePwChange } = useSigninExcessChange();

  const onHandlePwChange = useCallback(() => {
    handlePwChange({
      signinOn: signinOn,
      info: {
        password: info.pw,
        reenterPassword: info.repw,
        accessToken: props.tokenList.accessToken,
      },
    });
  }, [
    handlePwChange,
    info.pw,
    info.repw,
    props.tokenList.accessToken,
    signinOn,
  ]);

  const resetModal = useCallback(() => {
    changePwStateReset();
    props.handleClose();
  }, [changePwStateReset, props]);

  const modalClose = useCallback(() => {
    resetModal();
    signinOn(props.tokenList);
  }, [props.tokenList, resetModal, signinOn]);

  const onDebounceHandlePwChange = useDebounceFn(onHandlePwChange, {
    wait: 300,
  });
  return (
    <WConfirmModal
      open={props.open}
      handleClose={resetModal}
      closeBtnEvent={modalClose}
      closeBtnTitle={'다음에 변경하기'}
      handleEvent={onDebounceHandlePwChange.run}
      btnTitle={'비밀번호 변경'}
      disabled={disable}
      activeOn
      maxWidth={'xl'}
      closeBtnOn
      title="비밀번호 변경 90일 초과 안내"
      subTitle=" 비밀번호 변경 후 90일이 초과되었습니다. 안전한 사용을
      위해비밀번호를 변경해 주세요."
      titleSx={{ padding: '64px 0 80px', gap: '10px' }}
    >
      <>
        <Stack justifyContent="center" width={'720px'} alignItems="center">
          <Stack width="320px" gap="8px">
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
          <Box paddingTop={'90px'} />
        </Stack>
      </>
    </WConfirmModal>
  );
};

export default SigninExcessChangePw;
