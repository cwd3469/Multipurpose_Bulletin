import instance from '@hooks/api/instance';
import { transQueryDateToString, transQueryUrlFilter } from '@utils/transtext';
import { getCookie } from 'cookies-next';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { SUPPORTHISTORY } from './queryKey';
import { SupportHistoryFilterContext } from '@components/supportHistory/contexts/SupportHistoryFilterContext';
import { useRouter } from 'next/router';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';

/**진료 내역
 * GET API
 */
export const apiSupportHistoryTreat = (queryString: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'get',
    url: `/telemedicine/api/v2/support/telemedicine-history?size=10${queryString}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**진료 내역 상세
 * GET API
 */
export const apiSupportHistoryDetailTreat = (ulid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/telemedicine/api/v2/support/telemedicine-history/${ulid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**진료 내역
 * 리엑트 쿼리 커스텀 훅 */
export const useSupportHistoryTreat = () => {
  const { filter, date } = useContext(SupportHistoryFilterContext);
  const router = useRouter();
  const queryUrl = transQueryUrlFilter(router.query, filter);
  const queryDate = transQueryDateToString(router.query, date);
  const queryString = `${queryUrl}${queryDate}`;

  const { data, isError, isLoading } = useQuery(
    SUPPORTHISTORY(router.query),
    async () => {
      return await apiSupportHistoryTreat(queryString);
    },
    {
      refetchInterval: 3000,
    },
  );

  const { isWarning } = useCodeWarningEffect({
    code: data ? data.data.code : '',
    codeCallBack: () => {
      window.location.replace('/medical-support/telemedicine/history');
    },
  });

  return { data, isError, isLoading, isWarning };
};
