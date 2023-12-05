import { useContext, useState } from 'react';
import { WatingRoomHeaderBtn } from '../WaitingRoomTheme';

import WatingRoomTreatmentCancel from '../modal/WatingRoomTreatmentCancel';
import dayjs from 'dayjs';
import { WaitingInfoContext } from '../context/WaitingInfoContext';

const WatingRoomTreatmentCancelButton = (props: {
  setState: () => void;
  leaveVideo?: () => Promise<void>;
  stateCancel: () => void;
}) => {
  const { setState, leaveVideo, stateCancel } = props;
  const { setInfoFn, setInLeave } = useContext(WaitingInfoContext);
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    const now = dayjs().format('YYYY.MM.DD HH:mm');
    setInfoFn(now, 'endTime');
    setOpen(true);
    setInLeave(true);
  };
  // 7108
  return (
    <>
      <WatingRoomHeaderBtn variant="outlined" color="info" onClick={handleOpen}>
        진료 취소
      </WatingRoomHeaderBtn>
      <WatingRoomTreatmentCancel
        open={open}
        handleClose={handleClose}
        setState={setState}
        leaveVideo={leaveVideo}
        stateCancel={stateCancel}
      />
    </>
  );
};

export default WatingRoomTreatmentCancelButton;
