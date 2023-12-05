import instance from '@hooks/api/instance';
import { getCookie } from 'cookies-next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { HISTORYDETAIL, PATIENT_HISTORY, TEANTSTART } from './queryKey';

/**  진료실 환자 정보 get
 *  GET API
 */
export const apiDoctorOfficeTreatRoom = (ulid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment/${ulid}/room`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**  진료실 시작
 *  PUT API
 */
export const apiDoctorOfficeTreatStart = (ulid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'put',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment/${ulid}/start`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**  진료 환자 전달 사항
 *  PUT API
 */
export const apiDoctorOfficePatientCommunications = (prams: {
  ulid: string;
  patientMessage: string;
}) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const data = { patientMessage: prams.patientMessage };
  return instance({
    method: 'put',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment/${prams.ulid}/patient-message`,
    data: data,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**  진료 종료
 *  PUT API
 */
export const apiDoctorOfficeTreatClose = (ulid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'put',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment/${ulid}/close`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**  처방전 진료비 입력
 *   POST API
 */
export const apiTreatPrescription = (parms: { ulid: string; formData: FormData }) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'post',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment/${parms.ulid}/prescription`,
    data: parms.formData,
    headers: {
      Authorization: accessToken,
      'Content-Type': 'multipart/form-data',
    },
  });
};

/** 비대면 진료 보류
 * GET API */
export const apiTelemedicineTreatHold = (param: { ulid: string }) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'put',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment/${param.ulid}/hold`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**  진료 이력
 *  GET API
 */
export const apiPatientHistory = (param: { ulid: string; page: number }) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/doctor/telemedicine-treatment/${param.ulid}/patient-history/?size=2&page=${param.page}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**  진료 시작 입력
 *  리엑트 쿼리 훅
 */
export const useTreatStart = () => {
  return useMutation((prams: string) => apiDoctorOfficeTreatStart(prams), {
    onError: (error, variable, context) => {
      console.log(error);
    },
  });
};

/**  진료실 입장
 *  리엑트 쿼리 훅
 */
export const useDoctorOfficeTreatRoom = (param: string) => {
  return useQuery(TEANTSTART(param), async () => {
    const data = await apiDoctorOfficeTreatRoom(param);
    return data;
  });
};

/**  진료실 입장
 *  리엑트 쿼리 훅
 */
export const usePatientHistory = (param: { ulid: string; page: number }) => {
  return useQuery(PATIENT_HISTORY(param), async () => {
    const data = await apiPatientHistory(param);
    return data;
  });
};

/**  진료 환자 전달 사항
 *  리엑트 쿼리 훅
 */
export const useDoctorOfficePatientCommunications = (ulid?: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (prams: { ulid: string; patientMessage: string }) =>
      apiDoctorOfficePatientCommunications(prams),
    {
      onError: (error, variable, context) => {
        console.log(error);
      },
      onSuccess(data, variables, context) {
        if (ulid) queryClient.invalidateQueries(HISTORYDETAIL(ulid));
      },
    },
  );
};

/**  진료 처방전 진료비 입력
 *  리엑트 쿼리 훅
 */
export const useTreatPrescription = () => {
  return useMutation((prams: { ulid: string; formData: FormData }) => apiTreatPrescription(prams), {
    onError: (error, variable, context) => {
      console.log(error);
    },
  });
};

/** 비대면 진료 보류
 * PUT API */
export const useTelemedicineTreatHold = () => {
  const queryClient = useQueryClient();
  return useMutation((prams: { ulid: string }) => apiTelemedicineTreatHold(prams), {
    onError: (error, variable, context) => {
      console.log(error);
    },
  });
};
