import { Dispatch, SetStateAction } from 'react';

export interface ErrorType {
  msg: string;
  boo: boolean;
}

export interface TimerInterface {
  action: () => void;
  time: number;
  seconds?: number;
}

export interface TimerComponentsTyep extends TimerInterface {
  resend: () => void;
  isReStart?: boolean;
  showTime?: {
    minutes: number;
    seconds: number;
  };
}

export type SigninState =
  | 'disable'
  | 'dormant'
  | 'not-approved'
  | 'first'
  | 'excess'
  | 'success';

export type PermissionState = 'medical' | 'assistance' | 'root';

export type ChangePwLabel = 'first' | 'excess' | 'idRecovery';

export type ModalLabel = 'global' | 'alert' | 'confirm';

export interface SigninStateType {
  state: string;
  setState: (txt: string, keyId: string) => void;
  keyId: string;
  error: ErrorType;
  setError: (errMsg: ErrorType, keyId: string) => void;
  errorMsg?: string;
  placeholder?: string;
}

export interface CloseType {
  handleClose: () => void;
}

export interface ModalType extends CloseType {
  open: boolean;
}

export interface Disable extends ModalType {
  position: string;
}

export interface PwChangeType extends ModalType {
  label: ChangePwLabel;
}

export interface ProcessType extends ModalType {
  label: SigninState;
  position: string;
  tokenList: { accessToken: string; refreshToken: string };
  needPasswordUpdate?: boolean;
}

export interface HocMobileAuthInterface extends ModalType {
  authValue: string;
  mobileValue: string;
  modalOn: boolean;
  authDisabled: boolean;
  numDisabled: boolean;
  mobileError: ErrorType;
  authError: ErrorType;
  authOnChange: () => void;
  mobileAuthNumPost: () => void;
  mobileOnChange: () => void;
  handleCloseAll: () => void;
  onTimerDisabled: () => void;
  errorToast: (msg: string) => void;
  setModalOn: Dispatch<SetStateAction<boolean>>;
  focusOutEvent: () => void;
  setAuthDisabled: Dispatch<SetStateAction<boolean>>;
}

export interface HocTermsInterface extends ModalType {
  handleCloseAll: () => void;
  handleEvent: () => void;
  onCheckBox: (boo: boolean, setBoo: Dispatch<SetStateAction<boolean>>) => void;
  allAgreeCheck: () => void;
  disabled: boolean;
  modalOn: boolean;
  all: boolean;
  agreeTermA: boolean;
  agreeTermB: boolean;
  agreeAdvertising: boolean;
  setAgreeTermA: Dispatch<SetStateAction<boolean>>;
  setAgreeTermB: Dispatch<SetStateAction<boolean>>;
  setAgreeAdvertising: Dispatch<SetStateAction<boolean>>;
}

export interface SigninErr {
  [key: string]: ErrorType;
  hospitalCode: ErrorType;
  accountId: ErrorType;
  password: ErrorType;
}

export interface UserInfoInterface {
  accountId: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  hasExpiredTime: boolean;
  accountType: string;
  credentialsNonExpired: boolean;
  disabledReason: string;
  enabled: boolean;
  exp: number;
  hospitalUlid: string;
  iat: number;
  iss: string;
  mobileNum: string;
  nameKo: string;
  needResetPassword: boolean;
  roles: string[];
  service: string;
  sub: string;
  ulid: string;
  useEmr: boolean;
  hospitalLevel: number;
}

//==== api dto =====//
/**로그인 */
export interface SigninDto {
  [key: string]: string;
  hospitalCode: string;
  accountId: string;
  password: string;
}
/**리프레쉬 토큰 */
export interface RefreshTokenDto {
  refreshToken: string;
}

/**계정 찾기 비밀번호 입력 */
export interface FindAccountPasswordDto {
  accountUlid: string;
  verificationCode: string;
  password: string;
  reenterPassword: string;
}

/**계정찾기 모바일 인증 입력 */
export interface MobileNumDto {
  mobileNum: string;
}
/**계정찾기 모바일 인증 입력 */
export interface HospitalCodeDto {
  hospitalCode: string;
}

/**계정찾기 점유 요청 */
export interface CommonVerifyCodeDto {
  mobileNum: string;
  code: string;
}

/**계정찾기 점유 요청 */
export interface VerifyCodeDto extends CommonVerifyCodeDto {
  hospitalCode: string;
}
/**계정찾기 점유 응답 */
export interface VerifyRes {
  accountUlid: string;
  maskedAccountId: string;
  verificationCode: string;
}
