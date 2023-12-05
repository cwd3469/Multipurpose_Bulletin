import { useCallback, useContext } from 'react';
import { ModalType } from 'types/signin';
import { useToastContext } from '@hooks/useToastContext';
import useReceptionRefusal from '../hooks/useReceptionRefusal';
import ReceptionRefusalView from '../views/ReceptionRefusalView';
import { usePutDoctorReceptionRefusal } from '@hooks/api/hospitalDoctor/doctorReception';
import { ReceptionFilterContext } from '../contexts/ReceptionFilterContext';
import { ReceptionRefusalPostDto } from '../type';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useRouter } from 'next/router';

interface ReceptionRefusalModalType extends ModalType {
  ulid: string;
}

const ReceptionRefusal = (props: ReceptionRefusalModalType) => {
  const { handleClose, open } = props;
  const router = useRouter();
  const { mutate: mutatePutDoctorReceptionRefusal } =
    usePutDoctorReceptionRefusal(router.query);
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const {
    reset,
    onChangeRefusal,
    onSelectRefusal,
    refusalVaild,
    disabled,
    modalDisabled,
    err,
    value,
    refusalState,
    refusal,
  } = useReceptionRefusal();

  const modlaClose = useCallback(() => {
    reset();
    handleClose();
  }, [handleClose, reset]);

  const registration = useCallback(() => {
    const filter = refusal.filter((item) => {
      return item.id === refusalState;
    });

    const dto: ReceptionRefusalPostDto = {
      reasonsRefusal: value ? value : filter[0].name,
      ulid: props.ulid,
    };

    mutatePutDoctorReceptionRefusal(dto, {
      onSuccess(data, variables, context) {
        if (data.data.code !== '0000') {
          toast?.on(msg.errMsg(data.data.code), 'error');
        } else {
          modlaClose();
          toast?.on('해당 환자의 접수가 거절되었습니다.', 'success');
        }
      },
      onError() {
        toast?.on(
          '접수 거절 사유 등록에 실패하였습니다\n 잠시 후, 다시 시도해 주세요',
          'error',
        );
      },
    });
  }, [
    modlaClose,
    msg,
    mutatePutDoctorReceptionRefusal,
    props.ulid,
    refusal,
    refusalState,
    toast,
    value,
  ]);

  return (
    <ReceptionRefusalView
      registration={registration}
      modlaClose={modlaClose}
      onChangeRefusal={onChangeRefusal}
      onSelectRefusal={onSelectRefusal}
      refusalVaild={refusalVaild}
      disabled={disabled}
      modalDisabled={modalDisabled}
      open={open}
      err={err}
      value={value}
      refusalState={refusalState}
      refusal={refusal}
    />
  );
};
export default ReceptionRefusal;
