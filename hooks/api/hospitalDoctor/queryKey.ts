import { ParsedUrlQuery } from 'querystring';
import { DataPagition } from 'types/table';

// ============ 비대면 진료 예약 ==============
export const RESERVE_LIST = (query: string) => ['RESERVE', 'ACCEPT', query];
export const SUPPORT_RESERVE_LIST = (query: string) => ['spport', 'RESERVE', 'ACCEPT', query];

export const RESERVE_ACCEPT = (ulid: string) => ['RESERVE', 'ACCEPT', ulid];

// ============비대면 처방전 쿼리키==============

export const PRESCRIPTION = (ulid: string) => ['PRESCRIPTION', ulid];

// ============비대면 진료 내역 조회 쿼리키==============

export const HISTORY = (query: ParsedUrlQuery) => ['HISTORY', 'LIST', query];

export const HISTORYDETAIL = (ulid: string) => ['HISTORY', 'DETAIL', ulid];

// ============비대면 진료 대기열 쿼리키==============

export const TEANTSTART = (ulid: string) => ['TEANT', 'START', ulid];

export const PATIENT_HISTORY = (param: { ulid: string; page: number }) => [
  'PATIENT',
  'HISTORY',
  [param.ulid, param.page],
];

// ============비대면 진료 대기열 쿼리키==============

export const QUEUE = (query: ParsedUrlQuery) => ['QUEUE', 'LIST', query];

export const QUEUEDETAIL = (ulid: string) => ['QUEUE', 'DETAIL', ulid];

// ============당일 진료 접수 쿼리키==============

export const RECEPTION = (query: ParsedUrlQuery) => ['RECEPTION', 'LIST', query];

export const RECEPTION_DETAIL = (id: string) => ['RECEPTION', 'DETAIL', id];

export const RECEPTION_ACCEPT = (id: string) => ['RECEPTION', 'ACCEPT', id];

export const RECEPTION_ACCEPT_POST = (id: string) => ['RECEPTION', 'ACCEPT', 'POST'];
export const RECEPTION_REFUSAL_POST = (id: string) => ['RECEPTION', 'REFUSAL', 'POST'];

// ============비급여 리스트 쿼리키==============
export const NON_REIMBUTSEMENT = (query: ParsedUrlQuery) => ['NON_REIMBUTSEMENT', 'LIST', query];

export const NON_REIMBUTSEMENT_DETAIL = (id: string) => ['NON_REIMBUTSEMENT', 'DETAIL', id];

// ============제증명 쿼리키==============

export const CERTIFICATE_MGT = (filter?: DataPagition) => ['CERTIFICATE', 'LIST', filter];

export const CERTIFICATE_MGT_DETAIL = (id: string) => ['CERTIFICATE', 'DETAIL', id];

// ============비대면 상태 조회 쿼리키==============

export const DOCTOR_TELEMEDICINE_STATUS = ['DOCTOR', 'TELEMEDICINE', 'STATUS'];
