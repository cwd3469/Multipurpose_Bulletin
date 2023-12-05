import type { NextPage } from 'next';
import React, { useContext, useEffect } from 'react';
import SigninPage from '@components/auth/signin/SigninPage';
import { useRouter } from 'next/router';
import UserInfoContext from '@hooks/contexts/UserInfoContext';

const Signin: NextPage = () => {
  const { deleteToken } = useContext(UserInfoContext);
  const router = useRouter();
  const { hospitalCode } = router.query;
  useEffect(() => {
    deleteToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <SigninPage hospitalCode={hospitalCode as string | undefined} />;
};
export default Signin;
