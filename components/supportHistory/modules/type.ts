import { HistoryInterface } from '@components/history/modules/type';

// 변경

export interface SupportHistoryInterface {
  amount: string;
  completedAt: string;
  doctorNameKo: string;
  endStatusMessage: string;
  isDone: boolean;
  isFixableTreatmentCost: boolean;
  location: string;
  nameAndAge: string;
  patientRegistrationNum: string;
  paymentStatus: string;
  prescriptionUlid: string;
  register: string;
  registrationUlid: string;
  status: string;
  statusNameKo: string;
  telemedicineType: string;
}
