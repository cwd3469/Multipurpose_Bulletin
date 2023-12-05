import { SecuritySetDto } from '@components/security/SecuritySetPage';
import instance from '@hooks/api/instance';
import { getCookie } from 'cookies-next';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const SecuritySettingValid = ['security', 'setting', 'valid'];

/**로그인 유효시간 조회 API*/
export const apiGetSecuritySettingVaild = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'get',
    url: `/auth/api/v2/hospital/security-setting`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**로그인 유효시간 수정 API*/
export const apiPutSecuritySettingVaild = (prams: SecuritySetDto) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'put',
    url: `/auth/api/v2/hospital/security-setting`,
    data: prams,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**로그인 유효시간 조회 React Hook API*/
export const useApiGetSecuritySettingVaild = () => {
  return useQuery(SecuritySettingValid, async () => {
    const data = await apiGetSecuritySettingVaild();
    return data;
  });
};

export const useApiPutSecuritySettingVaild = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (parms: SecuritySetDto) => apiPutSecuritySettingVaild(parms),
    {
      onError: (error, variable, context) => {
        console.log(error);
      },
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(SecuritySettingValid);
      },
    },
  );
};
