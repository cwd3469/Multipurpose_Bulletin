import { AlertColor, Breakpoint, SxProps, Theme } from '@mui/material';

export interface WAlertProps {
  btnTitle?: string;
  activeOn?: boolean;
  btnTextColor?: string;
  disabled?: boolean;
  handleEvent?: () => void;
  onAlert?: boolean;
  setAlert?: boolean;
  severity?: AlertColor;
  msg?: string;
}
export interface WConfirmProps extends WAlertProps {
  closeBtnTitle?: string;
  closeBtnColor?: string;
  closeBtnEvent?: () => void;
}

export type WModalCloseType = {
  handleClose?: () => void;
  childrenAction?: JSX.Element | JSX.Element[];
  closeBtnOn?: boolean;
};

export type WModalFooterProps = WConfirmProps &
  WModalCloseType & {
    mode: 'alert' | 'confirm';
  };

export type WModalHeadProps = {
  title?: string;
  subTitle?: string | JSX.Element;
  titleSx?: SxProps<Theme>;
  childrenHeader?: JSX.Element;
};

export type WModalProps = WModalHeadProps &
  WModalCloseType & {
    open: boolean;
    children: JSX.Element | JSX.Element[];
    maxWidth?: Breakpoint;
    bgDisable?: boolean;
    style?: SxProps<Theme>;
  };

export interface ToastType {
  type: AlertColor;
  msg: string;
}

export interface WSnackBarType extends ToastType {
  open: boolean;
  close: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

export interface UseToastInterface {
  on: (msg: string, type: AlertColor) => void;
}

export interface WOptionType {
  id: string;
  name: string;
}

export type WAlertInfo = {
  msg?: string;
  on?: boolean;
  severity?: AlertColor;
};
