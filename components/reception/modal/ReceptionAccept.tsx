import { ModalType } from 'types/signin';
import { useCallback, useContext, useEffect } from 'react';
import { useToastContext } from '@hooks/useToastContext';
import useReceptionAccept from '../hooks/useReceptionAccept';
import ReceptionAcceptView from '../views/ReceptionAcceptView';
import { ReceptionFilterContext } from '../contexts/ReceptionFilterContext';
import { ReceptionAcceptPostDto, ReceptionAcceptTemplateType } from '../type';
import {
  useDoctorReceptionAccept,
  usePutDoctorReceptionAccept,
  usePutPatientRegistionNum,
} from '@hooks/api/hospitalDoctor/doctorReception';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useRouter } from 'next/router';

interface ReceptionAcceptModalType extends ModalType {
  ulid: string;
}

const ReceptionAccept = (props: ReceptionAcceptModalType) => {
  const { data } = useDoctorReceptionAccept(props.ulid);
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
      name: data.data.data.residentNameKo,
      registration: data.data.data.residentRegistrationNum,
      patientRegistrationNum: data.data.data.patientRegistrationNum,
      mobile: data.data.data.residentMobileNumNum,
    };
    return <ReceptionAcceptTemplate data={info} {...props} />;
  }

  return <></>;
};

const ReceptionAcceptTemplate = (props: ReceptionAcceptTemplateType) => {
  const router = useRouter();
  const { mutate: mutatePutPatientRegist } = usePutPatientRegistionNum();
  const { mutate: mutatePutDoctorReceptionAccept } =
    usePutDoctorReceptionAccept(router.query);
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
                    toast?.on(msg.errMsg(data.data.code), 'error');
                  } else {
                    onOpenReset();
                    toast?.on(
                      '환자 등록번호 등록에 완료하였습니다.',
                      'success',
                    );
                  }
                }
              },
            });
          }
        }
      },
      onError() {
        toast?.on(
          '환자 등록번호 등록에 실패하였습니다\n 잠시 후, 다시 시도해 주세요',
          'error',
        );
      },
    });
  }, [
    mrn,
    msg,
    mutatePutDoctorReceptionAccept,
    mutatePutPatientRegist,
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

export default ReceptionAccept;
