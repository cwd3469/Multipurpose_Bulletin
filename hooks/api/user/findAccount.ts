import instance from '@hooks/api/instance';
import {
  FindAccountPasswordDto,
  HospitalCodeDto,
  MobileNumDto,
  VerifyCodeDto,
} from 'types/signin';
import { useMutation, useQueryClient } from 'react-query';

/** 계정찾기 모바일 점유 인증 코드 발급 api */
export const postAuthModileNum = (mobileNum: MobileNumDto) => {
  return instance({
    method: 'post',
    url: `/auth/api/v1/hospital/find-account/mobile-authentication`,
    data: mobileNum,
  });
};

/**계정찾기 요양 기관 번호 입력 api */
export const postHospitalCode = (obj: HospitalCodeDto) => {
  return instance({
    method: 'post',
    url: `/auth/api/v1/hospital/code/check`,
    data: obj,
  });
};

/**계정찾기 점유번호 입력 api */
export const postVerify = (obj: VerifyCodeDto) => {
  return instance({
    method: 'post',
    url: `/auth/api/v1/hospital/find-account/verify`,
    data: obj,
  });
};

/**계정찾기 점유번호 입력 api */
export const postEditPassword = (obj: FindAccountPasswordDto) => {
  return instance({
    method: 'post',
    url: `/auth/api/v1/hospital/find-account/edit-password`,
    data: obj,
  });
};

/** 휴대폰 인증 번호 전송 mutation react query */
export const useAuthModileNum = () => {
  const queryClient = useQueryClient();
  return useMutation((person: MobileNumDto) => postAuthModileNum(person), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['auth', 'post', 'authModileNum']);
    },
  });
};

/** 요양기관 코드 mutation react query */
export const useHospitalCode = () => {
  const queryClient = useQueryClient();
  return useMutation((person: HospitalCodeDto) => postHospitalCode(person), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['auth', 'post', 'hospitalCode']);
    },
  });
};

/** *점유번호 입력 mutation react query */
export const useVerifyCode = () => {
  const queryClient = useQueryClient();
  return useMutation((person: VerifyCodeDto) => postVerify(person), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['auth', 'post', 'verifyCode']);
    },
  });
};

/** *점유번호 입력 mutation react query */
export const useEditPassword = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (person: FindAccountPasswordDto) => postEditPassword(person),
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
