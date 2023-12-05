import { Button, styled } from '@mui/material';

export const DoctorAccountButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#fff',
  width: '179px',
  padding: '10px',
  height: '42px',
  border: '1.5px solid #4ac6ff',
  fontSize: '16px ',
  fontWeight: '600',
  borderRadius: '6px',
  gap: '4px',
}));

export const DoctorDetailButton = styled(Button)(({ theme }) => ({
  minWidth: '90px',
  fontSize: '12px',
  letterSpacing: '-1px',
  fontWeight: '400',
  border: '1px solid #e0e1e2',
  borderRadius: '6px',
}));
