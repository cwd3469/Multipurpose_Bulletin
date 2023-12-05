import { useCallback, useContext } from 'react';
import { ModalType } from 'types/signin';
import { useToastContext } from '@hooks/useToastContext';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import useReceptionRefusal from '@components/reception/hooks/useReceptionRefusal';
import { ReceptionRefusalPostDto } from '@components/reception/type';
import { usePutSupportReceptionRefusal } from '@hooks/api/hospitalSupport/supportReception';
import { SupportReceptionContext } from '../contexts/SupportReceptionContext';
import ReceptionRefusalView from '@components/reception/views/ReceptionRefusalView';
import { useRouter } from 'next/router';

interface ReceptionRefusalModalType extends ModalType {
  ulid: string;
}

const SupportReceptionRefusal = (props: ReceptionRefusalModalType) => {
  const { handleClose, open } = props;
  const { filter, date } = useContext(SupportReceptionContext);
  const router = useRouter();
  const { mutate: mutatePutSupportReceptionRefusal } =
    usePutSupportReceptionRefusal(router.query);
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

    mutatePutSupportReceptionRefusal(dto, {
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
    mutatePutSupportReceptionRefusal,
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
export default SupportReceptionRefusal;
