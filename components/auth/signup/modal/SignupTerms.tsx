import WAlertModal from '@components/common/modal/WAlertModal';
import { Box, Stack, Typography } from '@mui/material';
import { ModalType } from 'types/signin';

interface SignupTermsProps extends ModalType {
  html?: JSX.Element;
  title: string;
}

const SignupTerms = (props: SignupTermsProps) => {
  const { open, handleClose, html, title } = props;

  return (
    <WAlertModal
      open={open}
      handleClose={handleClose}
      maxWidth="xl"
      activeOn
      btnTextColor="#999"
      title={title}
    >
      <Stack alignItems={'center'} padding="0px 40px">
        <Box
          width={'640px'}
          height={'420px'}
          sx={{ overflowY: 'scroll' }}
          padding={'10px'}
        >
          {html}
        </Box>
        <Box height="41px" />
      </Stack>
    </WAlertModal>
  );
};

export default SignupTerms;
