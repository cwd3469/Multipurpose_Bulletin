import React from 'react';
import { ModalType } from 'types/signin';
import { ScheduleModalLayout } from '../modules/view/ScheduleStyle';
import WAlertModal from '@components/common/modal/WAlertModal';

const ScheduleUnselectableModal = (props: ModalType) => {
  const { open, handleClose } = props;
  return (
    <WAlertModal
      maxWidth="lg"
      title={'일자 선택 불가능'}
      handleClose={handleClose}
      open={open}
      activeOn
      titleSx={{
        padding: '50px 0 60px',
      }}
      setAlert
    >
      <ScheduleModalLayout
        src={'/assets/icons/processStatus.svg'}
        contents={
          '선택된 일자에 이미 등록된 스케줄이 있습니다. 기존 등록된 스케줄을 삭제하거나, 다른 날짜를 선택해주세요.'
        }
      />
    </WAlertModal>
  );
};

export default ScheduleUnselectableModal;
