import { useToastContext } from '@hooks/useToastContext';
import { useCallback, useContext } from 'react';
import { DrSettingGetApiType } from '@components/setting/type';
import { DepartmentIntro } from '@components/baseMedicalExpenses/type';
import { reTextArr } from '@utils/user';
import { mobileFormatOff } from '@utils/formatNumber';
import { useDoctorTreatProfileModify } from '@hooks/api/hospitalSupport/supportDoctorTreat';
import { SupportTreatFilterContext } from '@components/supportTreatmentSet/contexts/SupportTreatFilterContext';
import { useRouter } from 'next/router';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import useDoctorSettingFn from './hooks/useDoctorSettingFn';
import SettingPageView from './SettingPageView';

const SupportSettingPage = (props: {
  data: DrSettingGetApiType;
  userUlid: string;
  abiltyList: DepartmentIntro[];
}) => {
  const router = useRouter();
  const msg = useCodeMsgBundle();
  const toast = useToastContext();
  const value = useDoctorSettingFn({ data: props.data });
  const { filter } = useContext(SupportTreatFilterContext);
  const { mutate: mutateDoctorTreatProfileModify } = useDoctorTreatProfileModify(props.userUlid);

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
    mutateDoctorTreatProfileModify(settingDto, {
      onSuccess(data) {
        if (data.data.code === '0000') {
          toast?.on('진료 설정 수정이 성공하였습니다', 'success');
          router.replace('/medical-support/treatment-set?page=0');
        } else {
          toast?.on(msg.errMsg(data.data.code), 'error');
        }
      },
    });
  }, [msg, mutateDoctorTreatProfileModify, props.userUlid, router, toast, value]);

  return (
    <SettingPageView
      {...value}
      onSettingDoctorInfo={onSettingDoctorInfo}
      abiltyList={props.abiltyList}
    />
  );
};

export default SupportSettingPage;
