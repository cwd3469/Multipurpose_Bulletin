import { Typography, styled } from '@mui/material';

const WTextError = styled(Typography)(({ theme }) => ({
  ...theme.typography.caption,
  lineHeight: '1',
  padding: '8px 0',
  height: '28px',
  width: '100%',
}));

export { WTextError };
