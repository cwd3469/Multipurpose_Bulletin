//TODO:추후 변경 할 예정 임시 지정 타입

import { ErrorType, ModalType } from 'types/signin';

export interface ReserveTableUserInfoType {
  residentNameKo: string;
  residentRegistrationNum: string;
  residentMobileNum: string;
  patientRegistrationNum: string;
  reserveDate: string;
  reserveTimeTable: string;
}

export interface ReserveTableType {
  cancelReason: string;
  createdAt: string;
  enterTypeNameKo: string;
  nameAndAge: string;
  registrationUlid: string;
  reservationUlid: string;
  reservedAt: string;
  status: string;
  statusNameKo: string;
  reserveTableInfo: ReserveTableUserInfoType;
}
export type ModifyReserveDto = {
  reason: string;
  updateDate: string;
  timetable: string;
  reservationUlid: string;
};
export type ReserveTableModalType = {
  name: string;
  open: boolean;
  ulid: string;
};

export interface ReceptionAcceptModalType extends ModalType {
  ulid: string;
  name: string;
}

export type ReservePatientInfo = {
  name: string;
  registration: string;
  patientRegistrationNum: string;
  mobile: string;
};

export type UseReservePatientInfo = {
  updateDate: string;
  timetable: string;
};

export type UserInfo = UseReservePatientInfo & ReservePatientInfo;

export type ReserveModifyModalTemplateProps = ModalType & {
  ulid: string;
  patientInfo: UserInfo;
};

export type ModifyInfo = {
  [key: string]: string;
  updateDate: string;
  timetable: string;
  reason: string;
};
export type UseReserveModify = {
  reserveModifyError: ErrorType;
  reserveModifyInfo: ModifyInfo;
  onChangeReserveModifyInfo: (id: string, keyId: string) => void;
  onChangeReaSonError: (err: ErrorType) => void;
  onDisabled: boolean;
  reasonSelect: string;
  onChangeSelect: (id: string) => void;
};

export type ReserveModifyViewProps = ReserveModifyModalTemplateProps &
  UseReserveModify & {
    modalFunction: () => void;
  };
