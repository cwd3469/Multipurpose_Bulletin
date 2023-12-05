import { Box, Stack, styled } from '@mui/material';

export const SigninLayout = styled(Stack)(({ theme }) => ({
  width: '580px',
  height: '800px',
  backgroundColor: '#fff',
  padding: '60px 0px 33px',
  borderRadius: '12px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  alignItems: 'center',
}));
