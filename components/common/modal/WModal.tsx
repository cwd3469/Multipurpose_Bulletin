import { WModalHeadProps, WModalProps } from 'types/common';
import { WModalBody, WModalHead } from './modules/WModalModulesTamplate';
import { WDialog, WModalClose } from './modules/WModalModules';

export const WModal = (props: WModalProps) => {
  const {
    open,
    handleClose,
    children,
    subTitle,
    title,
    maxWidth,
    bgDisable,
    closeBtnOn,
    titleSx,
    style,
    childrenHeader,
  } = props;
  const headProps: WModalHeadProps = {
    title,
    subTitle,
    titleSx,
    childrenHeader,
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
      {closeBtnOn ? <WModalClose onClick={handleClose} /> : ''}
    </WDialog>
  );
};

WModal.defaultProps = {
  open: false,
};

export default WModal;
