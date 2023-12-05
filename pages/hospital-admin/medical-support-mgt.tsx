import { MedicalSupportProvider } from '@components/medicalSupportMgt/contexts/MedicalSupportContext';
import MedicalSupportMgtPage from '@components/medicalSupportMgt/MedicalSupportMgtPage';
import { Gnb } from '@components/common/layout/gnb/Gnb';

const MedicalSupportMgt = () => {
  return (
    <MedicalSupportProvider>
      <>
        <Gnb />
        <MedicalSupportMgtPage />
      </>
    </MedicalSupportProvider>
  );
};

export default MedicalSupportMgt;
