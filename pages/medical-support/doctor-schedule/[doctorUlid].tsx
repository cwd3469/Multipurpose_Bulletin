import SchedulePage from '@components/schedule/SchedulePage';
import { Gnb } from '@components/common/layout/gnb/Gnb';
import { ScheduleSelectMonthProvider } from '@components/schedule/contexts/ScheduleSelectMonth';
import { GetServerSideProps } from 'next';
import dayjs from 'dayjs';
import axios from 'axios';
import { QueryClient, dehydrate } from 'react-query';

const doctorSchedule = () => {
  return (
    <ScheduleSelectMonthProvider>
      <div>
        <Gnb />
        <SchedulePage />
      </div>
    </ScheduleSelectMonthProvider>
  );
};

export const getServerSideScheduleInitData = (prams: {
  productId: string;
  accessToken: string | undefined;
}) => {
  const startDate = dayjs().startOf('month').format('YYYY-MM-DD');
  const endDate = dayjs().endOf('month').format('YYYY-MM-DD');
  const query = `startDate=${startDate}&endDate=${endDate}`;
  const path = `hospital/api/v1/doctor/schedule?doctorAccountUlid=${prams.productId}&${query}`;
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
  const serverInfoSSR = async () => {
    axios.defaults.baseURL = API_URL;
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = `${prams.accessToken}`;
    const req = await axios.get(path);
    return req.data;
  };
  const key = ['doctor', 'schedule', 'list', query];
  return { serverInfoSSR, key };
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

export default doctorSchedule;
