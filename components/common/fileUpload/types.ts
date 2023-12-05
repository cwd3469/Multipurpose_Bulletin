import { Dispatch, SetStateAction } from 'react';

export interface WMultiDragDrop {
  fileUpLoad: (file: File[], uidList?: UidList[], max?: number) => void;
  files: File[];
  setFileList?: Dispatch<SetStateAction<File[]>>;
  label?: string;
  target?: string;
  multi: boolean;
  limit?: number;
}

export interface UidList {
  id: string;
  src?: string;
  index: number;
  type: string;
  url: string;
  sort?: number;
}
export interface UlidList {
  id: string;
  index: number;
  type: string;
  url: string;
}
