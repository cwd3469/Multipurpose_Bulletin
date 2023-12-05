import { useCallback, useContext } from 'react';
import { ModalType } from 'types/signin';
import { useToastContext } from '@hooks/useToastContext';
import useQueueCancellation from '@components/queue/hooks/useQueueCancellation';
import QueueCancellationView from '@components/queue/views/QueueCancellationView';
import { useTelemedicineTreatCabcel } from '@hooks/api/hospitalDoctor/doctorQueue';
import { QueueFilterContext } from '@components/queue/contexts/QueueFilterContext';
import { ReceptionRefusalPostDto } from '@components/reception/type';
import WaitingUlidContext from '../context/WaitingUlidContext';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

export interface WaitingRoomModal extends ModalType {
  setState: () => void;
  leaveVideo?: () => Promise<void>;
  stateCancel: () => void;
}

const WaitingRoomTreatmentCancel = (props: WaitingRoomModal) => {
  const { handleClose, open, stateCancel } = props;
  const router = useRouter();
  const { ulid: refusalId } = useContext(WaitingUlidContext);
  const { mutate: mutateTelemedicineTreatCabcel } = useTelemedicineTreatCabcel(
    router.query,
  );
  const msg = useCodeMsgBundle();
  const toast = useToastContext();
  const { reset, handleRefusal, refusalVaild, disabled, err, value } =
    useQueueCancellation();
  const modlaClose = useCallback(() => {
    reset();
    handleClose();
  }, [handleClose, reset]);

  const registration = () => {
    const data: ReceptionRefusalPostDto = {
      reasonsRefusal: value,
      ulid: refusalId,
    };
    mutateTelemedicineTreatCabcel(data, {
      onSuccess(data) {
        const codeMsg = data.data.code;
        if (codeMsg === '7108') return stateCancel();
        if (codeMsg !== '0000')
          return toast?.on(msg.errMsg(data.data.code), 'error');
        if (codeMsg === '0000') {
          modlaClose();
          router.replace('/doctor/telemedicine/queueing');
          toast?.on('진료 취소 사유 등록에 완료하였습니다.', 'success');
        }
      },
      onError() {
        toast?.on(
          '진료 취소 사유 등록에 실패하였습니다. \n 잠시 후, 다시 시도해 주세요',
          'error',
        );
      },
    });
    if (props.leaveVideo) {
      props.leaveVideo();
    }
  };

  return (
    <QueueCancellationView
      handleRefusal={handleRefusal}
      refusalVaild={refusalVaild}
      disabled={disabled}
      err={err}
      value={value}
      modlaClose={modlaClose}
      registration={registration}
      open={open}
    />
  );
};
export default WaitingRoomTreatmentCancel;
