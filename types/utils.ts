import { ErrorType } from './signin';

export interface ValidOnlyErr {
  txt: string;
  error:
    | React.Dispatch<React.SetStateAction<ErrorType>>
    | ((props: ErrorType) => void);
}

export interface ValidationNullInterface extends ValidOnlyErr {
  name: string;
}

export interface ValidationLengthInterface extends ValidOnlyErr {
  length: number;
}

export interface ValidInterface extends ValidOnlyErr {
  pass: React.Dispatch<React.SetStateAction<string>> | ((txt: string) => void);
}

export interface ValidlengErr extends ValidOnlyErr {
  num: number;
}

export interface ValidationFreePass {
  txt: string;
  num: number;
  pass: React.Dispatch<React.SetStateAction<string>> | ((txt: string) => void);
}

export type ValidImage = { file: File; callback: () => void };

export type ValidMethod =
  | ValidInterface
  | ValidOnlyErr
  | ValidationFreePass
  | ValidlengErr
  | ValidImage;
