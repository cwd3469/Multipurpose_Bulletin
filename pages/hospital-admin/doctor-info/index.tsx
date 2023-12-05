import { DoctorInfoProvider } from '@components/doctorInfo/contexts/DoctorInfoContext';
import DoctorInfoPage from '@components/doctorInfo/DoctorInfoPage';
import { Gnb } from '@components/common/layout/gnb/Gnb';

const DoctorInfo = () => {
  return (
    <DoctorInfoProvider>
      <Gnb />
      <DoctorInfoPage />
    </DoctorInfoProvider>
  );
};

export default DoctorInfo;
