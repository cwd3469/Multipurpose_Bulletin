import { ProcessType } from 'types/signin';
import SigninFirstChangePw from '@components/auth/signin/modal/SigninFirstChangePw';
import SigninExcessChangePw from '@components/auth/signin/modal/SigninExcessChangePw';

const SigninPwChangeProcess = (props: ProcessType) => {
  const { label, open, handleClose, position, tokenList } = props;

  switch (label) {
    case 'first':
      return (
        <SigninFirstChangePw
          open={open}
          handleClose={handleClose}
          tokenList={tokenList}
        />
      );
    case 'excess':
      return (
        <SigninExcessChangePw
          open={open}
          handleClose={handleClose}
          tokenList={tokenList}
        />
      );
    default:
      return <></>;
  }
};

export default SigninPwChangeProcess;
