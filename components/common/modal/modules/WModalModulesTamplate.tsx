import { Grid, Stack } from '@mui/material';
import { WModalFooterProps, WModalHeadProps } from 'types/common';
import {
  ModalButton,
  WDialogActions,
  WDialogContent,
  WDialogContentText,
  WDialogLayout,
  WDialogTitle,
  WModalClose,
} from './WModalModules';
import WAlert from '../WAlert';

const WModalSubTitle = (props: { subTitle?: string | JSX.Element }) => {
  const { subTitle } = props;
  if (typeof subTitle === 'undefined') return <></>;
  if (typeof subTitle === 'string')
    return (
      <Stack gap="2px" className="WModal-subtitle">
        {subTitle.split('\n').map((item, index) => {
          return <WDialogContentText key={index}>{item}</WDialogContentText>;
        })}
      </Stack>
    );
  return <div className="WModal-subtitle">{subTitle}</div>;
};

export const WModalHead = (props: WModalHeadProps) => {
  const { title, subTitle, titleSx, childrenHeader } = props;
  if (!title) return <></>;

  return (
    <Stack
      gap="8px"
      padding="50px 40px 48px"
      sx={{
        position: 'relative',
        ...titleSx,
      }}
    >
      {title ? <WDialogTitle>{title}</WDialogTitle> : ''}
      <WModalSubTitle subTitle={subTitle} />
      {childrenHeader}
    </Stack>
  );
};
export const WModalBody = (props: { children: JSX.Element | JSX.Element[] }) => {
  const { children } = props;
  return (
    <WDialogContent>
      <WDialogLayout>{children}</WDialogLayout>
    </WDialogContent>
  );
};
export const WModalFooter = (props: WModalFooterProps) => {
  const {
    activeOn,
    closeBtnTitle,
    childrenAction,
    closeBtnEvent,
    handleClose,
    disabled,
    handleEvent,
    btnTitle,
    closeBtnOn,
    mode,
    severity,
    msg,
    onAlert,
    setAlert,
  } = props;
  return (
    <WDialogActions>
      {setAlert && (
        <Stack width="100%" padding="0px 40px 60px">
          {onAlert && (
            <WAlert severity={severity} variant="standard">
              {msg}
            </WAlert>
          )}
        </Stack>
      )}

      {childrenAction}
      <Grid container>
        {mode === 'confirm' ? (
          <ModalButton
            className="closeBtn"
            variant="contained"
            color="info"
            onClick={closeBtnEvent ? closeBtnEvent : handleClose}
          >
            {closeBtnTitle ? closeBtnTitle : '닫기'}
          </ModalButton>
        ) : (
          <></>
        )}
        <ModalButton
          className={`actionBtn ${activeOn ? 'active' : ''} ${
            typeof disabled !== 'undefined' ? 'active' : ''
          }`}
          disabled={disabled ? disabled : false}
          variant="text"
          color="info"
          onClick={handleEvent ? handleEvent : handleClose}
          sx={{
            width: mode == 'confirm' ? '50%' : '100%',
          }}
        >
          {btnTitle ? btnTitle : '확인'}
        </ModalButton>
      </Grid>
      {closeBtnOn ? <WModalClose onClick={handleClose} /> : ''}
    </WDialogActions>
  );
};
