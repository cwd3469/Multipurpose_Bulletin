/** 모바일 인증 레이블 타입*/
export const MOBILE_AUTH_LABEL = {
  LOGIN: 'LOGIN',
  FIND_MEMBER_ACCOUNT: 'FIND_MEMBER_ACCOUNT',
} as const;
type MOBILE_AUTH_LABEL =
  typeof MOBILE_AUTH_LABEL[keyof typeof MOBILE_AUTH_LABEL];

/** 비밀번호 변경 레이블 타입*/
export const CHANGE_PASSWORD_LABEL = {
  INITIAL: 'INITIAL',
  ACCOUNT: 'ACCOUNT',
} as const;
type CHANGE_PASSWORD_LABEL =
  typeof CHANGE_PASSWORD_LABEL[keyof typeof CHANGE_PASSWORD_LABEL];

/** 안내 사항 레이블 타입 */
export const NOTICE_LABEL = {
  DORMANT: 'DORMANT',
  INACTIVE_MANAGE: 'INACTIVE_MANAGE',
  INACTIVE_STAFF: 'INACTIVE_STAFF',
} as const;
type NOTICE_LABEL = typeof NOTICE_LABEL[keyof typeof NOTICE_LABEL];

/**모달 스텝 레이블 타입 */
export const MODAL_STEP_LABEL = {
  MOBILE_AUTH_LOGIN: 'MOBILE_AUTH_LOGIN',
  MOBILE_AUTH_FIND_MEMBER: 'MOBILE_AUTH_FIND_MEMBER',
  CHANGE_PASSWORD_INITIAL: 'CHANGE_PASSWORD_INITIAL',
  CHANGE_PASSWORD_ACCOUNT: 'CHANGE_PASSWORD_ACCOUNT',
  CHANGE_PASSWORD_NOTICE: 'CHANGE_PASSWORD_NOTICE',
  INACTIVE_MANAGE: 'INACTIVE_MANAGE',
  INACTIVE_STAFF: 'INACTIVE_STAFF',
  DORMANT: 'DORMANT',
} as const;
type MODAL_STEP_LABEL = typeof MODAL_STEP_LABEL[keyof typeof MODAL_STEP_LABEL];

export interface ErrorType {
  msg: string;
  boo: boolean;
}

export interface TimerInterface {
  action: () => void;
  time: number;
}

export interface PhoneAuthInterface {
  handleClose: () => void;
  mobileAuthLabel: string | MOBILE_AUTH_LABEL;
  stepOn: (active: string) => void;
}

export interface StepInterface {
  changePasswordLabel: typeof CHANGE_PASSWORD_LABEL | string;
  handleClose: () => void;
}

export interface ModalComponents extends PhoneAuthInterface {
  step: number;
}
