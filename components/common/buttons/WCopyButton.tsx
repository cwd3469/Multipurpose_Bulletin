import { Button, styled, SxProps, Theme } from '@mui/material';

const CopyButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#e5e7e9',
  color: '#575f6a',
  fontSize: '10px',
  lineHeight: '1',
  padding: '8px 6px',
  minWidth: 'auto',
  borderRadius: '6px',
  fontWeight: '400',
}));

const WCopyButton = (props: { copyTxt: string; sx?: SxProps<Theme> }) => {
  const onCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };
  return (
    <CopyButton
      color="info"
      onClick={() => onCopy(props.copyTxt)}
      sx={props.sx}
      className="w-copyButton"
    >
      복사하기
    </CopyButton>
  );
};

export default WCopyButton;
