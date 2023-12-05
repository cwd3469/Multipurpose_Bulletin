import { DoctorInfoProvider } from '@components/doctorInfo/contexts/DoctorInfoContext';
import DoctorInfoDetailPage from '@components/doctorInfo/DoctorInfoDetailPage';
import { Gnb } from '@components/common/layout/gnb/Gnb';
import { useRouter } from 'next/router';

const DoctorInfoDetail = () => {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <DoctorInfoProvider>
      <>
        <Gnb />
        {userId ? <DoctorInfoDetailPage userId={userId as string} /> : ''}
      </>
    </DoctorInfoProvider>
  );
};

export default DoctorInfoDetail;
