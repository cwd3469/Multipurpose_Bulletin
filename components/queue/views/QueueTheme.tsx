import { Box } from '@mui/material';
import { transTextStateTreat } from '@utils/transtext';

const queueStyle = {
  root: {
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '10px',
  },
  ongoing: {
    color: '#4AC6FF',
    backgroundColor: '#E7F7FF',
  },
  wait: {
    color: '#1AB95E',
    backgroundColor: '#CDF5D8',
  },
  hold: {
    color: '#ff8e4f',
    backgroundColor: '#fff4e4',
  },
};

export const QueueLabel = (props: {
  status: string;
  children: JSX.Element;
}) => {
  const { root, ongoing, wait, hold } = queueStyle;
  const colors =
    props.status === 'IN_TREAT'
      ? ongoing
      : props.status === 'HOLD'
      ? hold
      : wait;

  return <Box sx={{ ...root, ...colors }}>{props.children}</Box>;
};
