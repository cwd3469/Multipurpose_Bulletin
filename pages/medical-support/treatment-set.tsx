import { SupportTreatFilterProvider } from '@components/supportTreatmentSet/contexts/SupportTreatFilterContext';
import SupportTreatmentSetPage from '@components/supportTreatmentSet/SupportTreatmentSetPage';
import { Gnb } from '@components/common/layout/gnb/Gnb';

const TreatmentSet = () => {
  return (
    <SupportTreatFilterProvider>
      <Gnb />
      <SupportTreatmentSetPage />
    </SupportTreatFilterProvider>
  );
};

export default TreatmentSet;
