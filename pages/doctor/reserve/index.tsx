import ReservePage from '@components/reserve/ReservePage';
import { ReserveFilterProvider } from '@components/reserve/contexts/ReserveContext';
import { Gnb } from '@components/common/layout/gnb/Gnb';
import { ReserveModalProvider } from '@components/reserve/hooks/useReserveModal';

const Reserve = () => {
  return (
    <ReserveFilterProvider>
      <ReserveModalProvider>
        <>
          <Gnb />
          <ReservePage />
        </>
      </ReserveModalProvider>
    </ReserveFilterProvider>
  );
};

export default Reserve;
