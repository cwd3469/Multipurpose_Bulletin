export type TimeType = '10' | '30' | '60' | 'disable';
export type PeriodType = '30' | '60' | '90' | '100' | '365';

export interface RadioGroupListType {
  data: string;
  name: string;
  notRecommended?: boolean;
}

export interface SecuritySetCheckBox {
  data: RadioGroupListType[];
  onChangeValue: (value: string) => void;
  value: TimeType | PeriodType | string;
}
