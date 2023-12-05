import DoctorMgtPage from '@components/doctorMgt/DoctorMgtPage';
import { Gnb } from '@components/common/layout/gnb/Gnb';

const DoctorMgt = () => {
  return (
    <div>
      <Gnb />
      <DoctorMgtPage />
    </div>
  );
};

export default DoctorMgt;
