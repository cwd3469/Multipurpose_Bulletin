import { AuthFileUlid } from '@components/auth/hook/useSignup';
import instance from '@hooks/api/instance';
import { useToastContext } from '@hooks/useToastContext';
import { mobileFormatOff } from '@utils/formatNumber';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { MobileNumDto, CommonVerifyCodeDto } from 'types/signin';
import { HospitalInfo, SignupInfo } from 'types/signup';
import useCodeMsgBundle from '../useCodeMsgBundle';

/**회원가입 api */
export const postSignupInfo = (info: SignupInfo) => {
  return instance({
    method: 'post',
    url: `/auth/api/v1/hospital/signup`,
    data: JSON.stringify(info),
  });
};

/**회원가입 파일 업로드 api */
export const postAuthFileUpload = (file: FormData) => {
  return instance({
    method: 'post',
    url: `/auth/api/v1/hospital/upload`,
    data: file,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**회원가입 mutation react query */
export const useSignupInfoMutation = (props: {
  info: HospitalInfo;
  authFileUlid: AuthFileUlid;
  mobile: string;
}) => {
  const { info, authFileUlid, mobile } = props;
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { mutate: postSignupInfoMutate } = useMutation((person: SignupInfo) =>
    postSignupInfo(person),
  );
  const onSignup = useCallback(
    (onSuccess: () => void) => {
      const authData = info;
      const authFile = authFileUlid;
      const signInfo: SignupInfo = {
        email: authData.email,
        accountId: authData.id,
        password: authData.pw,
        reenterPassword: authData.repw,
        adminNameKo: authData.name,
        adminMobileNum: mobileFormatOff(mobile),
        hospitalNameKo: authData.hocName,
        hospitalCode: authData.hospitalCode,
        hospitalAddr: authData.hocAddress,
        hospitalAddrDetail: authData.addressDetail,
        hospitalZipCode: authData.postCode,
        hospitalPhoneNum: mobileFormatOff(authData.hocPhone),
        bizRegNum: mobileFormatOff(authData.buisNum),
        bizCertFileUlid: authFile.businessLicense,
        passbookCopyFileUlid: authFile.bankbookCopy,
      };

      postSignupInfoMutate(signInfo, {
        onSuccess: (res) => {
          if (res) {
            if (res.data.code !== '0000') {
              toast?.on(msg.errMsg(res.data.code), 'error');
            } else {
              onSuccess();
            }
          }
        },
        onError(error: any, variables, context) {
          toast?.on(
            `회원가입이 실패하였습니다 \n- 정보 입력 내용을 다시 한번 확인해 주세요`,
            'error',
          );
        },
      });
    },
    [authFileUlid, info, mobile, msg, postSignupInfoMutate, toast],
  );

  return { onSignup };
};

/**회원가입 파일 업로드 mutation react query */
export const useAuthFileUpload = () => {
  const queryClient = useQueryClient();
  return useMutation((person: FormData) => postAuthFileUpload(person), {
    onError: (error, variable, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['signup', 'post', 'file']);
    },
  });
};
