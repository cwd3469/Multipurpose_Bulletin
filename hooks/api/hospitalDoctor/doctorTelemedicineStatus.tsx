import instance from '@hooks/api/instance';
import { getCookie } from 'cookies-next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DOCTOR_TELEMEDICINE_STATUS } from './queryKey';

/** 비대면 진료 상태 조회 GET API */
export const apiDoctorTelemedicineClinicStatus = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/telemedicine-clinic/status`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 비대면 진료 상태 시작 PUT API */
export const apiPutDoctorTelemedicineClinicOpen = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'put',
    url: `/telemedicine/api/v2/doctor/telemedicine-clinic/open`,
    headers: {
      Authorization: accessToken,
    },
  });
};
/** 비대면 진료 상태 종료 PUT API */
export const apiPutDoctorTelemedicineClinicClose = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'put',
    url: `/telemedicine/api/v2/doctor/telemedicine-clinic/close`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 비대면 진료 상태 변경 PUT API */
export const apiPutDoctorTelemedicineClinicStatus = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'put',
    url: `/telemedicine/api/v1/telemedicine-clinic/status/switch`,
    headers: {
      Authorization: accessToken,
    },
  });
};

export const useDoctorTelemedicineClinicStatus = () => {
  return useQuery(DOCTOR_TELEMEDICINE_STATUS, async () => {
    const data = await apiDoctorTelemedicineClinicStatus();
    return data;
  });
};

export const usePutDoctorTelemedicineClinicStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(() => apiPutDoctorTelemedicineClinicStatus(), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(DOCTOR_TELEMEDICINE_STATUS);
    },
  });
};

export const usePutDoctorTelemedicineClinicOpen = () => {
  const queryClient = useQueryClient();
  return useMutation(() => apiPutDoctorTelemedicineClinicOpen(), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(DOCTOR_TELEMEDICINE_STATUS);
    },
  });
};
export const usePutDoctorTelemedicineClinicClose = () => {
  const queryClient = useQueryClient();
  return useMutation(() => apiPutDoctorTelemedicineClinicClose(), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(DOCTOR_TELEMEDICINE_STATUS);
    },
  });
};
