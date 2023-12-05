export type ReceptionState = 'atmosphere' | 'refusal' | 'accepted';

export interface SupportReception {
  createdAt: string;
  doctorNameKo: string;
  enterTypeNameKo: string;
  location: string;
  nameAndAge: string;
  register: string;
  registrationUlid: string;
  status: string;
  statusNameKo: string;
}
