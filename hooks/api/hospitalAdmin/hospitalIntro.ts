import { HospitalIntroDto } from '@components/hospitalIntro/type';
import instance from '@hooks/api/instance';
import { getCookie } from 'cookies-next';
import { useMutation, useQuery, useQueryClient } from 'react-query';

/** - 소개 페이지 GET API */
export const getHospitalIntro = () => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/hospital/api/v1/profile/hospital`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** - 소개 페이지 PUT API */
export const putHospitalIntro = (intro: HospitalIntroDto) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'put',
    url: `/hospital/api/v1/profile/hospital`,
    data: JSON.stringify(intro),
    headers: {
      Authorization: accessToken,
    },
  });
};

/** - 소개 로고 POST API */
export const postHospitalImage = (file: FormData) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'post',
    url: `/hospital/api/v1/profile/hospital/image/upload`,
    data: file,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: accessToken,
    },
  });
};
/** - 소개 이미지 리스트 POST API */
export const postHospitalImgList = (fileList: FormData) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'post',
    url: `/hospital/api/v1/profile/hospital/images/upload`,
    data: fileList,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: accessToken,
    },
  });
};

/** - 소개 페이지 react query custom Hook*/
export const useGetHospitalIntro = () => {
  return useQuery(
    ['admin', 'get', 'hospitalIntro'],
    async () => {
      const data = await getHospitalIntro();
      return data;
    },
    {
      cacheTime: 0,
    },
  );
};

/**- 소개 페이지 reat Mutation custom Hook */
export const usePutHospitalIntro = () => {
  const queryClient = useQueryClient();
  return useMutation((intro: HospitalIntroDto) => putHospitalIntro(intro), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['admin', 'get', 'hospitalIntro']);
    },
  });
};

/**- 소개 페이지 reat Mutation custom Hook */
export const usePostHospitalImage = () => {
  const queryClient = useQueryClient();
  return useMutation((file: FormData) => postHospitalImage(file), {
    onError: (error, variable, context) => {
      console.log(error);
    },
  });
};
/**- 소개 페이지 reat Mutation custom Hook */
export const usePostHospitalImgList = () => {
  const queryClient = useQueryClient();
  return useMutation((files: FormData) => postHospitalImgList(files), {
    onError: (error, variable, context) => {
      console.log(error);
    },
  });
};
