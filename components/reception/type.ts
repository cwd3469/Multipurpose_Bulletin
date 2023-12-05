import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent } from 'react';
import { WOptionType } from 'types/common';
import { ErrorType, ModalType } from 'types/signin';

export interface Reception {
  registrationUlid: string;
  status: string;
  statusNameKo: string;
  location: string;
  nameAndAge: string;
  enterTypeNameKo: string;
  createAt: string;
}

export interface ReceptionAcceptView {
  name: string;
  open: boolean;
  mrn: string;
  mobile: string;
  mrnErr: ErrorType;
  disabled: boolean;
  residentNum: string;
  patientRegistrationNum: string;
  onOpenReset: () => void;
  onChangeMrm: (e: ChangeEvent<HTMLInputElement>) => void;
  onRegistration: () => void;
  bgDisabled?: boolean;
}

export interface ReceptionRefusalView {
  registration: () => void;
  modlaClose: () => void;
  onChangeRefusal: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectRefusal: (event: SelectChangeEvent<string>) => void;
  refusalVaild: (text: string) => void;
  disabled: boolean;
  modalDisabled: boolean;
  open: boolean;
  err: ErrorType;
  value: string;
  refusalState: string;
  refusal: WOptionType[];
}

export interface UseReceptionAccept extends ModalType {
  data: {
    name: string;
    registration: string;
    patientRegistrationNum: string;
    mobile: string;
  };
}

export interface ReceptionAcceptTemplateType extends UseReceptionAccept {
  ulid: string;
}

// ======================DTO======================
export interface ReceptionAcceptPostDto {
  ulid: string;
  patientRegisterNumber: string;
}
export interface ReceptionRefusalPostDto {
  ulid: string;
  reasonsRefusal: string;
}
