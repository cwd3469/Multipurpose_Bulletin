import { Button, styled, Box } from '@mui/material';
import Image from 'next/image';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const ModalButton = styled(Button)(({ theme }) => ({
  width: '50%',
  marginLeft: '0px !important',
  borderRadius: '0px',
  padding: '25px',
  ...theme.typography.h5,
  fontWeight: '400',
  lineHeight: '1.2',
  '&.closeBtn': {
    backgroundColor: '#999',
    color: '#fff',
  },
  '&.actionBtn': {
    border: '0px',
    boxShadow: 'none',
    backgroundColor: '#c1c1c1',
    color: '#fff',
    '&.active': {
      backgroundColor: '#4ac6ff',
    },
  },
  '&.Mui-disabled': {
    backgroundColor: '#d8d8d8 !important',
    color: '#999',
  },
}));

export const WDialogClassName = (params: { bgDisable?: boolean }) => {
  const { bgDisable } = params;
  return bgDisable ? 'WDialog-bg-disabled' : undefined;
};

export const WDialog = styled(Dialog)(({ theme }) => ({
  '&.WDialog-bg-disabled': {
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  },
  '& .MuiPaper-root': {
    borderRadius: '8px',
  },

  '& .MuiBackdrop-root': {
    transition: 'all 0.5s !important',
  },
}));

export const WDialogActions = styled(DialogActions)(({ theme }) => ({
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: '0px',
  gap: '0px',
  '& :not(:first-of-type)': {
    marginLeft: '0px',
  },
}));

export const WDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: '0px',
  position: 'relative',
}));

export const WDialogTitle = styled(DialogTitle)(({ theme }) => ({
  ...theme.typography.h5,
  textAlign: 'center',
  padding: '0px',
}));

export const WDialogContentText = styled(DialogContentText)(({ theme }) => ({
  ...theme.typography.body2,
  fontWeight: '400',
  textAlign: 'center',
}));

export const WDialogLayout = styled(Box)(({ theme }) => ({
  padding: '0px 25px',
}));

export const WModalClose = (props: { onClick?: () => void }) => {
  const { onClick } = props;
  return (
    <Button
      color="info"
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '32px ',
        right: '40px',
        zIndex: '99',
        padding: '0px',
        minWidth: '0px',
      }}
    >
      <Image
        src={'/assets/icons/closeModal.svg'}
        alt="닫기 버튼"
        width={24}
        height={24}
      ></Image>
    </Button>
  );
};
