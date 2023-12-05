import { useContext } from 'react';
import { ReserveContext } from '../contexts/ReserveContext';
import { useRouter } from 'next/router';
import { transQueryDateToString, transQueryUrlFilter } from '@utils/transtext';
import { useQuery } from 'react-query';
import { RESERVE_LIST, SUPPORT_RESERVE_LIST } from '@hooks/api/hospitalDoctor/queryKey';
import { apiDoctorReserveList } from '@hooks/api/hospitalDoctor/doctorReserve';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';
import { apSupportReserveList } from '@hooks/api/hospitalSupport/supportReserve';

/**진료 예약
 * 리엑트 쿼리 커스텀 훅 */
const useReserveListGet = () => {
  const { queryString } = useContext(ReserveContext);

  //TODO: api 적용 할 예정
  const { data, isError, isLoading } = useQuery(
    RESERVE_LIST(queryString),
    async () => {
      return await apiDoctorReserveList(queryString);
    },
    {
      refetchInterval: 3000,
    },
  );

  const { isWarning } = useCodeWarningEffect({
    code: data ? data.data.code : '',
    codeCallBack: () => {
      window.location.replace('/doctor/reserve');
    },
  });

  return { data, isError, isLoading, isWarning };
};

/**진료 예약 진료지원
 * 리엑트 쿼리 커스텀 훅 */
export const useSupportReserveList = () => {
  const { filter, date } = useContext(ReserveContext);
  const router = useRouter();
  const queryUrl = transQueryUrlFilter(router.query, filter);
  const queryDate = transQueryDateToString(router.query, date);
  const queryString = `${queryUrl}${queryDate}`;

  //TODO: api 적용 할 예정
  const { data, isError, isLoading } = useQuery(
    SUPPORT_RESERVE_LIST(queryString),
    async () => {
      return await apSupportReserveList(queryString);
    },
    {
      refetchInterval: 3000,
    },
  );

  const { isWarning } = useCodeWarningEffect({
    code: data ? data.data.code : '',
    codeCallBack: () => {
      window.location.replace('/medical-support/reserve');
    },
  });

  return { data, isError, isLoading, isWarning };
};

export default useReserveListGet;
