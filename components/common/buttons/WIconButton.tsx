import { Button, ButtonProps, styled } from '@mui/material';

export const WIconButton = styled((props: ButtonProps) => (
  <Button {...props} variant="contained" color="info" />
))(({ theme }) => ({
  ...theme.typography.body1,
  fontWeight: '600',
  backgroundColor: '#fff',
  border: '1px solid #949494',
  color: '#949494',
  padding: '8px 15px',
  borderRadius: '6px',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#eee',
    boxShadow: 'none',
  },
  '& .MuiButton-startIcon': {
    marginRight: '4px',
  },
}));
