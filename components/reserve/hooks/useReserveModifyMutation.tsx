import { ReceptionAcceptPostDto } from '@components/reception/type';
import {
  apiDoctorReserveModify,
  apiPutReservePatientRegistionNum,
} from '@hooks/api/hospitalDoctor/doctorReserve';
import { useMutation, useQueryClient } from 'react-query';
import { ModifyReserveDto } from '../type';
import useInModalAlert from '@hooks/utils/modal/useInModalAlert';
import { useCallback, useContext } from 'react';
import dayjs from 'dayjs';
import { ReserveContext } from '../contexts/ReserveContext';
import { RESERVE_LIST } from '@hooks/api/hospitalDoctor/queryKey';

/** 진료 예약 사용자 정보
 * PUT API */
export const usePutPatientRegistionNum = () => {
  return useMutation((prams: ReceptionAcceptPostDto) => apiPutReservePatientRegistionNum(prams), {
    onError: (error, variable, context) => {
      console.log(error);
    },
  });
};

/**useReserveModifyMutation 예약 수정 mutation custom hook */
const useReserveModifyMutation = (
  props: ModifyReserveDto & {
    reasonSelect: string;
    handleClose: () => void;
  },
): {
  /**useReserveModifyMutation 예약 수정 기능 */
  onReserveModify: () => void;
} => {
  const { reason, updateDate, timetable, reasonSelect, reservationUlid } = props;
  const info = useInModalAlert();
  const queryClient = useQueryClient();
  const { queryString } = useContext(ReserveContext);
  const { mutate: mutateDoctorReserveModify } = useMutation(apiDoctorReserveModify);

  /**useReserveModifyMutation 예약 수정 기능 */
  const onReserveModify = useCallback(() => {
    const at = dayjs(updateDate).format(`YYYY-MM-DD ${timetable}:10`);
    const errFn = (msg?: string) =>
      info.onSetModalToast(
        {
          on: true,
          msg: msg ? msg : '예약 변경에 실패했습니다. 잠시 후, 다시 시도해 주세요.',
          severity: 'error',
        },
        'reseveModify',
      );
    const dto = {
      data: {
        editReason: reasonSelect === 'DIRECT' ? reason : '- 사정',
        editDate: at,
      },
      reservationUlid: reservationUlid,
    };

    mutateDoctorReserveModify(dto, {
      onError() {
        errFn();
      },
      onSuccess(data, variables, context) {
        if (data.data.code !== '0000') return errFn('예약건을 찾을 수 없습니다.');
        props.handleClose();
        queryClient.invalidateQueries(RESERVE_LIST(queryString));
        return;
      },
    });
  }, [
    updateDate,
    timetable,
    reasonSelect,
    reason,
    reservationUlid,
    mutateDoctorReserveModify,
    info,
    props,
    queryClient,
    queryString,
  ]);

  return { onReserveModify };
};

export default useReserveModifyMutation;
