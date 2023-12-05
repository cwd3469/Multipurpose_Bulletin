import WCopyButton from '@components/common/buttons/WCopyButton';
import {
  Box,
  Grid,
  Stack,
  SxProps,
  Theme,
  Typography,
  styled,
} from '@mui/material';

export const WModalContentsBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#ebeced',
  padding: '0.813em',
  lineHeight: '1.375em',
  borderRadius: '6px',
  color: '#666666',
}));
export const WModalContentsGrid = styled(Stack)(({ theme }) => ({
  backgroundColor: '#f8f8f8',
  padding: '2.500em 2.500em 2.000em',
  gap: '2.500em',
  borderRadius: '0.750em',
}));
export const WModalContentsLine = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#ccc',
  height: '1px',
}));

const WModalContentsSubTitle = (props: { subTitle?: string | JSX.Element }) => {
  const { subTitle } = props;
  if (typeof subTitle === 'undefined') return <></>;
  if (typeof subTitle === 'string')
    return (
      <Stack gap="2px" className="contents-subtitle">
        {subTitle.split('\n').map((item, index) => {
          return <Typography key={index}>{item}</Typography>;
        })}
      </Stack>
    );
  return subTitle;
};

const WModalContentsField = (props: {
  title: string;
  contants: string;
  copyButton?: boolean;
  require?: boolean;
  unchangeable?: boolean;
  subTitle?: string | JSX.Element;
  initInput?: JSX.Element;
  sx?: SxProps<Theme>;
}) => {
  const {
    title,
    contants,
    unchangeable,
    initInput,
    sx,
    copyButton,
    require,
    subTitle,
  } = props;
  const btnStyle = {
    padding: '10px',
    fontSize: '14px',
    lineHeight: '1',
  };
  return (
    <Stack gap="16px" sx={sx}>
      <Grid container alignItems="center" gap="8px">
        <Typography
          variant="subtitle1"
          fontWeight="600"
          color="#3c3d47"
          className="contents-title"
        >
          {title}
          {require && (
            <span
              style={{ color: '#4AC6FF', fontSize: '16px', fontWeight: '400' }}
              className="contents-require"
            >
              {' (필수)'}
            </span>
          )}
          {unchangeable && (
            <span
              style={{ color: '#ed271e' }}
              className="contents-unchangeable"
            >
              {' (변경 불가)'}
            </span>
          )}
        </Typography>
        {copyButton && <WCopyButton copyTxt={contants} sx={btnStyle} />}
        <WModalContentsSubTitle subTitle={subTitle} />
      </Grid>
      {initInput ? (
        initInput
      ) : (
        <WModalContentsBox className="contents-box">
          {contants}
        </WModalContentsBox>
      )}
    </Stack>
  );
};

export default WModalContentsField;
