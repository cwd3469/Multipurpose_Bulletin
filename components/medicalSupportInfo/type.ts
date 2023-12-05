import { MedicalDepartment } from '@components/baseMedicalExpenses/type';
import { ErrorType } from 'types/signin';

export interface MedicalSupportInfoType {
  [key: string]: boolean | string;
  tempPw: string;
  userId: string;
  name: string;
  birthDate: string;
  mobile: string;
  gender: '1' | '2';
  active: boolean;
}
export interface MedicalSupportErrorType {
  [key: string]: ErrorType;
  tempPw: ErrorType;
  userId: ErrorType;
  name: ErrorType;
  birthDate: ErrorType;
  mobile: ErrorType;
  gender: ErrorType;
}

export interface MedicalSupportInfoDto {
  medicalSupportAccountId: string;
  password: string;
  mobileNum: string;
  nameKo: string;
  birthday: string;
  gender: string;
}
export interface MedicalSupportInfoDtoGet {
  accountNonLocked: boolean;
  birthday: string;
  gender: '1' | '2';
  medicalSupportAccountId: string;
  mobileNum: string;
  nameKo: string;
}

export interface MedicalSupportInfoModify {
  medicalSupportAccountId: string;
  mobileNum: string;
  nameKo: string;
  birthday: string;
  gender: string;
  accountNonLocked: boolean;
}
