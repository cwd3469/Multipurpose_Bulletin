import SchedulePage from '@components/schedule/SchedulePage';
import { Gnb } from '@components/common/layout/gnb/Gnb';
import { ScheduleSelectMonthProvider } from '@components/schedule/contexts/ScheduleSelectMonth';
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from 'react-query';
import { getServerSideScheduleInitData } from '@pages/medical-support/doctor-schedule/[doctorUlid]';
import jwtDecode from 'jwt-decode';
import { UserInfoInterface } from 'types/signin';

const schedule = () => {
  return (
    <ScheduleSelectMonthProvider>
      <div>
        <Gnb />
        <SchedulePage />
      </div>
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

export default schedule;
