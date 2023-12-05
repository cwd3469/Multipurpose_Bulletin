import instance from '@hooks/api/instance';
import AxiosContext from '@hooks/contexts/AxiosContext';
import {
  transQueryDateToString,
  transQueryString,
  transQueryUrlFilter,
} from '@utils/transtext';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { HISTORY } from './queryKey';
import { HistoryFilterContext } from '@components/history/contexts/HistoryFilterContext';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';

/**진료 내역
 * GET API
 */
export const apiHistoryTreat = (query: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment/history?size=10${query}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**진료 내역 상세
 * GET API
 */
export const apiHistoryDetailTreat = (ulid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment/history/${ulid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**진료 내역
 * 리엑트 쿼리 커스텀 훅 */
export const useHistoryTreat = () => {
  const { filter, date } = useContext(HistoryFilterContext);
  const router = useRouter();
  const queryUrl = transQueryUrlFilter(router.query, filter);
  const queryDate = transQueryDateToString(router.query, date);
  const queryString = `${queryUrl}${queryDate}`;

  const { data, isError, isLoading } = useQuery(
    HISTORY(router.query),
    async () => {
      return await apiHistoryTreat(queryString);
    },
    {
      refetchInterval: 3000,
    },
  );

  const { isWarning } = useCodeWarningEffect({
    code: data ? data.data.code : '',
    codeCallBack: () => {
      window.location.replace('/doctor/telemedicine/history');
    },
  });

  return { data, isError, isLoading, isWarning };
};
