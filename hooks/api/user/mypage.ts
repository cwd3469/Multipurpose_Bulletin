import instance from '@hooks/api/instance';
import { getCookie } from 'cookies-next';
import { useQuery } from 'react-query';

/**내 정보 ( 어드민 ) api */
export const getAdminMyInfo = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/hospital/api/v1/admin/my-info`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**내 정보 ( 어드민 ) api */
export const getDoctorMyInfo = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/hospital/api/v1/doctor/my-info`,
    headers: {
      Authorization: accessToken,
    },
  });
};
/**내 정보 ( 어드민 ) api */
export const getSupportMyInfo = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/hospital/api/v2/support/my-info`,
    headers: {
      Authorization: accessToken,
    },
  });
};

// 권한 , 매소드 , 종류
/** 내 정보 ( 어드민 ) react query custom Hook*/
export const useGetAdminMyInfo = () => {
  return useQuery(['admin', 'get', 'myinfo'], () => getAdminMyInfo());
};
export const useGetDoctorMyInfo = () => {
  return useQuery(['doctor', 'get', 'myinfo'], () => getDoctorMyInfo());
};
export const useGetSupportMyInfo = () => {
  return useQuery(['support', 'get', 'myinfo'], () => getSupportMyInfo());
};
