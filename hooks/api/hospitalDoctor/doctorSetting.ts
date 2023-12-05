import { DrSettingGetApiType } from '@components/setting/type';
import instance from '@hooks/api/instance';
import { getCookie } from 'cookies-next';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const apiDoctorSetting = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/hospital/api/v1/doctor/setting`,
    headers: {
      Authorization: accessToken,
    },
  });
};

export const apiPutDoctorSetting = (prams: DrSettingGetApiType) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'put',
    url: `/hospital/api/v1/doctor/setting`,
    data: prams,
    headers: {
      Authorization: accessToken,
    },
  });
};

export const useDoctorSetting = () => {
  return useQuery(['doctor', 'get', 'setting'], async () => {
    const data = await apiDoctorSetting();
    return data;
  });
};

export const usePutDoctorSetting = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (prams: DrSettingGetApiType) => apiPutDoctorSetting(prams),
    {
      onError: (error, variable, context) => {
        console.log(error);
      },
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(['doctor', 'get', 'setting']);
      },
    },
  );
};
