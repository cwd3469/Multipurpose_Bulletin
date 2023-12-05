import { useRouter } from 'next/router';
import { ScheduleSelectMonthContext } from '../contexts/ScheduleSelectMonth';
import { useContext } from 'react';
import { ScheduleListKey, apiScheduleList } from '@hooks/api/hospitalDoctor/doctorSchedule';
import { getCookie } from 'cookies-next';
import { UserInfoInterface } from 'types/signin';
import jwtDecode from 'jwt-decode';
import { useQuery } from 'react-query';
import useAuth from '@hooks/useAuth';
import { MonthDateType, ProfileType } from '../contexts/ScheduleMonth';

export const useApiScheduleList = () => {
  const router = useRouter();
  const { doctorUlid } = router.query;
  const { monthRangeDate } = useContext(ScheduleSelectMonthContext);

  const query = ScheduleListKey(monthRangeDate)[3];
  let suportPath = `?doctorAccountUlid=${doctorUlid}&` + query;
  let dcPath = '';
  const accessToken = getCookie('accessToken');
  try {
    const userInfo: UserInfoInterface = jwtDecode(accessToken as string);
    const productId = userInfo.ulid as string;
    dcPath = `?doctorAccountUlid=${productId}&` + query;
  } catch (error) {
    // invalid token format
    console.log('error: ' + JSON.stringify(accessToken));
  }

  const path = doctorUlid ? suportPath : dcPath;

  const { data } = useQuery(ScheduleListKey(monthRangeDate), async () => {
    const req = await apiScheduleList(path);
    return req.data;
  });

  const monthDate: MonthDateType = data ? data.data.schedule : {};

  const profile: ProfileType = {
    doctorAccountUlid: data ? data.data.doctorAccountUlid : '',
    doctorName: data ? data.data.doctorName : '',
    year: data ? data.data.year : '',
    month: data ? data.data.month : '',
    maxScheduleDate: data ? data.data.maxScheduleDate : '',
  };

  return { monthDate, profile };
};
