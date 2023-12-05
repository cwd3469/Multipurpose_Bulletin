import { ErrorType, ModalType } from './signin';

export type SignupInfoValue = string | File | undefined;
export interface HospitalInfo {
  [key: string]: string | File | undefined;
  id: string;
  pw: string;
  repw: string;
  email: string;
  name: string;
  mobile: string;
  hocName: string;
  hocAddress: string;
  addressDetail: string;
  hocPhone: string;
  buisNum: string;
  hospitalCode: string;
  pharmacyAddress: string;
  postCode: string;
  businessLicense?: File;
  comnetUseCert?: File;
  bankbookCopy?: File;
}

export interface SignupInfo {
  [key: string]: string | File | null;
  accountId: string;
  email: string;
  password: string;
  reenterPassword: string;
  adminNameKo: string;
  adminMobileNum: string;
  hospitalNameKo: string;
  hospitalCode: string;
  hospitalAddr: string;
  hospitalAddrDetail: string;
  hospitalZipCode: string;
  hospitalPhoneNum: string;
  bizRegNum: string;
  bizCertFileUlid: string;
  passbookCopyFileUlid: string;
}

export interface HospitalInfoError {
  [key: string]: ErrorType;
  idErr: ErrorType;
  repwErr: ErrorType;
  emailErr: ErrorType;
  hospitalCodeErr: ErrorType;
  pwErr: ErrorType;
  nameErr: ErrorType;
  hocNameErr: ErrorType;
  hocAddressErr: ErrorType;
  addressDetailErr: ErrorType;
  hocPhoneErr: ErrorType;
  buisNumErr: ErrorType;
}

export interface BusiNumber {
  oneNum: string;
  twoNum: string;
  threeNum: string;
}

export interface HospitalSetting extends ModalType {
  mobile: string;
}
