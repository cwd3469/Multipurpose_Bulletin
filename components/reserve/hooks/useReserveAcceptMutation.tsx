import { ReceptionAcceptPostDto } from '@components/reception/type';
import { usePutPatientRegistionNum } from '@hooks/api/hospitalDoctor/doctorReception';
import { apiPutDoctorReserveAccept } from '@hooks/api/hospitalDoctor/doctorReserve';
import { RESERVE_LIST } from '@hooks/api/hospitalDoctor/queryKey';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useToastContext } from '@hooks/useToastContext';
import { useCallback, useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ReserveContext } from '../contexts/ReserveContext';

/**useReserveAcceptMutation 예약 수락 api 통신 custom hook*/
const useReserveAcceptMutation = (props: {
  ulid: string;
  mrn: string;
  patientRegistrationNum: string;
  onOpenReset: () => void;
}) => {
  const { ulid, mrn, patientRegistrationNum, onOpenReset } = props;
  /**useReserveAcceptMutation use hook*/
  const [resultState, setResultState] = useState<string>('');
  const queryClient = useQueryClient();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { queryString } = useContext(ReserveContext);
  const { mutate: mutatePutPatientRegist } = usePutPatientRegistionNum();
  const { mutate: mutatePutDoctorReceptionAccept } = useMutation(apiPutDoctorReserveAccept);

  /**useReserveAcceptMutation 예약 수락 기능 */
  const onRegistration = useCallback(() => {
    const dto: ReceptionAcceptPostDto = {
      ulid: ulid,
      patientRegisterNumber: patientRegistrationNum ? patientRegistrationNum : mrn,
    };
    mutatePutPatientRegist(dto, {
      onSuccess(data, variables, context) {
        if (data) {
          if (data.data.code !== '0000') {
            toast?.on(msg.errMsg(data.data.code), 'error');
          } else {
            mutatePutDoctorReceptionAccept(props.ulid, {
              onSuccess(data, variables, context) {
                if (data) {
                  if (data.data.code !== '0000') {
                    switch (data.data.code) {
                      case '0200':
                        return setResultState('cancelled');
                      case '0201':
                        return setResultState('failed');
                      default:
                        return setResultState('failed');
                    }
                  }
                  queryClient.invalidateQueries(RESERVE_LIST(queryString));
                  onOpenReset();
                  setResultState('success');
                  return;
                }
              },
            });
          }
        }
      },
      onError() {
        toast?.on('환자 등록번호 등록에 실패하였습니다\n 잠시 후, 다시 시도해 주세요', 'error');
      },
    });
  }, [
    mrn,
    msg,
    mutatePutDoctorReceptionAccept,
    mutatePutPatientRegist,
    onOpenReset,
    patientRegistrationNum,
    props.ulid,
    queryClient,
    queryString,
    toast,
    ulid,
  ]);
  const isState = resultState ? true : false;
  return { onRegistration, isState, resultState, setResultState };
};

export default useReserveAcceptMutation;
