import useInModalAlert from '@hooks/utils/modal/useInModalAlert';
import { useCallback, useContext } from 'react';
import { ReserveContext } from '../contexts/ReserveContext';
import { useMutation, useQueryClient } from 'react-query';
import { apiPutReserveRefusal } from '@hooks/api/hospitalDoctor/doctorReserve';
import { RESERVE_LIST } from '@hooks/api/hospitalDoctor/queryKey';
import useReserveModal from './useReserveModal';
import { apiPutDoctorReceptionRefusal } from '@hooks/api/hospitalDoctor/doctorReception';
export type UseResetveRefusalData = {
  /**예약 거절 기능 */
  refusalHandleEvent: (select: string, value: string) => void;
};
/**useResetveRefusalPut 예약 거절 api 통신 기능 */
const useResetveRefusalMutation = (props: {
  name: string;
  onSuccess: () => void;
  select: string;
  value: string;
}): UseResetveRefusalData => {
  const { name, onSuccess, select, value } = props;
  const alertIn = useInModalAlert();
  const { info } = useReserveModal();
  const { queryString } = useContext(ReserveContext);
  const queryClient = useQueryClient();
  const { mutate: mutatePutReserveRefusal } = useMutation(apiPutReserveRefusal);
  const { mutate: mutatePutReceptionRefusal } = useMutation(apiPutDoctorReceptionRefusal);
  const ulid = info ? info.registrationUlid : '';
  const reason = select === 'DEFAULT' ? '- 사정' : value;

  /**useResetveRefusalMutation error alert */
  const errorFn = useCallback(
    () =>
      alertIn.onSetModalToast(
        {
          on: true,
          msg: '사유 등록에 실패하였습니다. 잠시 후, 다시 시도해 주세요.',
        },
        'reseveRefusal',
      ),
    [alertIn],
  );

  /**useResetveRefusalMutation onSuccessFn 기능 */
  const onSuccessFn = useCallback(() => {
    onSuccess();
    queryClient.invalidateQueries(RESERVE_LIST(queryString));
  }, [onSuccess, queryClient, queryString]);

  /**useResetveRefusalPut 예약 거절 요청 기능 */
  const refusalHandleEvent = useCallback(() => {
    if (!info) return;
    const dto = {
      registrationUlid: ulid,
      refuseReason: reason,
    };
    mutatePutReserveRefusal(dto, {
      onError() {
        errorFn();
      },
      onSuccess(data, variables, context) {
        if (data.data.code !== '0000') return errorFn();
        return onSuccessFn();
      },
    });
  }, [errorFn, info, mutatePutReserveRefusal, onSuccessFn, reason, ulid]);

  /**useResetveRefusalPut 접수 거절 요청 기능 */
  const receptionRefusalHandleEvent = useCallback(() => {
    if (!info) return;
    const dto = {
      ulid: ulid,
      reasonsRefusal: reason,
    };
    mutatePutReceptionRefusal(dto, {
      onError() {
        errorFn();
      },
      onSuccess(data, variables, context) {
        if (data.data.code !== '0000') return errorFn();
        return onSuccessFn();
      },
    });
  }, [errorFn, info, mutatePutReceptionRefusal, onSuccessFn, reason, ulid]);

  return {
    refusalHandleEvent: name === 'reseveRefusal' ? refusalHandleEvent : receptionRefusalHandleEvent,
  };
};

export default useResetveRefusalMutation;
