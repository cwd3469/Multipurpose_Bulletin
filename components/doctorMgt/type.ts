import { FileUid } from '@components/hospitalIntro/type';
import { ModalType } from 'types/signin';

export interface DoctorMgtType {
  id: number;
  account: string;
  accountStatus: string;
  medicalDepartment: string;
  doctorName: string;
  registrationDate: string;
  registrationTime: string;
}
export interface DoctorMgtDtoType {
  doctorProfileUlid: string;
  doctorAccountId: string;
  treatableDepartmentNamesStr: string;
  nameKo: string;
  createdAt: string;
  accountNonLocked: boolean;
}

export type ModalCase = 'modify' | 'registration' | 'delete';

export interface DoctorMgtModalType extends ModalType {
  modalCase: ModalCase;
  id?: string;
}
export interface CategoryDateType {
  categoryName: string;
  categoryAmount: string;
}

export type ApiGetDoctorProfileTableKeyValue = string | number | undefined;

export interface ApiGetDoctorProfileTableType {
  [key: string]: ApiGetDoctorProfileTableKeyValue;
  code?: string;
  nameKo?: string;
  page: number;
}

export type SetInFilter = (value: ApiGetDoctorProfileTableKeyValue, keyId: string) => void;

export interface DoctorMgtFilterType {
  setInFilter: SetInFilter;
}

//===========DTO================
export interface DtoPostDoctorRegister {
  doctorAccountId: string;
  password: string;
  mobileNum: string;
  nameKo: string;
  birthday: string;
  licenseNum: string;
  gender: string;
  departmentCodes: string[];
  doctorProfileImageUlid: string;
  primaryDepartmentCode: string;
}
