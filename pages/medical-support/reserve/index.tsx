import SupportReservePage from '@components/reserve/SupportReservePage';
import { ReserveFilterProvider } from '@components/reserve/contexts/ReserveContext';
import { Gnb } from '@components/common/layout/gnb/Gnb';
import { ReserveModalProvider } from '@components/reserve/hooks/useReserveModal';

const Reserve = () => {
  return (
    <ReserveFilterProvider>
      <ReserveModalProvider>
        <>
          <Gnb />
          <SupportReservePage />
        </>
      </ReserveModalProvider>
    </ReserveFilterProvider>
  );
};

export default Reserve;
