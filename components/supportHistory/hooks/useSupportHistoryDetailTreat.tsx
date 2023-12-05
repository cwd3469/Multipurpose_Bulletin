import {
  SupportTreatHistoryDetailDto,
  TreatHistoryDetailDto,
} from '@components/waitingRoom/type';
import { SUPPORTHISTORYDETAIL } from '@hooks/api/hospitalSupport/queryKey';
import { apiSupportHistoryDetailTreat } from '@hooks/api/hospitalSupport/supportHistory';
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
const useSupportHistoryDetailTreat = (ulid: string) => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const router = useRouter();
  const info = useContext(UserInfoContext);
  const { data, isError, isLoading } = useQuery(
    SUPPORTHISTORYDETAIL(ulid),
    async () => {
      const data = await apiSupportHistoryDetailTreat(ulid);
      return data;
    },
  );
  const code = data?.data.code;

  const backUrl = useCallback(() => {
    router.replace('/medical-support/telemedicine/history');
  }, [router]);

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

  const historyDetailData: SupportTreatHistoryDetailDto | undefined = data
    ? data.data.data
    : undefined;

  return { historyDetailData, isLoading };
};

export default useSupportHistoryDetailTreat;
