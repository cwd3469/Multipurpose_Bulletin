import { DrSettingGetApiType } from '@components/setting/type';
import instance from '@hooks/api/instance';
import { transQueryUrlFilter } from '@utils/transtext';
import { getCookie } from 'cookies-next';
import { ParsedUrlQuery } from 'querystring';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SUPPORTTREATSET, SUPPORT_TREATSET_DETAIL } from './queryKey';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';
import { useContext } from 'react';
import { SupportTreatFilterContext } from '@components/supportTreatmentSet/contexts/SupportTreatFilterContext';
import { useRouter } from 'next/router';

/** 의사 진료 설정 Data Table
 * GET API */
export const apiSupportDoctorTreat = (queryString: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  //TODO:api url 변경 점
  return instance({
    method: 'get',
    url: `/telemedicine/api/v2/support/telemedicine-clinic?size=10${queryString}`,
    headers: {
      Authorization: accessToken,
    },
  });
};
/** 의사 진료 설정 접수 시작
 * PUT API */
export const apiReceptionStateOpen = (props: { ulid: string }) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  //TODO:api url 변경 점
  return instance({
    method: 'put',
    url: `/telemedicine/api/v2/support/telemedicine-clinic/${props.ulid}/open`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 의사 진료 설정 접수 마감
 * PUT API */
export const apiReceptionStateClose = (props: { ulid: string }) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  //TODO:api url 변경 점
  return instance({
    method: 'put',
    url: `/telemedicine/api/v2/support/telemedicine-clinic/${props.ulid}/close`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 의사 진료 설정 접수 마감 시작 전체
 * PUT API */
export const apiReceptionStateAllStart = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  //TODO:api url 변경 점
  return instance({
    method: 'put',
    url: `/telemedicine/api/v2/support/telemedicine-clinic/open-all`,
    headers: {
      Authorization: accessToken,
    },
  });
};
export const apiReceptionStateAllClose = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  //TODO:api url 변경 점
  return instance({
    method: 'put',
    url: `/telemedicine/api/v2/support/telemedicine-clinic/close-all`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 의사 진료 설정 조회
 * get API */
export const apiSupportDoctorTreatProfile = (props: { ulid: string }) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'get',
    url: `/hospital/api/v2/support/doctor-setting/${props.ulid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 의사 진료 설정 수정
 * get API */
export const apiDoctorTreatProfileModify = (prams: DrSettingGetApiType) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'put',
    url: `/hospital/api/v2/support/doctor-setting/${prams.doctorAccountUlid}`,
    data: prams,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 의사 진료 설정 Data Table
 * 리엑트 쿼리 커스텀 훅 */
export const useSupportDoctorTreat = () => {
  const { filter } = useContext(SupportTreatFilterContext);
  const router = useRouter();
  const queryUrl = transQueryUrlFilter(router.query, filter);
  const queryString = `${queryUrl}`;

  const { data, isError, isLoading } = useQuery(
    SUPPORTTREATSET(router.query),
    async () => {
      return await apiSupportDoctorTreat(queryString);
    },
    {
      refetchInterval: 3000,
    },
  );

  const { isWarning } = useCodeWarningEffect({
    code: data ? data.data.code : '',
    codeCallBack: () => {
      window.location.replace('/medical-support/telemedicine/reception');
    },
  });

  return { data, isError, isLoading, isWarning };
};

/** 의사 진료 설정 Detail
 * 리엑트 쿼리 커스텀 훅 */
export const useSupportDoctorTreatProfile = (parms: { ulid: string }) => {
  return useQuery(SUPPORT_TREATSET_DETAIL(parms.ulid), async () => {
    const data = await apiSupportDoctorTreatProfile(parms);
    return data;
  });
};
/** 의사 진료 설정 수정
 * 리엑트 쿼리 커스텀 훅 */
export const useDoctorTreatProfileModify = (ulid: string) => {
  const queryClient = useQueryClient();
  return useMutation((prams: DrSettingGetApiType) => apiDoctorTreatProfileModify(prams), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(SUPPORT_TREATSET_DETAIL(ulid));
    },
  });
};

/** 비대면 진료 상태 변경 PUT API */
export const apiSupportTelemedicineStatus = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'put',
    url: `/apiSupportTelemedicineStatus/test`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 비대면 진료 상태 변경 PUT API 리엑트 훅 */
export const useSupportTelemedicineStatus = (query: ParsedUrlQuery) => {
  const queryClient = useQueryClient();
  return useMutation(() => apiSupportTelemedicineStatus(), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(SUPPORTTREATSET(query));
    },
  });
};
/** 비대면 진료 상태 변경 PUT API */
export const apiSupportTelemedicineStatusAll = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'put',
    url: `/apiSupportTelemedicineStatus/test`,
    headers: {
      Authorization: accessToken,
    },
  });
};
/** 비대면 진료 상태 변경 PUT API 리엑트 훅 */
export const useSupportTelemedicineStatusAll = (query: ParsedUrlQuery) => {
  const queryClient = useQueryClient();
  return useMutation(() => apiSupportTelemedicineStatusAll(), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(SUPPORTTREATSET(query));
    },
  });
};
