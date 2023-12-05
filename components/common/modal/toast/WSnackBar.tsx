import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import { WSnackBarType, ToastType } from 'types/common';
import { Box, styled, SvgIcon, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

export const WToast = styled(Alert)(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid #999',
  borderWidth: '1px',
  width: '100%',
  borderRadius: '6px',
  padding: '15px 20px',
  height: '70px',
  color: '#000',
  ...theme.typography.body1,
  '&.MuiPaper-root': {
    alignItems: 'center',
  },
  '& .MuiAlert-message': {
    padding: '0px',
    marginLeft: '30px',
  },
  '& .MuiAlert-icon': {
    padding: '0px',
    margin: '0px',
  },
}));

const ErrorIcon = () => {
  return (
    <SvgIcon>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" fill="white" />
        <path
          d="M12 8.99999V11M12 15H12.0101M5.01854 19H18.9815C20.5333 19 21.5028 17.333 20.7268 16L13.7454 3.99999C12.9694 2.66699 11.0306 2.66699 10.2546 3.99999L3.27317 16C2.49723 17.333 3.46665 19 5.01854 19Z"
          stroke="#FC5935"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

const InfoIcon = () => {
  return (
    <SvgIcon>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 16H12V12H11M12 8H12.01M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
          stroke="#4AC6FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export const IconList = (type: AlertColor) => {
  switch (type) {
    case 'success':
      return <CheckIcon fontSize="small" />;
    case 'info':
      return <InfoIcon />;
    case 'warning':
      return <ErrorOutlineOutlinedIcon fontSize="small" />;
    case 'error':
      return <ErrorIcon />;
    default:
      return <CheckIcon fontSize="small" />;
  }
};
export const WToastComponent = (props: ToastType) => {
  const { type, msg } = props;

  return (
    <WToast icon={IconList(type)} variant="outlined" severity={type}>
      <Box sx={{ minWidth: '260px', overflowY: 'hidden' }}>
        {msg.split('\n').map((item, index) => {
          return (
            <Typography lineHeight={'1.2'} key={index} fontSize="14px">
              {item}
            </Typography>
          );
        })}
      </Box>
    </WToast>
  );
};

const WSnackBar = (props: WSnackBarType) => {
  const { open, close, type, msg } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={close}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div>
        <WToastComponent type={type} msg={msg} />
      </div>
    </Snackbar>
  );
};

export default WSnackBar;
