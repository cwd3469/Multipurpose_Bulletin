import { DepartmentIntro, MedicalDepartment } from '@components/baseMedicalExpenses/type';
import { FileUid } from '@components/hospitalIntro/type';
import { ErrorType } from 'types/signin';

export interface DoctorInfoType {
  [key: string]: boolean | string | MedicalDepartment;
  userId: string;
  tempPw: string;
  name: string;
  birthDate: string;
  mobile: string;
  gender: string;
  licenseNumber: string;
  active: boolean;
  medicalDepartment: MedicalDepartment;
  profileImageUlid: string;
  primaryDepartmentCode: string;
}
export interface DoctorErrType {
  [key: string]: ErrorType;
  userId: ErrorType;
  name: ErrorType;
  tempPw: ErrorType;
  birthDate: ErrorType;
  mobile: ErrorType;
  gender: ErrorType;
  licenseNumber: ErrorType;
  medicalDepartment: ErrorType;
  profileImageUlid: ErrorType;
  primaryDepartmentCode: ErrorType;
}

export interface DoctorInfoProps {
  state: string;
  err: ErrorType;
  setState: (text: string, keyId: string) => void;
  setErr: (err: ErrorType, keyId: string) => void;
  keyId: string;
  disabled?: boolean;
}

export interface DepartmentProps {
  state: MedicalDepartment;
  err: ErrorType;
  setState: (info: DepartmentIntro, medicalType: string) => void;
  setErr: (err: ErrorType, keyId: string) => void;
}

export interface DoctorInfoView {
  doctorInfo: DoctorInfoType;
  doctorErr: DoctorErrType;
  doactorDisable: boolean;
  setStateBoolean: (boo: boolean, keyId: string) => void;
  setStateString: (text: string, keyId: string) => void;
  setErrMsg: (err: ErrorType, keyId: string) => void;
  setStateDepartment: (info: DepartmentIntro, medicalType: string) => void;
  onClickBackMgt: () => void;
}

export interface DoctorInfoPageView extends DoctorInfoView {
  onClickDoctorInfo: () => void;
}
export interface DoctorDetailView extends DoctorInfoView {
  onClickDoctorInfoModify: () => void;
  onClickDoctorInfoDelete: () => void;
}

//===========-관리자 의사관리 DTO================
export interface DtoGetDoctorDetail {
  doctorAccountId: string;
  mobileNum: string;
  nameKo: string;
  birthday: string;
  licenseNum: string;
  gender: number;
  accountNonLocked: boolean;
  departmentCodes: string[];
  doctorProfileImageUlid: string;
  primaryDepartmentCode: string;
}

export interface DtoPutDoctorDetail {
  modifyData: DtoGetDoctorDetail;
  doctorProfileUlid: string;
}
