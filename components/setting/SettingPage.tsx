import { useToastContext } from '@hooks/useToastContext';
import { useCallback } from 'react';
import { DrSettingGetApiType } from './type';
import { DepartmentIntro } from '@components/baseMedicalExpenses/type';
import { reTextArr } from '@utils/user';
import { usePutDoctorSetting } from '@hooks/api/hospitalDoctor/doctorSetting';
import { mobileFormatOff } from '@utils/formatNumber';
import SettingPageView from '@components/supportDoctorSet/SettingPageView';
import useDoctorSettingFn from '@components/supportDoctorSet/hooks/useDoctorSettingFn';

const SettingPage = (props: {
  data: DrSettingGetApiType;
  userUlid: string;
  abiltyList: DepartmentIntro[];
}) => {
  const toast = useToastContext();
  const value = useDoctorSettingFn({ data: props.data });
  const { mutate: putProfileDoctor } = usePutDoctorSetting();

  const onSettingDoctorInfo = useCallback(() => {
    const info = value;
    const settingDto: DrSettingGetApiType = {
      doctorAccountUlid: props.userUlid,
      introductions: info.introduction,
      useOverseasTelemedicine: info.overseasTreatment,
      useVideoCall: info.means[0].active,
      useVoiceCall: info.means[1].active,
      timePerTreatment: Number(info.time.slice(0, -1)),
      maxQueue: Number(info.queueing.slice(0, -1)),
      specialists: reTextArr(info.ability),
      treatableSymptoms: reTextArr(info.symptom),
      supportMobileNum1: mobileFormatOff(info.addMobileOne),
      supportMobileNum2: mobileFormatOff(info.addMobileTwo),
      useRes: info.res,
    };

    putProfileDoctor(settingDto, {
      onSuccess(data) {
        if (data.data.code === '0000') {
          toast?.on('진료 설정 수정이 성공하였습니다', 'success');
        } else {
          toast?.on(
            '정보 수정이 실패하였습니다 \n 진료 설정 내용을 다시 한번 확인해 주세요',
            'error',
          );
        }
      },
    });
  }, [props.userUlid, putProfileDoctor, toast, value]);

  return (
    <SettingPageView
      {...value}
      onSettingDoctorInfo={onSettingDoctorInfo}
      abiltyList={props.abiltyList}
    />
  );
};

export default SettingPage;
