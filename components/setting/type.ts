import { DepartmentIntro, MedicalDepartment } from '@components/baseMedicalExpenses/type';
import { Dispatch, SetStateAction } from 'react';
import { ErrorType } from 'types/signin';

export interface Ability {
  name: string;
  active: boolean;
  id: string;
}

export interface Symptom {
  symptomName: string;
  active: boolean;
  id: string;
}
export interface Means {
  meanName: string;
  active: boolean;
  id: string;
}

export interface DataType {
  ability: DepartmentIntro[];
  symptom: Symptom[];
  means: Means[];
  overseasTreatment: boolean;
  time: string;
  queueing: string;
  introduction: string;
  addMobileOne: string;
  addMobileTwo: string;
  useRes: boolean;
}

export interface SettingSpecialistType {
  state: DepartmentIntro[];
  setState: Dispatch<SetStateAction<DepartmentIntro[]>>;
  origin: DepartmentIntro[];
}
export interface SettingSymptomType {
  state: Symptom[];
  setState: Dispatch<SetStateAction<Symptom[]>>;
}
export interface SettingMeansType {
  state: Means[];
  setState: Dispatch<SetStateAction<Means[]>>;
}
export interface SettingOverseasType {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}
export interface SettingTextType {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  error: ErrorType;
  setError: Dispatch<SetStateAction<ErrorType>>;
}
export interface SettingMobileType {
  stateOne: string;
  setStateOne: Dispatch<SetStateAction<string>>;
  stateTwo: string;
  setStateTwo: Dispatch<SetStateAction<string>>;
  mobileOneErr: ErrorType;
  setMobileOneErr: Dispatch<SetStateAction<ErrorType>>;
  mobileTwoErr: ErrorType;
  setMobileTwoErr: Dispatch<SetStateAction<ErrorType>>;
}

//=============DTO================//

export interface DrSettingGetApiType {
  doctorAccountUlid: string;
  introductions: string;
  isComplete?: boolean;
  maxQueue: number;
  specialists: string[];
  timePerTreatment: number;
  treatableSymptoms: string[];
  useOverseasTelemedicine: boolean;
  useVideoCall: boolean;
  useVoiceCall: boolean;
  supportMobileNum1: string;
  supportMobileNum2: string;
  useRes: boolean;
}

export interface UseDoctorSettingFnType {
  addMobileOne: string;
  addMobileTwo: string;
  ability: DepartmentIntro[];
  symptom: Symptom[];
  means: Means[];
  overseasTreatment: boolean;
  time: string;
  queueing: string;
  introduction: string;
  disabled: boolean;
  res: boolean;
  timeErr: ErrorType;
  queueErr: ErrorType;
  mobileOneErr: ErrorType;
  mobileTwoErr: ErrorType;
  setRes: Dispatch<SetStateAction<boolean>>;
  setAddMoblieOne: Dispatch<SetStateAction<string>>;
  setAddMoblieTwo: Dispatch<SetStateAction<string>>;
  setAbility: Dispatch<SetStateAction<DepartmentIntro[]>>;
  setSymptom: Dispatch<SetStateAction<Symptom[]>>;
  setMaens: Dispatch<SetStateAction<Means[]>>;
  setOverseasTreatment: Dispatch<SetStateAction<boolean>>;
  setTime: Dispatch<SetStateAction<string>>;
  setQueueing: Dispatch<SetStateAction<string>>;
  setIntroduction: Dispatch<SetStateAction<string>>;
  setTimeErr: Dispatch<SetStateAction<ErrorType>>;
  setQueueErr: Dispatch<SetStateAction<ErrorType>>;
  setMobileOneErr: Dispatch<SetStateAction<ErrorType>>;
  setMobileTwoErr: Dispatch<SetStateAction<ErrorType>>;
}
