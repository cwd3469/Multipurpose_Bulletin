import {
  TreatHistoryDetailDto,
  WaitingGetDto,
} from '@components/waitingRoom/type';
import { apiHistoryDetailTreat } from '@hooks/api/hospitalDoctor/doctorHistory';
import { HISTORYDETAIL } from '@hooks/api/hospitalDoctor/queryKey';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import UserInfoContext from '@hooks/contexts/UserInfoContext';
import { useToastContext } from '@hooks/useToastContext';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';

/**진료 내역 상세
 * 리엑트 쿼리 훅
 */
const useHistoryDetailTreat = (ulid: string) => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const router = useRouter();
  const backUrl = useCallback(() => {
    router.replace('/doctor/telemedicine/history');
  }, [router]);

  const info = useContext(UserInfoContext);
  const { data, isError, isLoading } = useQuery(
    HISTORYDETAIL(ulid),
    async () => {
      const data = await apiHistoryDetailTreat(ulid);
      return data;
    },
  );
  const code = data?.data.code;

  useEffect(() => {
    if (isError) {
      toast?.on(msg.errMsg(code), 'error');
      backUrl();
    }
  }, [backUrl, code, info.permission, isError, msg, router, toast]);

  useEffect(() => {
    if (data) {
      if (code !== '0000') {
        toast?.on(msg.errMsg(code), 'error');
        backUrl();
      }
    }
  }, [backUrl, code, data, info.permission, msg, router, toast]);

  const historyDetailData: TreatHistoryDetailDto | undefined = data
    ? data.data.data
    : undefined;

  return { historyDetailData, isLoading };
};

export default useHistoryDetailTreat;
