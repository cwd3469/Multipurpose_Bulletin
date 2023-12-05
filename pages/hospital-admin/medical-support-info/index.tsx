import MedicalSupportInfoPage from '@components/medicalSupportInfo/MedicalSupportInfoPage';
import { Gnb } from '@components/common/layout/gnb/Gnb';

const MedicalSupportInfo = () => {
  return (
    <div>
      {' '}
      <Gnb />
      <MedicalSupportInfoPage />
    </div>
  );
};

export default MedicalSupportInfo;
