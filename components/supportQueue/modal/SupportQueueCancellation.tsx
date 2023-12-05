import { useCallback, useContext } from 'react';
import { ModalType } from 'types/signin';
import { useToastContext } from '@hooks/useToastContext';
import useQueueCancellation from '@components/queue/hooks/useQueueCancellation';
import QueueCancellationView from '@components/queue/views/QueueCancellationView';
import { useSupportQueueCancel } from '@hooks/api/hospitalSupport/supportQueue';
import { SupportQueueFilterContext } from '../contexts/SupportQueueFilterContext';
import { ReceptionRefusalPostDto } from '@components/reception/type';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useRouter } from 'next/router';

interface SupportQueueCancellation extends ModalType {
  refusalId: string;
}
const SupportQueueCancellation = (props: SupportQueueCancellation) => {
  const { handleClose, open } = props;
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { reset, handleRefusal, refusalVaild, disabled, err, value } =
    useQueueCancellation();
  const router = useRouter();
  const { mutate } = useSupportQueueCancel(router.query);
  const modlaClose = useCallback(() => {
    reset();
    handleClose();
  }, [handleClose, reset]);

  const registration = () => {
    const data: ReceptionRefusalPostDto = {
      reasonsRefusal: value,
      ulid: props.refusalId,
    };
    mutate(data, {
      onSuccess(data) {
        if (data.data.code !== '0000') {
          toast?.on(msg.errMsg(data.data.code), 'error');
          return;
        }
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
export default SupportQueueCancellation;
