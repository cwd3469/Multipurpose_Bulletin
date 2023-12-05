import MedicalSupportInfoDetailPage from '@components/medicalSupportInfo/MedicalSupportInfoDetailPage';
import { MedicalSupportProvider } from '@components/medicalSupportMgt/contexts/MedicalSupportContext';
import { Gnb } from '@components/common/layout/gnb/Gnb';
import { useRouter } from 'next/router';

const DoctorInfoDetail = () => {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <MedicalSupportProvider>
      <>
        <Gnb />
        {userId ? (
          <MedicalSupportInfoDetailPage userId={userId as string} />
        ) : (
          ''
        )}
      </>
    </MedicalSupportProvider>
  );
};

export default DoctorInfoDetail;
