import UserInfoContext from '@hooks/contexts/UserInfoContext';
import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';

const Home: NextPage = () => {
  const { signOut } = useContext(UserInfoContext);
  useEffect(() => {
    signOut();
  }, [signOut]);

  return <></>;
};

export default Home;
