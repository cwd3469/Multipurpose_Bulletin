import {
  WAlertProps,
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

type WAlertModalProps = WAlertProps & WModalProps;

const WAlertModal = (props: WAlertModalProps) => {
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
    bgDisable,
    activeOn,
    closeBtnOn,
    titleSx,
    style,
    childrenHeader,
    childrenAction,
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
    childrenAction,
    mode: 'alert',
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

export default WAlertModal;
