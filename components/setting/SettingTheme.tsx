import { Box, Stack, styled } from '@mui/material';

export const ContentsSection = styled(Stack)(({ theme }) => ({
  gap: '16px',
  '& .MuiGrid-root.body': {
    gap: '12px',
  },
}));

export const ContentsBox = styled(Stack)(({ theme }) => ({
  height: '696px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '40px',
}));
