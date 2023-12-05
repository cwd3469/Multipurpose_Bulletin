export type DataPagitionValue =
  | string
  | number
  | FilterDateType
  | undefined
  | boolean;

export interface DataPagition {
  [key: string]: DataPagitionValue;
  code?: string;
  nameKo?: string;
  page: number;
}

export interface FilterDateType {
  [key: string]: string;
  startDate: string;
  endDate: string;
}
/**의사 비대면 당일 진료 접수 필터 타입 */
export interface FilterReceptionPagitionType extends DataPagition {
  location?: string;
  enterType?: string;
  status?: string;
}
/**의사 비대면 당일 진료 예약 필터 타입 */
export interface FilterReserveType extends DataPagition {
  location?: string;
  enterType?: string;
  status?: string;
  keyword?: string;
}

export interface FilterQueuePagitionType extends DataPagition {
  location?: string;
  status?: string;
  keyword?: string;
}
export interface FilterHistoryPagitionType extends DataPagition {
  location?: string;
  status?: string;
  keyword?: string;
  isDone?: string;
}
interface FilterSupportPagitionType {
  [key: string]: DataPagitionValue;
  doctorNameKo?: string;
  location?: string;
  page: number;
}

/**진료 지원 비대면 당일 진료 접수 필터 타입 */
export interface FilterSupportReceptionPagitionType
  extends FilterSupportPagitionType {
  enterType?: string;
  registrationStatus?: string;
  patientNameKo?: string;
}
/**진료 지원 비대면 진료 대기열 필터 타입 */
export interface FilterSupportQueueType extends FilterSupportPagitionType {
  treatmentStatus?: string;
  keyword?: string;
}
/**진료 지원 비대면 진료 내역 필터 타입 */
export interface FilterSupportHistoryType extends FilterSupportQueueType {
  isDone?: string;
}

/**진료 지원 비대면 의사 진료 설정 필터 타입 */
export interface FilterSupportTreatSetType extends FilterSupportPagitionType {
  departmentCode?: string;
  clinicStatus?: string;
}

export type FilterAllOtions = DataPagition &
  FilterReceptionPagitionType &
  FilterQueuePagitionType &
  FilterHistoryPagitionType &
  FilterReserveType;

export type FilterAllSupportOtions = FilterSupportPagitionType &
  FilterSupportReceptionPagitionType &
  FilterSupportQueueType &
  FilterSupportHistoryType &
  FilterSupportTreatSetType;
