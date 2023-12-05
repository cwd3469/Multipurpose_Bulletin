import { DoctorInfoSwitch } from '@components/doctorInfo/DoctorInfoTheme';
import { DoctorInfoGender } from '@components/doctorInfo/modules';
import {
  WTextFieldUserId,
  WTextFieldAdminName,
  WMobileTextField,
  WTextFieldBirthDate,
  WTextFieldUserPw,
} from '@components/common/inputs/textField/modules';
import ViewLayout from '@components/common/layout/ViewLayout';
import { Box, Grid, Stack } from '@mui/material';
import { useDebounceFn } from 'ahooks';
import { ErrorType } from 'types/login';
import { MedicalSupportErrorType, MedicalSupportInfoType } from '../type';
import { ItemInput } from '@components/auth/signup/styled';
import { mobileFormat } from '@utils/formatNumber';
interface MedicalSupportInfoPageView {
  mode: string;
  supportInfo: MedicalSupportInfoType;
  supportErr: MedicalSupportErrorType;
  supportDisable: boolean;
  setStateBoolean: (boo: boolean, keyId: string) => void;
  setStateString: (text: string, keyId: string) => void;
  setErrMsg: (err: ErrorType, keyId: string) => void;
  onClickBackMgt: () => void;
  onClickDoctorInfo: () => void;
  onClickDoctorInfoModify: () => void;
  onClickDoctorInfoDelete: () => void;
}

const MedicalSupportInfoPageView = (props: MedicalSupportInfoPageView) => {
  const {
    mode,
    supportInfo,
    supportErr,
    supportDisable,
    setStateBoolean,
    setStateString,
    setErrMsg,
    onClickBackMgt,
    onClickDoctorInfo,
    onClickDoctorInfoModify,
    onClickDoctorInfoDelete,
  } = props;

  const onDebounceFnDoctorInfo = useDebounceFn(onClickDoctorInfo, {
    wait: 300,
  });

  const onDebounceFnDoctorInfoModify = useDebounceFn(onClickDoctorInfoModify, {
    wait: 300,
  });

  const onDebounceFnDoctorInfoDelete = useDebounceFn(onClickDoctorInfoDelete, {
    wait: 300,
  });

  return (
    <ViewLayout
      disabled={supportDisable}
      title={mode === 'register' ? '진료 지원 계정 등록' : '진료 지원 정보'}
      mode={mode === 'register' ? 'register' : 'modify'}
      cancelEvent={onClickBackMgt}
      layoutEvent={
        mode === 'register'
          ? onDebounceFnDoctorInfo.run
          : onDebounceFnDoctorInfoModify.run
      }
      deleteEvent={
        mode === 'register' ? undefined : onDebounceFnDoctorInfoDelete.run
      }
      sideContents={
        mode === 'register' ? (
          <></>
        ) : (
          <DoctorInfoSwitch
            checked={!supportInfo['active']}
            onChange={() => {
              setStateBoolean(supportInfo['active'], 'active');
            }}
          />
        )
      }
    >
      <Grid container gap="180px">
        <Stack width="320px" gap="16px">
          <ItemInput title={'아이디'}>
            <WTextFieldUserId
              state={supportInfo['userId']}
              error={supportErr['userId']}
              setState={setStateString}
              setError={setErrMsg}
              keyId="userId"
              disabled={mode === 'register' ? false : true}
            />
          </ItemInput>
          {mode === 'register' ? (
            <ItemInput title={'임시 비밀번호'}>
              <WTextFieldUserPw
                state={supportInfo['tempPw']}
                error={supportErr['tempPw']}
                setState={setStateString}
                setError={setErrMsg}
                keyId="tempPw"
              />
            </ItemInput>
          ) : (
            <ItemInput title={'생년월일'}>
              <WTextFieldBirthDate
                state={supportInfo['birthDate']}
                error={supportErr['birthDate']}
                setState={setStateString}
                setError={setErrMsg}
                keyId="birthDate"
              />
            </ItemInput>
          )}
          <Box />
          <DoctorInfoGender
            state={supportInfo['gender']}
            err={supportErr['gender']}
            setState={setStateString}
            setErr={setErrMsg}
            keyId="gender"
          />
        </Stack>
        <Stack width="320px" gap="16px">
          <ItemInput title={'이름'}>
            <WTextFieldAdminName
              state={supportInfo['name']}
              error={supportErr['name']}
              setState={setStateString}
              setError={setErrMsg}
              keyId="name"
            />
          </ItemInput>
          <ItemInput title={'휴대폰 번호'}>
            <WMobileTextField
              state={
                mode === 'register'
                  ? supportInfo['mobile']
                  : mobileFormat(supportInfo['mobile'])
              }
              error={supportErr['mobile']}
              setState={setStateString}
              setError={setErrMsg}
              keyId="mobile"
              errorMsg="휴대폰 번호를 입력해 주세요."
              placeholder="숫자 11자리"
            />
          </ItemInput>
          {mode === 'register' ? (
            <ItemInput title={'생년월일'}>
              <WTextFieldBirthDate
                state={supportInfo['birthDate']}
                error={supportErr['birthDate']}
                setState={setStateString}
                setError={setErrMsg}
                keyId="birthDate"
              />
            </ItemInput>
          ) : (
            <></>
          )}
        </Stack>
      </Grid>
    </ViewLayout>
  );
};

export default MedicalSupportInfoPageView;
