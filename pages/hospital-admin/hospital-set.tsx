import { HospitalInfoProvider } from '@components/hospitalIntro/contexts/HospitalInfoContext';
import { HospitalInfoMultiProvider } from '@components/hospitalIntro/contexts/HospitalInfoMultiContext';
import HospitalIntroSetPage from '@components/hospitalIntro/HospitalIntroSetPage';
import { Gnb } from '@components/common/layout/gnb/Gnb';

const HospitalIntroSet = () => {
  return (
    <HospitalInfoMultiProvider>
      <HospitalInfoProvider>
        <Gnb />
        <HospitalIntroSetPage />
      </HospitalInfoProvider>
    </HospitalInfoMultiProvider>
  );
};

export default HospitalIntroSet;
