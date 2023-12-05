import { useCallback } from 'react';
import { useEditPasswordSignin } from '@hooks/api/user/signin';
import { useToastContext } from '@hooks/useToastContext';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';

const useSigninExcessChange = () => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { mutate: postEditPasswordMutate } = useEditPasswordSignin();
  const handlePwChange = useCallback(
    (params: {
      signinOn: (tokens: { accessToken: string; refreshToken: string }) => void;
      info: {
        password: string;
        reenterPassword: string;
        accessToken: string;
      };
    }) => {
      const { signinOn, info } = params;

      postEditPasswordMutate(info, {
        onSuccess: (res) => {
          const code = res.data.code;
          if (res.data.status === 'SUCCESS') {
            if (res.data.data) {
              signinOn({
                accessToken: res.data.data.accessToken,
                refreshToken: res.data.data.refreshToken,
              });
            }
          }
          if (res.data.status === 'FAIL') {
            toast?.on(msg.errMsg(code), 'error');
            return;
          }
        },
        onError: (err) => {
          toast?.on(
            '비밀번호 변경에 실패하였습니다.\n잠시 후, 다시 시도해 주세요.',
            'error',
          );
        },
      });
    },
    [postEditPasswordMutate, toast, msg],
  );
  return { handlePwChange };
};

export default useSigninExcessChange;
