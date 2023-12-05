import {
  DocumentsType,
  WDepartmentHistoryTalking,
} from '@components/common/modal/WDetailModal';
import { TreatmentState } from './WaitingRoomPage';

export type WaitingRoomHeaderData = {
  patientRegistrationNum: string;
  startedAt: string;
  closedAt: string;
  registrationUlid: string;
  nameKo: string;
  age: number;
  gender: number;
  mobileNum: string;
  bodyProfile: string;
};

export type WatingRoomAgoraData = {
  agoraToken: string;
  agoraChannel: string;
  telemedicineType: string;
};

export type WatingRoomSymptomData = {
  symptom: string;
  symptomImages: DocumentsType[];
  documents: DocumentsType[];
  medicalHistoryTalk: WDepartmentHistoryTalking[];
};

export type WatingRoomPatientInfoData = {
  drinking: string;
  smoking: string;
  takingMedications: string;
  pastMedicalHistories: string;
  adverseDrugReactions: string;
};

export type WatingRoomState = {
  status: TreatmentState;
};
export type WatingPatientMessage = {
  patientMessage: string;
};

export type WaitingRoomSupportHeaderData = {
  patientNameKo: string;
  patientAge: number;
  patientMobileNUm: string;
  patientRegistrationNum: string;
  messageToPatient: string;
  registrationUlid: string;
  bodyProfile: string;
  startedAt: string;
  completedAt: string;
  gender: number;
};

export type WaitingGetDto = WaitingRoomHeaderData &
  WatingRoomAgoraData &
  WatingRoomSymptomData &
  WatingRoomPatientInfoData &
  WatingRoomState;

export type TreatHistoryDetailDto = WaitingRoomHeaderData &
  WatingRoomSymptomData &
  WatingRoomPatientInfoData &
  WatingRoomState &
  WatingPatientMessage;

export type SupportTreatHistoryDetailDto = WaitingRoomSupportHeaderData &
  WatingRoomSymptomData &
  WatingRoomPatientInfoData &
  WatingRoomState;
