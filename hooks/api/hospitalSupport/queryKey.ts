import { ParsedUrlQuery } from 'querystring';
import {
  FilterDateType,
  FilterSupportQueueType,
  FilterSupportReceptionPagitionType,
  FilterSupportTreatSetType,
} from 'types/table';

// ============ 비대면 진료 예약 ==============
export const SUPPORT_RESERVE_LIST = (query: ParsedUrlQuery) => [
  'SUPPORT',
  'RESERVE',
  'ACCEPT',
  query,
];

//====================== 처방전 ======================

export const SUPPORT_PRESCRIPTION = (ulid: string) => {
  return ['SUPPORT', 'PRESCRIPTION', ulid];
};

//====================== 당일 진료 접수 ======================

export const SUPPORT_RECEPTION = (query: ParsedUrlQuery) => [
  'RECEPTION',
  'LIST',
  'SUPPORT',
  query,
];

export const SUPPORT_RECEPTION_ACCEPT = (ulid: string) => [
  'RECEPTION',
  'ACCEPT',
  'SUPPORT',
  { ulid },
];
export const SUPPORT_RECEPTION_DETAIL = (ulid: string) => [
  'RECEPTION',
  'DETAIL',
  'SUPPORT',
  { ulid },
];

//====================== 진료 대기열 ======================

export const SUPPORT_QUEUE = (query: ParsedUrlQuery) => [
  'QUEUE',
  'LIST',
  'SUPPORT',
  query,
];

export const SUPPORT_QUEUE_DETAIL = (ulid: string) => [
  'QUEUE',
  'DETAIL',
  'SUPPORT',
  ulid,
];

//====================== 진료 내역 ======================

export const SUPPORTHISTORY = (query: ParsedUrlQuery) => [
  'HISTORY',
  'LIST',
  'SUPPORT',
  query,
];

export const SUPPORTHISTORYDETAIL = (ulid: string) => [
  'HISTORY',
  'DETAIL',
  'SUPPORT',
  ulid,
];
//====================== 진료 설정 ======================
export const SUPPORTTREATSET = (query: ParsedUrlQuery) => [
  'TREATSET',
  'LIST',
  'SUPPORT',
  query,
];
export const SUPPORT_TREATSET_DETAIL = (uild: string) => [
  'TREATSET',
  'DETAIL',
  'SUPPORT',
  { uild },
];
