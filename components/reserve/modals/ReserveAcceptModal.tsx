import { ModalType } from 'types/signin';
import { useCallback, useEffect } from 'react';
import useReceptionAccept from '@components/reception/hooks/useReceptionAccept';
import { ReceptionAcceptTemplateType } from '@components/reception/type';
import RegistrationAcceptView from '@components/reception/views/RegistrationAcceptView';
import ReserveStateModal from './ReserveStateModal';
import useReserveAcceptMutation from '../hooks/useReserveAcceptMutation';
import { useDoctorReceptionAccept } from '@hooks/api/hospitalDoctor/doctorReception';
import { useToastContext } from '@hooks/useToastContext';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';

interface ReceptionAcceptModalType extends ModalType {
  ulid: string;
  name: string;
}
/**ReserveAcceptModal 예약 수락 모달*/
const ReserveAcceptModal = (props: ReceptionAcceptModalType) => {
  /**ReserveAcceptModal 예약 사용자 use hook*/
  const { data: req, isError } = useDoctorReceptionAccept(props.ulid);
  const toast = useToastContext();
  const msg = useCodeMsgBundle();

  /**ReserveAcceptModal 예약 정보*/
  useEffect(() => {
    if (req) {
      if (req.data.code !== '0000') return toast?.on(msg.errMsg(req.data.code), 'error');
      if (isError) return toast?.on('잘못된 요청입니다.', 'error');
    }
  }, [req, isError, msg, toast]);

  /**ReserveAcceptModal 예약 사용자 정보 처리*/
  if (!req || req.data.code !== '0000') return <></>;
  const { data } = req.data;
  const info = {
    name: data.residentNameKo as string,
    registration: data.residentRegistrationNum as string,
    patientRegistrationNum: data.patientRegistrationNum as string,
    mobile: data.residentMobileNumNum as string,
  };

  return <ReserveAcceptTemplate data={info} {...props} />;
};

/**ReserveAcceptTemplate 예약 수락 template */
const ReserveAcceptTemplate = (props: ReceptionAcceptTemplateType) => {
  /**ReserveAcceptTemplate 예약 수락 feature custom hook */
  const accptFn = useReceptionAccept(props);
  const queryAcceptProps = {
    ulid: props.ulid,
    mrn: accptFn.mrn,
    patientRegistrationNum: props.data.patientRegistrationNum,
    onOpenReset: accptFn.onOpenReset,
  };
  /**ReserveAcceptTemplate 예약 수락 통신 custom hook*/
  const { onRegistration, isState, resultState, setResultState } =
    useReserveAcceptMutation(queryAcceptProps);

  const handleResetModalState = useCallback(() => {
    accptFn.onOpenReset();
    setResultState('');
  }, [accptFn, setResultState]);

  const receptionAcceptViewProps = {
    ...accptFn,
    ...props.data,
    onOpenReset: handleResetModalState,
    onRegistration: onRegistration,
    bgDisabled: isState,
  };

  return (
    <>
      <RegistrationAcceptView {...receptionAcceptViewProps} />
      <ReserveStateModal open={isState} handleClose={handleResetModalState} name={resultState} />
    </>
  );
};

export default ReserveAcceptModal;
