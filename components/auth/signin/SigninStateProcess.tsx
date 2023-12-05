import { ProcessType } from 'types/signin';
import SigninDisable from '@components/auth/signin/modal/SigninDisable';
import SigninDormant from '@components/auth/signin/modal/SigninDormant';
import SigninNotApproved from '@components/auth/signin/modal/SigninNotApproved';
import SigninMobileAuth from './SigninMobileAuth';

const SigninStateProcess = (props: ProcessType) => {
  const { label, open, handleClose, position, tokenList, needPasswordUpdate } =
    props;

  switch (label) {
    case 'disable':
      return (
        <SigninDisable
          open={open}
          handleClose={handleClose}
          position={position}
        />
      );
    case 'dormant':
      return <SigninDormant open={open} handleClose={handleClose} />;
    case 'not-approved':
      return <SigninNotApproved open={open} handleClose={handleClose} />;
    default:
      return (
        <SigninMobileAuth
          open={open}
          handleClose={handleClose}
          tokenList={tokenList}
          needPasswordUpdate={needPasswordUpdate}
        />
      );
  }
};

export default SigninStateProcess;
