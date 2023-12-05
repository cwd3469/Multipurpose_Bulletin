import MyinfoSupportPage from '@components/myinfo/MyinfoSupportPage';
import { Gnb } from '@components/common/layout/gnb/Gnb';

const Mypage = () => {
  return (
    <div>
      {' '}
      <Gnb />
      <MyinfoSupportPage />
    </div>
  );
};

export default Mypage;
