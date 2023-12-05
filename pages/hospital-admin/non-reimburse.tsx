import { NonReimburseFilterProvider } from '@components/nonReimburse/contexts/NonReimburseFilterContext';
import NonReimbursePage from '@components/nonReimburse/NonReimbursePage';
import { Gnb } from '@components/common/layout/gnb/Gnb';

const NonReimbursement = () => {
  return (
    <NonReimburseFilterProvider>
      <>
        <Gnb />
        <NonReimbursePage />
      </>
    </NonReimburseFilterProvider>
  );
};

export default NonReimbursement;
