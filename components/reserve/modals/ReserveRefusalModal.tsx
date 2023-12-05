import { ModalType } from 'types/signin';
import RefusalModalViewView from '../views/RefusalModalView';
import useReserveRefusal from '../hooks/useReserveRefusal';
import useResetveRefusalMutation from '../hooks/useResetveRefusalMutation';
import useReserveModal from '../hooks/useReserveModal';

type ReserveRefusalModal = ModalType & {
  ulid?: string;
  name: string;
};
/**ReserveRefusalModal 예약 거절 모달*/
const ReserveRefusalModal = (props: ReserveRefusalModal) => {
  const { open, handleClose, ulid, name } = props;
  const userInfo = useReserveModal();
  const refusal = useReserveRefusal({ handleClose });
  const stateName =
    userInfo.info && userInfo.info.status === 'RESERVED_ACCEPT' ? 'receptionRefusal' : name;
  const { refusalHandleEvent } = useResetveRefusalMutation({
    name: stateName,
    onSuccess: () => refusal.refusalHandleResetClose(),
    select: refusal.refusalSelect,
    value: refusal.refusalValue,
  });

  if (!ulid) return <></>;

  return (
    <RefusalModalViewView
      refusalOpen={open}
      refusalHandleEvent={refusalHandleEvent}
      refusalUlid={ulid}
      {...refusal}
    />
  );
};
export default ReserveRefusalModal;
