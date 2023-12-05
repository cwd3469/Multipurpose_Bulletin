import { useContext } from 'react';
import UserInfoContext from './contexts/UserInfoContext';

const useAuth = () => {
  return useContext(UserInfoContext);
};

export default useAuth;
