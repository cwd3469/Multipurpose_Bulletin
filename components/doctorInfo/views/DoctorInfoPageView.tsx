import { Box, Grid, Stack } from '@mui/material';
import { useDebounceFn } from 'ahooks';
import { DoctorInfoDepartment, DoctorInfoGender } from '../modules';
import DoctorInfoFilePicker from '../modules/DoctorInfoFilePicker';
import { DoctorInfoPageView } from '../type';
import {
  WTextFieldUserId,
  WTextFieldUserPw,
  WTextFieldAdminName,
  WTextFieldDoctorLicenseNumber,
  WMobileTextField,
  WTextFieldBirthDate,
} from '@components/common/inputs/textField/modules';
import { ItemInput } from '@components/auth/signup/styled';
import ViewLayout from '@components/common/layout/ViewLayout';
import DoctorRepresentDepartment from '../modules/DoctorRepresentDepartment';
import { ErrorType } from 'types/signin';

const DoctorInfoPageView = (props: DoctorInfoPageView) => {
  const {
    doctorInfo,
    doctorErr,
    doactorDisable,
    setStateString,
    setErrMsg,
    setStateDepartment,
    onClickBackMgt,
    onClickDoctorInfo,
  } = props;

  const onDebounceFnDoctorInfo = useDebounceFn(onClickDoctorInfo, {
    wait: 300,
  });

  return (
    <ViewLayout
      title={'의사 등록'}
      mode={'register'}
      cancelEvent={onClickBackMgt}
      layoutEvent={onDebounceFnDoctorInfo.run}
      disabled={doactorDisable}
    >
      <Grid container gap="45px">
        <Stack width="320px" gap="16px">
          <ItemInput title={'아이디'}>
            <WTextFieldUserId
              state={doctorInfo['userId']}
              setState={setStateString}
              keyId={'userId'}
              error={doctorErr['userId']}
              setError={setErrMsg}
            />
          </ItemInput>
          <ItemInput title={'임시 비밀번호'}>
            <WTextFieldUserPw
              state={doctorInfo['tempPw']}
              error={doctorErr['tempPw']}
              setState={setStateString}
              setError={setErrMsg}
              keyId="tempPw"
            />
          </ItemInput>
          <ItemInput title={'이름'}>
            <WTextFieldAdminName
              state={doctorInfo['name']}
              error={doctorErr['name']}
              setState={setStateString}
              setError={setErrMsg}
              keyId="name"
            />
          </ItemInput>
          <Box />
        </Stack>
        <Grid width="775px" container gap="45px">
          <Stack width="320px" gap="15px">
            <ItemInput title={'면허 번호'}>
              <WTextFieldDoctorLicenseNumber
                state={doctorInfo['licenseNumber']}
                error={doctorErr['licenseNumber']}
                setState={setStateString}
                setError={setErrMsg}
                keyId="licenseNumber"
              />
            </ItemInput>
            <ItemInput title={'휴대폰 번호'}>
              <WMobileTextField
                state={doctorInfo['mobile']}
                error={doctorErr['mobile']}
                setState={setStateString}
                setError={setErrMsg}
                keyId="mobile"
                errorMsg="휴대폰 번호를 입력해 주세요."
                placeholder="숫자 11자리"
              />
            </ItemInput>
            <ItemInput title={'생년월일'}>
              <WTextFieldBirthDate
                state={doctorInfo['birthDate']}
                error={doctorErr['birthDate']}
                setState={setStateString}
                setError={setErrMsg}
                keyId="birthDate"
              />
            </ItemInput>
          </Stack>
          <Stack width="410px" gap="12px">
            <DoctorInfoFilePicker
              setState={setStateString}
              setErr={setErrMsg}
              keyId="profileImageUlid"
            />
            <Box width="300px">
              <DoctorInfoGender
                state={doctorInfo['gender']}
                err={doctorErr['gender']}
                setState={setStateString}
                setErr={setErrMsg}
                keyId="gender"
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Grid container>
        <Box width="835px">
          <DoctorInfoDepartment
            state={doctorInfo['medicalDepartment']}
            err={doctorErr['medicalDepartment']}
            setState={setStateDepartment}
            setErr={setErrMsg}
          />
        </Box>
        <DoctorRepresentDepartment
          state={doctorInfo['primaryDepartmentCode']}
          err={doctorErr['primaryDepartmentCode']}
          setState={setStateString}
          setErr={setErrMsg}
          keyId={'primaryDepartmentCode'}
        />
      </Grid>
    </ViewLayout>
  );
};

export default DoctorInfoPageView;
