import useInModalAlert from '@hooks/utils/modal/useInModalAlert';
import useScheduleModal from '../hooks/useScheduleModal';
import ScheduleCalendarModal from './ScheduleCalendarModal';
import ScheduleDeleteModal from './ScheduleDeleteModal';
import ScheduleResetModal from './ScheduleResetModal';
import ScheduleModifyModal from './ScheduleModifyModal';
import ScheduleUnselectableModal from './ScheduleUnselectableModal';
import ScheduleReserveCheckModal from './ScheduleReserveCheckModal';

const ScheduleModalProcess = () => {
  const { name, setInName } = useScheduleModal();
  const { onDeleteModalToast } = useInModalAlert();
  const handleClose = () => {
    setInName && setInName(undefined);
    onDeleteModalToast && onDeleteModalToast();
  };
  if (!name) return <></>;
  switch (name) {
    case 'storage':
      return <ScheduleCalendarModal open={name === 'storage'} handleClose={handleClose} />;
    case 'delete':
      return <ScheduleDeleteModal open={name === 'delete'} handleClose={handleClose} />;
    case 'reset':
      return <ScheduleResetModal open={name === 'reset'} handleClose={handleClose} />;
    case 'modify':
      return <ScheduleModifyModal open={name === 'modify'} handleClose={handleClose} />;
    case 'reserve-one':
      return (
        <ScheduleReserveCheckModal
          open={name === 'reserve-one'}
          handleClose={handleClose}
          mode="modify"
        />
      );
    case 'reserve-two':
      return (
        <ScheduleReserveCheckModal
          open={name === 'reserve-two'}
          handleClose={handleClose}
          mode="delete"
        />
      );
    case 'unselectable':
      return <ScheduleUnselectableModal open={name === 'unselectable'} handleClose={handleClose} />;
    default:
      return <></>;
  }
};

export default ScheduleModalProcess;
