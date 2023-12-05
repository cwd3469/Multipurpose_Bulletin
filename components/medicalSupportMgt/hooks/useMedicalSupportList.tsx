import {
  apiMedicalSupportList,
  SUPPORTLIST,
} from '@hooks/api/hospitalAdmin/supportMgt';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import AxiosContext from '@hooks/contexts/AxiosContext';
import { useToastContext } from '@hooks/useToastContext';
import { transQueryString } from '@utils/transtext';
import { ParsedUrlQuery } from 'querystring';
import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { MedicalSupportMgtType } from '../type';

const useMedicalSupportList = (props: { filter: ParsedUrlQuery }) => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const active = useContext(AxiosContext);
  const queryKey = transQueryString(props.filter);
  const { data, isLoading, isError } = useQuery(
    SUPPORTLIST(props.filter),
    async () => {
      active.setProgressBarDisabledFn(true);
      const data = await apiMedicalSupportList(queryKey);
      return data;
    },
  );
  const code = data?.data.code;
  const supportListData: MedicalSupportMgtType[] = isLoading
    ? []
    : code === '0000'
    ? data?.data.data.page.content
    : [];

  const totalPages = code === '0000' ? data?.data.data.page.totalPages : 0;

  useEffect(() => {
    if (data) {
      if (code !== '0000') {
        toast?.on(msg.errMsg(code), 'error');
      }
    }
  }, [code, data, msg, toast]);

  return { supportListData, totalPages, isLoading, isError };
};

export default useMedicalSupportList;
