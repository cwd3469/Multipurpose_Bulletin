import { SxProps, Theme } from '@mui/material';
import { ModalType } from '../../../../types/signin';

export interface GnbMobalType extends ModalType {
  timer: string;
  resend: () => void;
}
export interface GnbTreatStateMobalType extends ModalType {
  status: boolean;
}

export interface ItemList {
  name: string;
  path: string;
  pageid: string;
}

export interface GnbItemType {
  sx?: SxProps<Theme>;
  name: string;
  tgtBtn: string;
  tgtMenu: string;
  itemList: ItemList[];
  pageName: string;
  disabled?: boolean;
}

export type Permission =
  | 'HOSPITAL_ADMIN'
  | 'MEDICAL_SUPPORT'
  | 'HOSPITAL_DOCTOR';
