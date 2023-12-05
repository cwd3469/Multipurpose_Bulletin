import { Box, Grid, Stack, Typography } from '@mui/material';
import Input from '@components/common/inputs/Input';
import { ErrorType } from 'types/signin';
interface BusiNumber {
  oneNum: string;
  twoNum: string;
  threeNum: string;
}
const SignBusiNumInput = (props: {
  busErr: ErrorType;
  busiNum: BusiNumber;
  busiNumOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { busErr, busiNum, busiNumOnChange } = props;
  const { oneNum, twoNum, threeNum } = busiNum;

  return (
    <Stack>
      <Grid container justifyContent="space-between" position={'relative'}>
        <Box width="32%">
          <Input
            name="oneNum"
            onChange={busiNumOnChange}
            value={oneNum}
            error={{ msg: '', boo: busErr.boo }}
          />
        </Box>
        <Box width="32%">
          <Input
            name="twoNum"
            onChange={busiNumOnChange}
            value={twoNum}
            error={{ msg: '', boo: busErr.boo }}
          />
        </Box>
        <Box width="32%">
          <Input
            name="threeNum"
            onChange={busiNumOnChange}
            value={threeNum}
            error={{ msg: '', boo: busErr.boo }}
          />
        </Box>
        <div
          style={{
            padding: '6px 0',
            position: 'absolute',
            bottom: '0px',
            left: '0px',
          }}
        >
          <Typography color={busErr.boo ? 'red' : '#515151'} lineHeight="1.2">
            {busErr.msg}
          </Typography>
        </div>
      </Grid>
    </Stack>
  );
};

export default SignBusiNumInput;
