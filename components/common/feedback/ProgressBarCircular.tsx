import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const WCircularProgress = styled(CircularProgress)(({ theme }) => ({
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#0acf83',
    transition: 'transform 10s ease-in-out',
  },
}));

const ProgressBarCircular = () => {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <WCircularProgress size={100} />
    </Box>
  );
};

export default ProgressBarCircular;
