import {
  WConfirmProps,
  WModalFooterProps,
  WModalHeadProps,
  WModalProps,
} from 'types/common';
import {
  WModalBody,
  WModalFooter,
  WModalHead,
} from './modules/WModalModulesTamplate';
import { WDialog } from '@components/common/modal/modules/WModalModules';
type WConfirmModalProps = WConfirmProps & WModalProps;

export const WConfirmModal = (props: WConfirmModalProps) => {
  const {
    open,
    handleClose,
    children,
    subTitle,
    title,
    maxWidth,
    disabled,
    btnTitle,
    handleEvent,
    closeBtnTitle,
    closeBtnEvent,
    closeBtnOn,
    bgDisable,
    activeOn,
    closeBtnColor,
    titleSx,
    style,
    childrenAction,
    childrenHeader,
    onAlert,
    setAlert,
    severity,
    msg,
  } = props;
  const headProps: WModalHeadProps = {
    title,
    subTitle,
    titleSx,
    childrenHeader,
  };
  const footerProps: WModalFooterProps = {
    activeOn,
    disabled,
    handleEvent,
    handleClose,
    btnTitle,
    closeBtnOn,
    closeBtnColor,
    closeBtnEvent,
    closeBtnTitle,
    childrenAction,
    mode: 'confirm',
    onAlert,
    setAlert,
    severity,
    msg,
  };

  const dialogProps = {
    open,
    maxWidth,
    onClose: handleClose,
    className: bgDisable ? 'WDialog-bg-disabled' : undefined,
    sx: style,
  };

  return (
    <WDialog {...dialogProps}>
      <WModalHead {...headProps} />
      <WModalBody>{children}</WModalBody>
      <WModalFooter {...footerProps} />
    </WDialog>
  );
};

export default WConfirmModal;
