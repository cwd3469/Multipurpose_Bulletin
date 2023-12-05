import { Dispatch, SetStateAction } from 'react';
import { ModalType } from 'types/signin';

export type HistoryType = 'exists' | 'notExists' | 'waiting' | '';

export interface HistoryBase {
  id: number;
  medicineDate: string;
  medicineTime: string;
  medicineCountry: string;
  medicineReceptionist: string;
  patientName: string;
  patientAge: string;
  patientNumber: string;
  medicineMeans: string;
  medicineCause: string;
  medicineExpenses: string | null;
}
export interface HistoryInterface {
  amount: number;
  endStatusMessage: string;
  isFixableTreatmentCost: boolean;
  isDone: boolean;
  location: string;
  patientRegistrationNum: string;
  prescriptionUlid: string;
  register: string;
  registrationUlid: string;
  status: string;
  statusNameKo: string;
  telemedicineType: string;
  paymentStatus: string;
}

export interface HistoryDocPaymentType {
  costs: DocumentListType[];
  setCosts: Dispatch<SetStateAction<DocumentListType[]>>;
}

export interface DocumentListType {
  id: string;
  name: string;
  active: boolean;
  cost: string;
}

export interface DocumentsModalType extends ModalType {
  tab: boolean;
  setTab: (boo: boolean) => void;
  mode: 'modify' | 'register';
  isExpenses: boolean;
}
