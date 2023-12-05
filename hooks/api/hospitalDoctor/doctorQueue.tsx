import { ReceptionRefusalPostDto } from '@components/reception/type';
import instance from '@hooks/api/instance';
import AxiosContext from '@hooks/contexts/AxiosContext';
import { transQueryDateToString, transQueryUrlFilter } from '@utils/transtext';
import { getCookie } from 'cookies-next';
import { ParsedUrlQuery } from 'querystring';
import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QUEUE, QUEUEDETAIL } from './queryKey';
import { ReceptionFilterContext } from '@components/reception/contexts/ReceptionFilterContext';
import { useRouter } from 'next/router';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';
import { QueueFilterContext } from '@components/queue/contexts/QueueFilterContext';

/** 비대면 진료 대기열 Data Table
 * GET API */
export const apiTelemedicineTreatQueue = (queryString: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment?size=10${queryString}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 비대면 진료 대기열 상세
 * GET API */
export const apiTelemedicineTreatQueueDetail = (ulid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment/${ulid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 비대면 진료 취소
 * GET API */
export const apiTelemedicineTreatCabcel = (param: ReceptionRefusalPostDto) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const data = { cancelReason: param.reasonsRefusal };
  return instance({
    method: 'put',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment/${param.ulid}/cancel`,
    data: data,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 비대면 환자 호출 POT API */
export const apiTelemedicinePatientCall = (registrationUlid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'post',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment/${registrationUlid}/call-patient`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 비대면 진료 대기열 Data Table
 * 리엑트 쿼리 커스텀 훅 */
export const useTelemedicineTreatQueue = () => {
  const { filter, date } = useContext(QueueFilterContext);
  const router = useRouter();
  const queryUrl = transQueryUrlFilter(router.query, filter);
  const queryDate = transQueryDateToString(router.query, date);
  const queryString = `${queryUrl}${queryDate}`;
  const { data, isError, isLoading } = useQuery(
    QUEUE(router.query),
    async () => {
      return await apiTelemedicineTreatQueue(queryString);
    },
    {
      refetchInterval: 3000,
    },
  );

  const { isWarning } = useCodeWarningEffect({
    code: data ? data.data.code : '',
    codeCallBack: () => {
      window.location.replace('/doctor/telemedicine/queueing');
    },
  });

  return { data, isError, isLoading, isWarning };
};

/** 비대면 진료 대기열 상세
 * 리엑트 쿼리 커스텀 훅 */
export const useTelemedicineTreatQueueDetail = (ulid: string) => {
  return useQuery(QUEUEDETAIL(ulid), async () => {
    const data = await apiTelemedicineTreatQueueDetail(ulid);
    return data;
  });
};

/** 비대면 진료 취소
 * PUT API */
export const useTelemedicineTreatCabcel = (query: ParsedUrlQuery) => {
  const queryClient = useQueryClient();
  return useMutation((prams: ReceptionRefusalPostDto) => apiTelemedicineTreatCabcel(prams), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(QUEUE(query));
    },
  });
};

export const usePostDoctorPatientCall = () => {
  return useMutation((registrationUlid: string) => apiTelemedicinePatientCall(registrationUlid), {
    onError: (error, variable, context) => {
      console.log(error);
    },
  });
};
