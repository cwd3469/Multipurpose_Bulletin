import { ReceptionAcceptPostDto, ReceptionRefusalPostDto } from '@components/reception/type';
import instance from '@hooks/api/instance';
import AxiosContext from '@hooks/contexts/AxiosContext';
import GeneralProgresBarContext from '@hooks/contexts/GeneralProgresBarContext';
import { transQueryDateToString, transQueryUrlFilter } from '@utils/transtext';
import { getCookie } from 'cookies-next';
import { ParsedUrlQuery } from 'querystring';
import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SUPPORT_RECEPTION, SUPPORT_RECEPTION_ACCEPT, SUPPORT_RECEPTION_DETAIL } from './queryKey';
import { SupportReceptionContext } from '@components/supportReception/contexts/SupportReceptionContext';
import { useRouter } from 'next/router';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';

/** 당일 진료 접수 Data Table
 * GET API */
export const apiSupportReception = (queryString: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'get',
    url: `/telemedicine/api/v2/support/telemedicine-registration?size=10${queryString}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 당일 진료 접수 접수 내용 보기
 * GET API */
export const apiSupportReceptionDetail = (ulid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'get',
    url: `/telemedicine/api/v2/support/telemedicine-registration/${ulid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 당일 진료 접수 접수 수락
 * GET API */
export const apiSupportReceptionAccept = (ulid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'get',
    url: `/telemedicine/api/v2/support/telemedicine-registration/${ulid}/patient-info`,
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
export const apiPutSupportReceptionRefusal = (param: ReceptionRefusalPostDto) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const dto = {
    refuseReason: param.reasonsRefusal,
  };
  return instance({
    method: 'put',
    url: `/telemedicine/api/v2/support/telemedicine-registration/${param.ulid}/refuse`,
    data: dto,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 당일 진료 접수 접수 수락
 * PUT API */
export const apiPutSupportReceptionAccept = (param: ReceptionAcceptPostDto) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const dto = {
    patientRegistrationNum: param.patientRegisterNumber,
  };
  return instance({
    method: 'put',
    url: `/telemedicine/api/v2/support/telemedicine-registration/${param.ulid}/accept`,
    data: dto,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 당일 진료 접수 환자번호등록
 * PUT API */
export const apiPutPatientNumder = (parms: ReceptionAcceptPostDto) => {
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

/** 의사 이름 목록 get API */
export const apiDoctorName = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/telemedicine/api/v2/support/telemedicine-clinic/doctor-name`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 의사 이름 목록 get API 훗 */
export const useDoctorName = () => {
  return useQuery(
    ['DOCTOR', 'NAME', 'LIST'],
    async () => {
      const data = await apiDoctorName();
      return data;
    },
    {
      refetchInterval: 360000,
    },
  );
};

/** 당일 진료 접수 Data Table
 * 리엑트 쿼리 커스텀 훅 */
export const useSupportReception = () => {
  const { filter, date } = useContext(SupportReceptionContext);
  const router = useRouter();
  const queryUrl = transQueryUrlFilter(router.query, filter);
  const queryDate = transQueryDateToString(router.query, date);
  const queryString = `${queryUrl}${queryDate}`;

  const { data, isError, isLoading } = useQuery(
    SUPPORT_RECEPTION(router.query),
    async () => {
      return await apiSupportReception(queryString);
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

/** 당일 진료 접수 접수 내용 보기
 * 리엑트 쿼리 커스텀 훅 */
export const useSupportReceptionDetail = (parms: string) => {
  const { setProgressBarDisabledFn } = useContext(AxiosContext);
  const { generalProgressBarOn } = useContext(GeneralProgresBarContext);

  return useQuery(
    SUPPORT_RECEPTION_DETAIL(parms),
    async () => {
      setProgressBarDisabledFn(true);
      generalProgressBarOn(true);
      const data = await apiSupportReceptionDetail(parms);
      return data;
    },
    {
      onSettled(data, error) {
        setTimeout(() => generalProgressBarOn(false), 1000);
      },
    },
  );
};

/** 당일 진료 접수 접수 수락
 * 리엑트 쿼리 커스텀 훅 */
export const useSupportReceptionAccept = (parms: string) => {
  return useQuery(SUPPORT_RECEPTION_ACCEPT(parms), async () => {
    const data = await apiSupportReceptionAccept(parms);
    return data;
  });
};
/** 당일 진료 접수 접수 거절
 * PUT API */
export const usePutSupportReceptionRefusal = (query: ParsedUrlQuery) => {
  const queryClient = useQueryClient();
  return useMutation((prams: ReceptionRefusalPostDto) => apiPutSupportReceptionRefusal(prams), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(SUPPORT_RECEPTION(query));
    },
  });
};

/** 당일 진료 접수 접수 수락
 * PUT API */
export const usePutSupportReceptionAccept = (query: ParsedUrlQuery) => {
  const queryClient = useQueryClient();
  return useMutation((prams: ReceptionAcceptPostDto) => apiPutSupportReceptionAccept(prams), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      if (data.data.code === '0000') {
        queryClient.invalidateQueries(SUPPORT_RECEPTION(query));
      }
    },
  });
};
/** 당일 진료 접수 접수 등록번호 입력
 * PUT API */
export const usePutPatientNumder = () => {
  return useMutation((prams: ReceptionAcceptPostDto) => apiPutPatientNumder(prams), {
    onError: (error, variable, context) => {
      console.log(error);
    },
  });
};
