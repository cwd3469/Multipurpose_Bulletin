import { ModalType } from 'types/signin';
import { useCallback, useContext, useEffect } from 'react';
import { useToastContext } from '@hooks/useToastContext';
import {
  usePutSupportReceptionAccept,
  useSupportReceptionAccept,
} from '@hooks/api/hospitalSupport/supportReception';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { SupportReceptionContext } from '../contexts/SupportReceptionContext';
import {
  ReceptionAcceptPostDto,
  ReceptionAcceptTemplateType,
} from '@components/reception/type';
import useReceptionAccept from '@components/reception/hooks/useReceptionAccept';
import ReceptionAcceptView from '@components/reception/views/ReceptionAcceptView';
import { useRouter } from 'next/router';

interface ReceptionAcceptModalType extends ModalType {
  ulid: string;
}

const SupportReceptionAccept = (props: ReceptionAcceptModalType) => {
  const { data } = useSupportReceptionAccept(props.ulid);
  const toast = useToastContext();
  const msg = useCodeMsgBundle();

  useEffect(() => {
    if (data) {
      if (data.data.code !== '0000') {
        toast?.on(msg.errMsg(data.data.code), 'error');
      }
    }
  }, [data, msg, toast]);

  if (data) {
    const info = {
      name: data.data.data.patientNameKo,
      registration: data.data.data.residentRegistrationNum,
      patientRegistrationNum: data.data.data.patientRegistrationNum,
      mobile: data.data.data.patientMobileNumNum,
    };
    return <ReceptionAcceptTemplate data={info} {...props} />;
  }

  return <></>;
};

const ReceptionAcceptTemplate = (props: ReceptionAcceptTemplateType) => {
  const { filter, date } = useContext(SupportReceptionContext);
  const router = useRouter();
  const { mutate: mutatePutSupportReceptionAccept } =
    usePutSupportReceptionAccept(router.query);
  const { open, mrn, mrnErr, disabled, residentNum, onOpenReset, onChangeMrm } =
    useReceptionAccept(props);
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const onRegistration = useCallback(() => {
    const dto: ReceptionAcceptPostDto = {
      ulid: props.ulid,
      patientRegisterNumber: props.data.patientRegistrationNum
        ? props.data.patientRegistrationNum
        : mrn,
    };

    mutatePutSupportReceptionAccept(dto, {
      onSuccess(data, variables, context) {
        if (data) {
          if (data.data.code !== '0000') {
            toast?.on(msg.errMsg(data.data.code), 'error');
          } else {
            onOpenReset();
            toast?.on('환자 등록번호 등록에 완료하였습니다.', 'success');
          }
        }
      },
    });
  }, [
    mrn,
    msg,
    mutatePutSupportReceptionAccept,
    onOpenReset,
    props.data.patientRegistrationNum,
    props.ulid,
    toast,
  ]);

  return (
    <ReceptionAcceptView
      name={props.data.name}
      mobile={props.data.mobile}
      open={open}
      mrn={mrn}
      mrnErr={mrnErr}
      disabled={disabled}
      residentNum={residentNum}
      patientRegistrationNum={props.data.patientRegistrationNum}
      onOpenReset={onOpenReset}
      onChangeMrm={onChangeMrm}
      onRegistration={onRegistration}
    />
  );
};

export default SupportReceptionAccept;
