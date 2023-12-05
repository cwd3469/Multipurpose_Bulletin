import { ReceptionFilterProvider } from '@components/reception/contexts/ReceptionFilterContext';
import ReceptionPage from '@components/reception/ReceptionPage';
import { Gnb } from '@components/common/layout/gnb/Gnb';

const Reception = () => {
  return (
    <ReceptionFilterProvider>
      <Gnb />
      <ReceptionPage />
    </ReceptionFilterProvider>
  );
};

export default Reception;
