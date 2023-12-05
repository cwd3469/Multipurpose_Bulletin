import { DtoPutDoctorDetail } from '@components/doctorInfo/type';
import { ApiGetDoctorProfileTableType, DtoPostDoctorRegister } from '@components/doctorMgt/type';
import instance from '@hooks/api/instance';
import { transQueryString } from '@utils/transtext';

import { getCookie } from 'cookies-next';
import { ParsedUrlQuery } from 'querystring';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const apiGetProfileDoctor = (query: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/hospital/api/v1/profile/doctor?size=10${query}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

export const apiPostProfileDoctor = (parms: DtoPostDoctorRegister) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'post',
    url: `/hospital/api/v2/profile/doctor`,
    data: JSON.stringify(parms),
    headers: {
      Authorization: accessToken,
    },
  });
};

export const apiGetPofileDoctorDetail = (doctorProfileUlid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/hospital/api/v1/profile/doctor/${doctorProfileUlid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

export const apiPutPofileDoctorDetail = (parms: DtoPutDoctorDetail) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'put',
    url: `/hospital/api/v2/profile/doctor/${parms.doctorProfileUlid}`,
    data: parms.modifyData,
    headers: {
      Authorization: accessToken,
    },
  });
};

export const apiDeletePofileDoctor = (doctorProfileUlid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'delete',
    url: `/hospital/api/v1/profile/doctor/${doctorProfileUlid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

export const apiPostPofileImg = (formData: FormData) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'post',
    url: `/hospital/api/v1/profile/doctor/image/upload`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: accessToken,
    },
  });
};

/** 관리자 의사 관리 상세 페이지 GET react query custom Hook*/
export const useGetProfileDoctorDetail = (parms: string) => {
  return useQuery(['admin', 'get', 'doctorInfo'], async () => {
    const data = await apiGetPofileDoctorDetail(parms);
    return data;
  });
};

/** 관리자 의사 관리 상세 페이지 PUT react query custom Hook*/
export const usePutPofileDoctorDetail = () => {
  const queryClient = useQueryClient();
  return useMutation((parms: DtoPutDoctorDetail) => apiPutPofileDoctorDetail(parms), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['admin', 'post', 'doctorProfile']);
    },
  });
};

/** 관리자 의사 관리 상세 정보 DELETE react query custom Hook*/
export const useDeletePofileDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation((parms: string) => apiDeletePofileDoctor(parms), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['admin', 'post', 'doctorProfile']);
    },
  });
};

/** 관리자 의사 관리 리스트 페이지 GET react query custom Hook*/
export const useGetProfileDoctor = (parms: ParsedUrlQuery) => {
  const query = transQueryString(parms);
  return useQuery(['admin', 'get', 'doctorList'], async () => {
    const data = await apiGetProfileDoctor(query);
    return data;
  });
};

/**관리자 의사 관리 페이지 POST reat Mutation custom Hook */
export const usePostProfileDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation((parms: DtoPostDoctorRegister) => apiPostProfileDoctor(parms), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['admin', 'post', 'doctorProfile']);
    },
  });
};
/**관리자 의사 관리 파일업로드 POST reat Mutation custom Hook */
export const usePostPofileImg = () => {
  const queryClient = useQueryClient();
  return useMutation((parms: FormData) => apiPostPofileImg(parms), {
    onError: (error, variable, context) => {
      console.log(error);
    },
  });
};
