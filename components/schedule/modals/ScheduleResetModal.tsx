import React, { useContext } from 'react';
import { ModalType } from 'types/signin';
import { useDebounceFn } from 'ahooks';
import WConfirmModal from '@components/common/modal/WConfirmModal';
import { ScheduleModalLayout } from '../modules/view/ScheduleStyle';
import { ScheduleContext } from '../contexts/ScheduleContext';

const ScheduleResetModal = (props: ModalType) => {
  const { open, handleClose } = props;
  const { initTimeList } = useContext(ScheduleContext);
  const resetTimeList = () => {
    initTimeList && initTimeList();
    handleClose();
  };
  const onDebounceFnHandleEvent = useDebounceFn(resetTimeList, {
    wait: 300,
  });
  return (
    <WConfirmModal
      maxWidth="lg"
      title={'예약 시간 비우기'}
      handleClose={handleClose}
      handleEvent={onDebounceFnHandleEvent.run}
      open={open}
      activeOn
      titleSx={{
        padding: '50px 0 60px',
      }}
      setAlert
    >
      <ScheduleModalLayout
        src={'/assets/icons/processStatusClose.svg'}
        contents={'전부 비우시겠습니까?'}
      />
    </WConfirmModal>
  );
};

export default ScheduleResetModal;
