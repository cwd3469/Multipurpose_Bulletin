import { Box, Grid, Stack } from '@mui/material';
import { useDebounceFn } from 'ahooks';
import { DoctorInfoSwitch } from '../DoctorInfoTheme';
import useDoctorInfoData from '../hooks/useDoctorInfoData';
import useDoctorInfoPage from '../hooks/useDoctorInfoPage';
import { DoctorInfoDepartment, DoctorInfoGender } from '../modules';
import {
  WTextFieldUserId,
  WTextFieldAdminName,
  WTextFieldDoctorLicenseNumber,
  WMobileTextField,
  WTextFieldBirthDate,
} from '@components/common/inputs/textField/modules';
import { ItemInput } from '@components/auth/signup/styled';
import DoctorInfoFilePicker from '../modules/DoctorInfoFilePicker';
import { DoctorInfoType } from '../type';
import ViewLayout from '@components/common/layout/ViewLayout';
import { mobileFormat } from '@utils/formatNumber';
import DoctorRepresentDepartment from '../modules/DoctorRepresentDepartment';

const DoctorInfoDetailView = (props: {
  reData: DoctorInfoType;
  doctorProfileUlid: string;
  modifyData: string[];
}) => {
  const {
    doctorInfo,
    doctorErr,
    doactorDisable,
    modifyData,
    setStateBoolean,
    setStateString,
    setErrMsg,
    setStateDepartment,
    onClickBackMgt,
  } = useDoctorInfoPage({
    data: props.reData,
    mode: 'modify',
    promiseFile: props.modifyData,
  });
  const { onClickDoctorInfoDelete, onClickDoctorInfoModify } = useDoctorInfoData({
    doctorInfo,
    doctorProfileUlid: props.doctorProfileUlid,
  });

  const onDebounceFnDoctorInfoModify = useDebounceFn(onClickDoctorInfoModify, {
    wait: 300,
  });
  const onDebounceFnDoctorInfoDelete = useDebounceFn(onClickDoctorInfoDelete, {
    wait: 300,
  });

  return (
    <ViewLayout
      title={'의사 정보'}
      mode={'modify'}
      cancelEvent={onClickBackMgt}
      layoutEvent={onDebounceFnDoctorInfoModify.run}
      deleteEvent={onDebounceFnDoctorInfoDelete.run}
      disabled={doactorDisable}
      sideContents={
        <DoctorInfoSwitch
          checked={!doctorInfo['active']}
          onChange={() => {
            setStateBoolean(doctorInfo['active'], 'active');
          }}
        />
      }
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
              disabled={true}
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
          <DoctorInfoGender
            state={doctorInfo['gender']}
            err={doctorErr['gender']}
            setState={setStateString}
            setErr={setErrMsg}
            keyId="gender"
          />
        </Stack>
        <Grid width="775px" container gap="45px">
          <Stack width="320px" gap="16px">
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
                state={mobileFormat(doctorInfo['mobile'])}
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
          <Stack width="410px">
            <DoctorInfoFilePicker
              setState={setStateString}
              setErr={setErrMsg}
              keyId="profileImageUlid"
              modifyFile={modifyData ? modifyData : []}
            />
          </Stack>
        </Grid>
      </Grid>
      <Box height={'50px'} />
      <Grid container>
        <Stack width="820px" gap="16px">
          <DoctorInfoDepartment
            state={doctorInfo['medicalDepartment']}
            err={doctorErr['medicalDepartment']}
            setState={setStateDepartment}
            setErr={setErrMsg}
          />
        </Stack>
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

export default DoctorInfoDetailView;
