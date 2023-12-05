import { SxProps, Theme } from '@mui/material';
import { ErrorType } from 'types/signin';

export interface DepartmentIntro {
  id: string;
  koName: string;
  enName: string;
  active: boolean;
  price?: string;
}
export interface MedicalDepartment {
  [key: string]: DepartmentIntro;
  MG: DepartmentIntro;
  FM: DepartmentIntro;
  OS: DepartmentIntro;
  ENT: DepartmentIntro;
  PD: DepartmentIntro;
  DR: DepartmentIntro;
  OBGY: DepartmentIntro;
  UR: DepartmentIntro;
  NP: DepartmentIntro;
  // GS: DepartmentIntro;
  // NS: DepartmentIntro;
  // NU: DepartmentIntro;
  // CP: DepartmentIntro;
}

export interface MedicalErrorType {
  [key: string]: ErrorType;
  MG: ErrorType;
  FM: ErrorType;
  OS: ErrorType;
  ENT: ErrorType;
  PD: ErrorType;
  DR: ErrorType;
  OBGY: ErrorType;
  UR: ErrorType;
  NP: ErrorType;
}

export interface BaseExpTexareaType {
  state: string;
  label: string;
  active: boolean;
  keyId: string;
  onErr: ErrorType;
  sx?: SxProps<Theme>;
  onChange: (txt: string, keyId: string) => void;
  onFocusIn: (txt: string, keyId: string) => void;
  onFocusOut: (txt: string, keyId: string) => void;
  onToggle: (boo: boolean, keyId: string) => void;
}
