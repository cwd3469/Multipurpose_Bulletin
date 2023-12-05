import {
  apiMedicalSupportDetail,
  SUPPORTDETAIL,
} from '@hooks/api/hospitalAdmin/supportMgt';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useToastContext } from '@hooks/useToastContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { MedicalSupportInfoType } from '../type';

const useQueryMedicalSupportDetail = (props: { ulid: string }) => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { data, isLoading, isError } = useQuery(SUPPORTDETAIL(), async () => {
    const data = await apiMedicalSupportDetail(props.ulid);
    return data;
  });
  const code = data?.data.code;
  const supportInfo = data?.data.data;

  useEffect(() => {
    if (isError) {
      toast?.on(
        '진료 지원 조회에 실패 하였습니다. \n 잠시후 다시 시도 해 보세요.',
        'error',
      );
    }
    if (data) {
      if (code !== '0000') {
        toast?.on(msg.errMsg(code), 'error');
      }
    }
  }, [code, data, isError, msg, toast]);

  return { supportInfo, isLoading, isError };
};

export default useQueryMedicalSupportDetail;
