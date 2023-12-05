import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';

export const WLinearProgress = styled(LinearProgress)(({ theme }) => ({
  backgroundColor: '#dddddd',
  height: '10px',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#0acf83',
    transition: 'transform 10s ease-in-out',
  },
}));

const ProgressBarIndeterminate = (props: LinearProgressProps) => {
  return (
    <Box sx={{ width: '100%', position: 'absolute', left: '0px', top: '0px' }}>
      <WLinearProgress {...props} />
    </Box>
  );
};

export default ProgressBarIndeterminate;
