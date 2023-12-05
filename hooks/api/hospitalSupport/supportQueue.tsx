import { ReceptionRefusalPostDto } from '@components/reception/type';
import instance from '@hooks/api/instance';
import AxiosContext from '@hooks/contexts/AxiosContext';
import GeneralProgresBarContext from '@hooks/contexts/GeneralProgresBarContext';
import { transQueryDateToString, transQueryUrlFilter } from '@utils/transtext';
import { getCookie } from 'cookies-next';
import { ParsedUrlQuery } from 'querystring';
import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SUPPORT_QUEUE, SUPPORT_QUEUE_DETAIL } from './queryKey';
import { SupportQueueFilterContext } from '@components/supportQueue/contexts/SupportQueueFilterContext';
import { useRouter } from 'next/router';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';

/** 비대면 진료 대기열 Data Table
 * GET API */
export const apiSupportQueue = (queryString: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/telemedicine/api/v2/support/telemedicine-treatment?size=10${queryString}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 비대면 진료 대기열 상세
 * GET API */
export const apiSupportQueueDetail = (ulid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/telemedicine/api/v2/support/telemedicine-treatment/${ulid}/registration`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 비대면 진료 취소
 * GET API */
export const apiSupportQueueCancel = (param: ReceptionRefusalPostDto) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const data = { cancelReason: param.reasonsRefusal };
  return instance({
    method: 'put',
    url: `/telemedicine/api/v2/support/telemedicine-treatment/${param.ulid}/cancel`,
    data: data,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 비대면 진료 대기열 Data Table
 * 리엑트 쿼리 커스텀 훅 */

export const useSupportQueue = () => {
  const { filter, date } = useContext(SupportQueueFilterContext);
  const router = useRouter();
  const queryUrl = transQueryUrlFilter(router.query, filter);
  const queryDate = transQueryDateToString(router.query, date);
  const queryString = `${queryUrl}${queryDate}`;

  const { data, isError, isLoading } = useQuery(
    SUPPORT_QUEUE(router.query),
    async () => {
      return await apiSupportQueue(queryString);
    },
    {
      refetchInterval: 3000,
    },
  );

  const { isWarning } = useCodeWarningEffect({
    code: data ? data.data.code : '',
    codeCallBack: () => {
      window.location.replace('/medical-support/telemedicine/queueing');
    },
  });

  return { data, isError, isLoading, isWarning };
};

/** 비대면 진료 대기열 상세
 * 리엑트 쿼리 커스텀 훅 */
export const useSupportQueueDetail = (ulid: string) => {
  const { setProgressBarDisabledFn } = useContext(AxiosContext);
  const { generalProgressBarOn } = useContext(GeneralProgresBarContext);
  return useQuery(
    SUPPORT_QUEUE_DETAIL(ulid),
    async () => {
      setProgressBarDisabledFn(true);
      generalProgressBarOn(true);
      const data = await apiSupportQueueDetail(ulid);
      return data;
    },
    {
      onSettled(data, error) {
        setTimeout(() => generalProgressBarOn(false), 1000);
      },
    },
  );
};

/** 비대면 진료 취소
 * PUT API */
export const useSupportQueueCancel = (query: ParsedUrlQuery) => {
  const queryClient = useQueryClient();
  return useMutation((prams: ReceptionRefusalPostDto) => apiSupportQueueCancel(prams), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(SUPPORT_QUEUE(query));
    },
  });
};
