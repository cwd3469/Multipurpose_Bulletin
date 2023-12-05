import { useEffect, useState } from 'react';
import settingInfo from '@components/setting/jsons/settingInfo.json';
import {
  DataType,
  DrSettingGetApiType,
  Means,
  Symptom,
  UseDoctorSettingFnType,
} from '@components/setting/type';
import { DepartmentIntro } from '@components/baseMedicalExpenses/type';
import { reActiveList } from '@utils/user';
import { mobileFormat } from '@utils/formatNumber';
import { ErrorType } from 'types/signin';

const useDoctorSetting = (props: { data: DrSettingGetApiType }): UseDoctorSettingFnType => {
  const setJson: DataType = JSON.parse(JSON.stringify(settingInfo));
  const [timeErr, setTimeErr] = useState<ErrorType>({ msg: '', boo: false });
  const [queueErr, setQueueErr] = useState<ErrorType>({ msg: '', boo: false });
  const [mobileOneErr, setMobileOneErr] = useState<ErrorType>({
    msg: '',
    boo: false,
  });
  const [mobileTwoErr, setMobileTwoErr] = useState<ErrorType>({
    msg: '',
    boo: false,
  });
  const [res, setRes] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [origin, setOrigin] = useState<DataType>();
  const [addMobileOne, setAddMoblieOne] = useState<string>('');
  const [addMobileTwo, setAddMoblieTwo] = useState<string>('');
  const [ability, setAbility] = useState<DepartmentIntro[]>([]);
  const [symptom, setSymptom] = useState<Symptom[]>(setJson.symptom);
  const [means, setMaens] = useState<Means[]>(setJson.means);
  const [overseasTreatment, setOverseasTreatment] = useState<boolean>(false);
  const [time, setTime] = useState<string>('1분');
  const [queueing, setQueueing] = useState<string>('1명');
  const [introduction, setIntroduction] = useState<string>('');

  const value = {
    origin,
    addMobileOne,
    addMobileTwo,
    ability,
    symptom,
    means,
    overseasTreatment,
    time,
    queueing,
    introduction,
    disabled,
    timeErr,
    queueErr,
    mobileOneErr,
    mobileTwoErr,
    res,
  };

  const setValue = {
    setAddMoblieOne,
    setAddMoblieTwo,
    setAbility,
    setSymptom,
    setMaens,
    setOverseasTreatment,
    setTime,
    setQueueing,
    setIntroduction,
    setTimeErr,
    setQueueErr,
    setMobileOneErr,
    setMobileTwoErr,
    setRes,
  };

  useEffect(() => {
    if (props.data) {
      const json: DataType = JSON.parse(JSON.stringify(settingInfo));
      const res = props.data;
      const depatmentArr = reActiveList(json.ability, res.specialists);
      const symptomList = reActiveList(json.symptom, res.treatableSymptoms);
      const means = [
        {
          meanName: '화상 진료',
          active: res.useVideoCall,
          id: '2001',
        },
        {
          meanName: '음성 진료',
          active: res.useVoiceCall,
          id: '2002',
        },
      ];
      const arr = depatmentArr.filter((item, index) => {
        return item.active;
      });
      const state: DataType = {
        ability: arr,
        symptom: symptomList,
        means: means,
        overseasTreatment: res.useOverseasTelemedicine,
        time: String(res.timePerTreatment) + '분',
        queueing: String(res.maxQueue) + '명',
        introduction: res.introductions,
        addMobileOne: mobileFormat(res.supportMobileNum1),
        addMobileTwo: mobileFormat(res.supportMobileNum2),
        useRes: res.useRes,
      };
      setOrigin(state);
      setAbility(state.ability);
      setSymptom(state.symptom);
      setMaens(state.means);
      setOverseasTreatment(state.overseasTreatment);
      setTime(state.time);
      setQueueing(state.queueing);
      setIntroduction(state.introduction);
      setAddMoblieOne(state.addMobileOne);
      setAddMoblieTwo(state.addMobileTwo);
      setRes(state.useRes);
    }
  }, [props.data]);

  useEffect(() => {
    const state: DataType = {
      ability: ability,
      symptom: symptom,
      means: means,
      overseasTreatment: overseasTreatment,
      time: time,
      queueing: queueing,
      introduction: introduction,
      addMobileOne: addMobileOne,
      addMobileTwo: addMobileTwo,
      useRes: res,
    };

    const filter = state.symptom.filter((item) => {
      return item.active;
    });
    const meansFilter = state.means.filter((item) => {
      return item.active;
    });

    if (origin) {
      if (JSON.stringify(origin) === JSON.stringify(state)) {
        setDisabled(true);
        return;
      }
      // 필수 값
      if (!state.queueing) {
        setDisabled(true);
        return;
      }
      if (!state.time) {
        setDisabled(true);
        return;
      }
      if (timeErr.boo) {
        setDisabled(true);
        return;
      }
      if (queueErr.boo) {
        setDisabled(true);
        return;
      }
      if (filter.length === 0) {
        setDisabled(true);
        return;
      }
      if (meansFilter.length === 0) {
        setDisabled(true);
        return;
      }
      if (addMobileOne) {
        if (mobileOneErr.boo) {
          setDisabled(true);
          return;
        }
      }
      if (addMobileTwo) {
        if (mobileTwoErr.boo) {
          setDisabled(true);
          return;
        }
      }
      setDisabled(false);
    }
  }, [
    ability,
    addMobileOne,
    addMobileTwo,
    introduction,
    means,
    mobileOneErr.boo,
    mobileTwoErr.boo,
    origin,
    overseasTreatment,
    queueErr.boo,
    queueing,
    res,
    symptom,
    time,
    timeErr.boo,
  ]);

  return { ...value, ...setValue };
};

export default useDoctorSetting;
