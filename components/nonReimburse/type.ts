import { ModalType } from 'types/signin';
import { DataPagition } from 'types/table';

export interface NoneReimburseType {
  id: number;
  date: string;
  time: string;
  cost: string;
  case: string;
}

export type ModalCase = 'modify' | 'registration' | 'delete';

export interface NonReimbursementType extends ModalType {
  modalCase: ModalCase;
}

export interface NonReimburseModifyType extends ModalType {
  id: string;
}

export interface NonReimburseModifyTemplatesType
  extends NonReimburseModifyType {
  data: NoneReimburseDto;
  id: string;
}

export interface UseNonReimburse {
  data?: NoneReimburseDto;
}

export interface CategoryDateType {
  categoryName: string;
  categoryAmount: string;
}

//============DTO==========//
export interface NoneReimburseDto {
  nameKo: string;
  amount: number;
}

export interface NoneReimburseModifyDto extends NoneReimburseDto {
  nonReimbursementItemUlid: string;
}
export interface NoneReimbursePageDto {
  amount: number;
  createdAt: string;
  nameKo: string;
  nonReimbursementItemUlid: string;
}
