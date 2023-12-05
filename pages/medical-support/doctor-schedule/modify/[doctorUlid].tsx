import { Gnb } from '@components/common/layout/gnb/Gnb';
import { ScheduleModalStateProvider } from '@components/schedule/hooks/useScheduleModal';
import { ScheduleSelectMonthProvider } from '@components/schedule/contexts/ScheduleSelectMonth';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import { getServerSideScheduleInitData } from '../[doctorUlid]';
import ScheduleModifyPage from '@components/schedule/ScheduleModifyPage';

const DoctorManagement = () => {
  return (
    <ScheduleSelectMonthProvider>
      <ScheduleModalStateProvider>
        <>
          <Gnb />
          <ScheduleModifyPage />
        </>
      </ScheduleModalStateProvider>
    </ScheduleSelectMonthProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = context?.req?.cookies.accessToken;
  const productId = context.params?.doctorUlid as string;
  const queryClient = new QueryClient();
  const { serverInfoSSR, key } = getServerSideScheduleInitData({ productId, accessToken });
  await queryClient.prefetchQuery(key, serverInfoSSR);
  const init = dehydrate(queryClient);
  return {
    props: {
      dehydratedProps: init,
    },
  };
};

export default DoctorManagement;
