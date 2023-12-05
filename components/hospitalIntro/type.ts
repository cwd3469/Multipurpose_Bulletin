import { UidList } from '@components/common/fileUpload/types';

export interface Time {
  start: string;
  end: string;
}
export type AddresData = {
  address: string;
  zipCode: string;
};

export type TimeDate = { start: Date; end: Date };
export type LunchTIme = { startTime: string; endTime: string };
export type BaseDataType = LunchTIme | string | boolean | AddresData;

export interface Week {
  ko: string;
  time: TimeDate;
  night: boolean;
  open: boolean;
}

export interface BaseData {
  [key: string]: BaseDataType;
  time: LunchTIme;
  phoneNumber: string;
  addresData: AddresData;
  parking: boolean;
  details: string;
  introductions: string;
}

export interface WeekList {
  [key: string]: Week;
  mon: Week;
  tue: Week;
  wed: Week;
  thu: Week;
  fri: Week;
  set: Week;
  sun: Week;
  holiday: Week;
}

export interface HospitalIntroQueryData {
  profileUlid: string;
  hospitalUlid: string;
  imgFile: Promise<File | undefined>[];
  imgUid: FileUid[];
  logoUild: FileUid;
  logoFile?: Promise<File | undefined>;
  base: BaseData;
  week: WeekDataBundle;
}
export interface HospitalIntroPageProps {
  queryData?: HospitalIntroQueryData;
}
export interface HospitalIntroSetPageType {
  queryData?: HospitalIntroGetDto;
}

export interface HospitalIntro {
  weeks: WeekList;
  images?: File[] | null;
  logo?: File | null;
  baseData: BaseData;
  intro: string;
}

export interface SetWeekOnChange {
  w: string;
  ko: string;
  time: TimeDate;
  night: boolean;
  open: boolean;
}
export interface FileUid {
  fileUlid: string;
  sort: number;
}

export interface FileDto extends FileUid {
  fileUrl: string;
}

export interface TimeDateDto {
  startTime: string;
  endTime: string;
}

export interface WeekendDto {
  openTime: string;
  closeTime: string;
  hasOperation: boolean;
  hasNightOperation: boolean;
}
export type HospitalInfoData = {
  hospitalUlid: string;
};

export type HospitalValueType =
  | string
  | WeekendDto
  | boolean
  | FileUid
  | TimeDateDto
  | FileUid[];

export interface HospitalIntroDto {
  [key: string]: HospitalValueType;
  hospitalUlid: string;
  introductions: string;
  hospitalPhoneNum: string;
  addressKo: string;
  addressDetailKo: string;
  zipCode: string;
  canParking: boolean;
  mondayOperation: WeekendDto;
  tuesdayOperation: WeekendDto;
  wednesdayOperation: WeekendDto;
  thursdayOperation: WeekendDto;
  fridayOperation: WeekendDto;
  saturdayOperation: WeekendDto;
  sundayOperation: WeekendDto;
  holidayOperation: WeekendDto;
  lunchTIme: TimeDateDto;
  logoImage: FileUid;
  introductionsImages: FileUid[];
}
export interface HospitalIntroGetDto {
  hospitalUlid: string;
  introductions: string;
  hospitalPhoneNum: string;
  addressKo: string;
  addressDetailKo: string;
  zipCode: string;
  canParking: boolean;
  mondayOperation: {
    openTime: string;
    closeTime: string;
    hasOperation: boolean;
    hasNightOperation: boolean;
  };
  tuesdayOperation: {
    openTime: string;
    closeTime: string;
    hasOperation: boolean;
    hasNightOperation: boolean;
  };
  wednesdayOperation: {
    openTime: string;
    closeTime: string;
    hasOperation: boolean;
    hasNightOperation: boolean;
  };
  thursdayOperation: {
    openTime: string;
    closeTime: string;
    hasOperation: boolean;
    hasNightOperation: boolean;
  };
  fridayOperation: {
    openTime: string;
    closeTime: string;
    hasOperation: boolean;
    hasNightOperation: boolean;
  };
  saturdayOperation: {
    openTime: string;
    closeTime: string;
    hasOperation: boolean;
    hasNightOperation: boolean;
  };
  sundayOperation: {
    openTime: string;
    closeTime: string;
    hasOperation: boolean;
    hasNightOperation: boolean;
  };
  holidayOperation: {
    openTime: string;
    closeTime: string;
    hasOperation: boolean;
    hasNightOperation: boolean;
  };
  lunchTIme: {
    startTime: string;
    endTime: string;
  };
  logoImage: {
    fileUlid: string;
    fileUrl: string;
    sort: number;
  };
  introductionsImages: FileDto[];
}

export interface WeekDataBundle {
  [key: string]: WeekendDto;
  mon: WeekendDto;
  tue: WeekendDto;
  wed: WeekendDto;
  thu: WeekendDto;
  fri: WeekendDto;
  set: WeekendDto;
  sun: WeekendDto;
  holiday: WeekendDto;
}

export interface ApiParam {
  formData: FormData;
  callback: () => void;
}

export interface SetIntroImgPickerType {
  label: string;
  subLabel: string;
  multi: boolean;
  target: string;
  limit?: number;
  modifyFile: File[];
  onDeleteLogoUid: () => void;
  fileUpLoad: (file: File[], UidList?: UidList[]) => void;
}
