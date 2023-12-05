import { useCallback } from 'react';
import { ModalType } from 'types/signin';
import { useToastContext } from '@hooks/useToastContext';
import useQueueCancellation from '@components/queue/hooks/useQueueCancellation';
import QueueCancellationView from '@components/queue/views/QueueCancellationView';
import { useTelemedicineTreatCabcel } from '@hooks/api/hospitalDoctor/doctorQueue';
import { ReceptionRefusalPostDto } from '@components/reception/type';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useRouter } from 'next/router';

interface QueueCancellationType extends ModalType {
  refusalId: string;
}
const QueueCancellation = (props: QueueCancellationType) => {
  const { handleClose, open, refusalId } = props;
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const router = useRouter();
  const { mutate: mutateTelemedicineTreatCabcel } = useTelemedicineTreatCabcel(
    router.query,
  );
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
        if (codeMsg === '7108') {
          toast?.on('해당 비대면 진료 건이 취소되었습니다.', 'error');
          modlaClose();
          return;
        }
        if (codeMsg !== '0000')
          return toast?.on(msg.errMsg(data.data.code), 'error');
        modlaClose();
        toast?.on('진료 취소 사유 등록에 완료하였습니다.', 'success');
      },
      onError() {
        toast?.on(
          '진료 취소 사유 등록에 실패하였습니다. \n 잠시 후, 다시 시도해 주세요',
          'error',
        );
      },
    });
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
export default QueueCancellation;
