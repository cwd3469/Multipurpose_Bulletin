import { ReceptionAcceptPostDto, ReceptionRefusalPostDto } from '@components/reception/type';
import instance from '@hooks/api/instance';
import { getCookie } from 'cookies-next';
import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { RECEPTION, RECEPTION_ACCEPT, RECEPTION_DETAIL } from './queryKey';
import { transQueryDateToString, transQueryUrlFilter } from '@utils/transtext';
import { ParsedUrlQuery } from 'querystring';
import { ReceptionFilterContext } from '@components/reception/contexts/ReceptionFilterContext';
import { useRouter } from 'next/router';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';

/** 당일 진료 접수 Data Table
 * GET API */
export const apiDoctorReception = (query: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/telemedicine-registration?size=10&sort=createdAt,desc${query}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 당일 진료 접수 접수 내용 보기
 * GET API */
export const apiDoctorReceptionDetail = (ulid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/telemedicine-registration/${ulid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 당일 진료 접수 접수 수락
 * GET API */
export const apiDoctorReceptionAccept = (ulid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/telemedicine-registration/patient-registration-number/${ulid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**  진료접수 신청서에 등록된 파일 다운로드
 * GET API */
export const apiReceptionDetailFileDownload = (fileUlid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/telemedicine-registration/file/${fileUlid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**  진료접수 신청서에 등록된 파일 다운로드
 * GET API */
export const apiImageEncode = (fileUlid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/telemedicine-registration/file/${fileUlid}/encoded`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 당일 진료 접수 접수 거절
 * PUT API */
export const apiPutDoctorReceptionRefusal = (param: ReceptionRefusalPostDto) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const dto = {
    refuseReason: param.reasonsRefusal,
  };
  return instance({
    method: 'put',
    url: `/telemedicine/api/v1/telemedicine-registration/${param.ulid}/status/refuse`,
    data: dto,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 당일 진료 접수 접수 수락
 * PUT API */
export const apiPutDoctorReceptionAccept = (ulid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'put',
    url: `/telemedicine/api/v1/telemedicine-registration/${ulid}/status/accept`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 당일 진료 접수 환자번호등록
 * PUT API */
export const apiPutPatientRegistionNum = (parms: ReceptionAcceptPostDto) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  const data = { patientRegistrationNum: parms.patientRegisterNumber };

  return instance({
    method: 'put',
    url: `/telemedicine/api/v1/telemedicine-registration/patient-registration-number/${parms.ulid}`,
    data: data,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 당일 진료 접수 Data Table
 * 리엑트 쿼리 커스텀 훅 */
export const useDoctorReception = () => {
  const { filter, date } = useContext(ReceptionFilterContext);
  const router = useRouter();
  const queryUrl = transQueryUrlFilter(router.query, filter);
  const queryDate = transQueryDateToString(router.query, date);
  const queryString = `${queryUrl}${queryDate}`;

  const { data, isError, isLoading } = useQuery(
    RECEPTION(router.query),
    async () => {
      return await apiDoctorReception(queryString);
    },
    {
      refetchInterval: 3000,
    },
  );

  const { isWarning } = useCodeWarningEffect({
    code: data ? data.data.code : '',
    codeCallBack: () => {
      window.location.replace('/doctor/telemedicine/reception');
    },
  });

  return { data, isError, isLoading, isWarning };
};

/** 당일 진료 접수 접수 내용 보기
 * 리엑트 쿼리 커스텀 훅 */
export const useDoctorReceptionDetail = (parms: string) => {
  return useQuery(RECEPTION_DETAIL(parms), async () => {
    const data = await apiDoctorReceptionDetail(parms);
    return data;
  });
};

/** 당일 진료 접수 접수 수락
 * 리엑트 쿼리 커스텀 훅 */
export const useDoctorReceptionAccept = (parms: string) => {
  return useQuery(RECEPTION_ACCEPT(parms), async () => {
    const data = await apiDoctorReceptionAccept(parms);
    return data;
  });
};
/** 당일 진료 접수 접수 거절
 * PUT API */
export const usePutDoctorReceptionRefusal = (query: ParsedUrlQuery) => {
  const queryClient = useQueryClient();
  return useMutation((prams: ReceptionRefusalPostDto) => apiPutDoctorReceptionRefusal(prams), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(RECEPTION(query));
    },
  });
};

/** 당일 진료 접수 접수 수락
 * PUT API */
export const usePutDoctorReceptionAccept = (query: ParsedUrlQuery) => {
  const queryClient = useQueryClient();
  return useMutation((prams: string) => apiPutDoctorReceptionAccept(prams), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      if (data.data.code === '0000') {
        queryClient.invalidateQueries(RECEPTION(query));
      }
    },
  });
};
/** 당일 진료 접수 접수 등록번호 입력
 * PUT API */
export const usePutPatientRegistionNum = () => {
  return useMutation((prams: ReceptionAcceptPostDto) => apiPutPatientRegistionNum(prams), {
    onError: (error, variable, context) => {
      console.log(error);
    },
  });
};
