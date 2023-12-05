import ScheduleManagementPage from '@components/schedule/ScheduleManagementPage';
import { Gnb } from '@components/common/layout/gnb/Gnb';
import { ScheduleModalStateProvider } from '@components/schedule/hooks/useScheduleModal';
import { ScheduleSelectMonthProvider } from '@components/schedule/contexts/ScheduleSelectMonth';
import { GetServerSideProps } from 'next';
import { UserInfoInterface } from 'types/signin';
import jwtDecode from 'jwt-decode';
import { QueryClient, dehydrate } from 'react-query';
import { getServerSideScheduleInitData } from '@pages/medical-support/doctor-schedule/[doctorUlid]';

const management = () => {
  return (
    <ScheduleSelectMonthProvider>
      <ScheduleModalStateProvider>
        <>
          <Gnb />
          <ScheduleManagementPage />
        </>
      </ScheduleModalStateProvider>
    </ScheduleSelectMonthProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = context?.req?.cookies.accessToken;
  const userInfo: UserInfoInterface = jwtDecode(accessToken as string);
  const productId = userInfo.ulid as string;
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

export default management;
