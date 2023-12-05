import { SupportReceptionFilterProvider } from '@components/supportReception/contexts/SupportReceptionContext';
import SupportReceptionPage from '@components/supportReception/SupportReceptionPage';
import { Gnb } from '@components/common/layout/gnb/Gnb';

const Reception = () => {
  return (
    <SupportReceptionFilterProvider>
      <div>
        <Gnb />
        <SupportReceptionPage />
      </div>
    </SupportReceptionFilterProvider>
  );
};

export default Reception;
