import { apiGetPofileDoctorDetail } from '@hooks/api/hospitalAdmin/doctorMgt';
import { useQuery } from 'react-query';
import { useToastContext } from '@hooks/useToastContext';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useRouter } from 'next/router';

type useDoctorInfoDetailType = {
  userId: string;
};

const useDoctorInfoDetail = (props: useDoctorInfoDetailType) => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const router = useRouter();

  const { isError, isLoading, data, isSuccess } = useQuery(
    ['admin', 'get', 'doctorInfo'],
    async () => {
      const data = await apiGetPofileDoctorDetail(props.userId);
      return data;
    },
  );
  const code = data?.data.code;
  const doctorInfo = data?.data.data;

  return { doctorInfo, code, isLoading, isError, isSuccess };
};

export default useDoctorInfoDetail;
