import instance from '@hooks/api/instance';
import { useMutation, useQueryClient } from 'react-query';
import { CommonVerifyCodeDto, MobileNumDto } from 'types/signin';

/**핑 api */
export const ping = () => {
  return instance({
    method: 'get',
    url: `/auth/api/v1/ping`,
  });
};

/**공통 모바일 점유번호 입력 api */
export const postCommonMobileAuth = (mobileNum: MobileNumDto) => {
  return instance({
    method: 'post',
    url: `/auth/api/v1/mobile-authentication`,
    data: mobileNum,
  });
};

/**공통 모바일 점유번호 입력 api */
export const postCommonVerifyCode = (obj: CommonVerifyCodeDto) => {
  return instance({
    method: 'post',
    url: `/auth/api/v1/mobile-authentication/verify`,
    data: obj,
  });
};

/**공통 모바일 점유번호 입력 mutation react query  */
export const useCommonMobileAuth = () => {
  const queryClient = useQueryClient();
  return useMutation((person: MobileNumDto) => postCommonMobileAuth(person), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['auth', 'post', 'verifyCode']);
    },
  });
};

/**공통 모바일 점유번호 입력 mutation react query */
export const useCommonVerifyCode = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (person: CommonVerifyCodeDto) => postCommonVerifyCode(person),
    {
      onError: (error, variable, context) => {
        console.log(error);
      },
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries(['auth', 'post', 'verifyCode']);
      },
    },
  );
};
