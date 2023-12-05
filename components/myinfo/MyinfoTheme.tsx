import { Stack, styled } from '@mui/material';

export const DisabledBox = styled(Stack)(({ theme }) => ({
  height: '160px',
  borderRadius: '6px',
  backgroundColor: '#f8f8f8',
  padding: '20px',
  color: '#575f6a',
  fontSize: '16px',
  letterSpacing: '-0.32px',
  gap: '24px',
}));
