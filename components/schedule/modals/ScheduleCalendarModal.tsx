import React from 'react';
import { ModalType } from 'types/signin';
import { useDebounceFn } from 'ahooks';
import WConfirmModal from '@components/common/modal/WConfirmModal';
import useServerSchedulePost from '../hooks/useServerSchedulePost';
import useInModalAlert from '@hooks/utils/modal/useInModalAlert';
import { ScheduleModalLayout } from '../modules/view/ScheduleStyle';

const ScheduleCalendarModal = (props: ModalType) => {
  const { open, handleClose } = props;
  const info = useInModalAlert();
  const { postScheduleToServer } = useServerSchedulePost({ handleClose });
  const onDebounceFnHandleEvent = useDebounceFn(postScheduleToServer, {
    wait: 300,
  });

  const alertMsg = {
    onAlert: info.modalToast ? (info.modalToast.on ? info.modalToast.on : false) : false,
    msg: info.modalToast ? (info.modalToast.msg ? info.modalToast.msg : '') : '',
  };

  return (
    <WConfirmModal
      maxWidth="lg"
      title={'스케줄 저장'}
      handleClose={handleClose}
      handleEvent={onDebounceFnHandleEvent.run}
      open={open}
      activeOn
      titleSx={{
        padding: '50px 0 60px',
      }}
      setAlert
      onAlert={alertMsg.onAlert}
      msg={alertMsg.msg}
      severity={'error'}
    >
      <ScheduleModalLayout
        src={'/assets/icons/processStatusCheck.svg'}
        mainContents={'저장'}
        contents={' 하시겠습니까?'}
      />
    </WConfirmModal>
  );
};

export default ScheduleCalendarModal;
