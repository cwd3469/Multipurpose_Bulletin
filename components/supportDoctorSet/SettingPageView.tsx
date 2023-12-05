import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import SettingSpecialist from '@components/setting/modules/SettingSpecialist';
import SettingIntro from '@components/setting/modules/SettingIntro';
import SettingMeans from '@components/setting/modules/SettingMeans';
import SettingQueue from '@components/setting/modules/SettingQueue';
import SettingSymptom from '@components/setting/modules/SettingSymptom';
import SettingTime from '@components/setting/modules/SettingTime';
import { ContentsBox } from '@components/setting/SettingTheme';
import { UseDoctorSettingFnType } from '@components/setting/type';
import { DepartmentIntro } from '@components/baseMedicalExpenses/type';
import SettingMobile from '@components/setting/modules/SettingMobile';
import { useDebounceFn } from 'ahooks';
import SettingRes from '@components/setting/modules/SettingRes';

interface SettingPageView extends UseDoctorSettingFnType {
  abiltyList: DepartmentIntro[];
  onSettingDoctorInfo: () => void;
}

const SettingPageView = (props: SettingPageView) => {
  const onModify = useDebounceFn(
    () => {
      props.onSettingDoctorInfo();
    },
    {
      wait: 500,
    },
  );
  return (
    <Stack gap="20px">
      <Typography variant="h5">진료 설정</Typography>
      <Grid container gap="40px">
        <ContentsBox width="690px" sx={{ height: 'auto', paddingBottom: '18px' }}>
          <SettingRes state={props.res} setState={props.setRes} />
          <Box height="40px" />
          <SettingMeans state={props.means} setState={props.setMaens} />
          <Box height="18px" />
          <SettingSpecialist
            state={props.ability}
            setState={props.setAbility}
            origin={props.abiltyList}
          />
          <Box height="40px" />
          <SettingSymptom state={props.symptom} setState={props.setSymptom} />
        </ContentsBox>
        <ContentsBox width="470px" sx={{ height: 'auto', paddingRight: '35px' }}>
          <SettingMobile
            stateOne={props.addMobileOne}
            setStateOne={props.setAddMoblieOne}
            stateTwo={props.addMobileTwo}
            setStateTwo={props.setAddMoblieTwo}
            mobileOneErr={props.mobileOneErr}
            setMobileOneErr={props.setMobileOneErr}
            mobileTwoErr={props.mobileTwoErr}
            setMobileTwoErr={props.setMobileTwoErr}
          />
          <SettingTime
            state={props.time}
            setState={props.setTime}
            error={props.timeErr}
            setError={props.setTimeErr}
          />
          <SettingQueue
            state={props.queueing}
            setState={props.setQueueing}
            error={props.queueErr}
            setError={props.setQueueErr}
          />
          <SettingIntro state={props.introduction} setState={props.setIntroduction} />
        </ContentsBox>
      </Grid>
      <Grid container justifyContent={'center'} paddingTop="4px">
        <Button
          variant="contained"
          sx={{
            width: '180px',
            padding: '20px',
            fontSize: '16px',
            lineHeight: '1.2',
          }}
          disabled={props.disabled}
          onClick={onModify.run}
        >
          수정
        </Button>
      </Grid>
    </Stack>
  );
};

export default SettingPageView;
