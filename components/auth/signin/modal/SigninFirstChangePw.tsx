import React, { useCallback, useContext } from 'react';
import { Stack, Box } from '@mui/material';
import { ModalType, UserInfoInterface } from 'types/signin';
import WAlertModal from '@components/common/modal/WAlertModal';
import useChangePw from '../../hook/useChangePw';
import UserInfoContext from '@hooks/contexts/UserInfoContext';
import { useDebounceFn } from 'ahooks';
import WRepwTextField from '@components/common/inputs/textField/modules/WRepwTextField';
import WTextFieldUserPw from '@components/common/inputs/textField/modules/WTextFieldUserPw';

interface SigninFirstChangePw extends ModalType {
  tokenList: {
    accessToken: string;
    refreshToken: string;
  };
}

const SigninFirstChangePw = (props: SigninFirstChangePw) => {
  const {
    pwOnChange,
    pwErrorOnChange,
    disable,
    info,
    infoError,
    reset: changePwStateReset,
  } = useChangePw();
  const { signinOn } = useContext(UserInfoContext);

  const resetModal = useCallback(() => {
    changePwStateReset();
    props.handleClose();
  }, [changePwStateReset, props]);
  // const { handlePwChange } = useSigninExcessChange();

  const onHandlePwChange = useCallback(() => {
    const dto = {
      signinOn: signinOn,
      info: {
        password: info.pw,
        reenterPassword: info.repw,
        accessToken: props.tokenList.accessToken,
      },
    };
  }, [info.pw, info.repw, props.tokenList.accessToken, signinOn]);

  const modalClose = useCallback(() => {
    resetModal();
    signinOn(props.tokenList);
  }, [props.tokenList, resetModal, signinOn]);

  const onDebounceHandlePwChange = useDebounceFn(onHandlePwChange, {
    wait: 300,
  });

  return (
    <WAlertModal
      open={props.open}
      handleClose={resetModal}
      handleEvent={onDebounceHandlePwChange.run}
      btnTitle={'비밀번호 변경'}
      disabled={disable}
      maxWidth={'xl'}
      title="임시 비밀번호 재설정"
      subTitle="임시 비밀번호로 로그인하였습니다. 비밀번호 변경 후 이용해 주세요."
      titleSx={{ padding: '64px 0 80px', gap: '10px' }}
      activeOn
      closeBtnOn
    >
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
    </WAlertModal>
  );
};

export default SigninFirstChangePw;
