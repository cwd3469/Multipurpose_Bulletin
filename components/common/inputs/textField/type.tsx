import { ErrorType } from "types/signin";


export interface WTextFieldModulesType {
  state: string;
  setState: (txt: string, keyId: string) => void;
  keyId: string;
  error: ErrorType;
  setError: (errMsg: ErrorType, keyId: string) => void;
  errorMsg?: string;
  placeholder?: string;
  disabled?: boolean;
}
