import { useCallback, useContext, useState } from 'react';
import { WatingRoomHeaderBtn } from '../WaitingRoomTheme';
import WatingRoomMedicalAmount from '../modal/WatingRoomMedicalAmount';
import dayjs from 'dayjs';
import { WaitingInfoContext } from '../context/WaitingInfoContext';

const WatingRoomMedicalExpensesButton = (props: {
  setState: () => void;
  leaveVideo?: () => Promise<void>;
}) => {
  const { setState, leaveVideo } = props;
  const [open, setOpen] = useState<boolean>(false);
  const { setInfoFn, setInLeave } = useContext(WaitingInfoContext);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    const now = dayjs().format('YYYY.MM.DD HH:mm');
    setInfoFn(now, 'endTime');
    setInLeave(true);
    setOpen(true);
  }, [setInfoFn, setInLeave]);

  return (
    <>
      <WatingRoomHeaderBtn variant="outlined" color="info" onClick={handleOpen}>
        진료 종료
      </WatingRoomHeaderBtn>
      <WatingRoomMedicalAmount
        open={open}
        handleClose={handleClose}
        setState={setState}
        leaveVideo={leaveVideo}
      />
    </>
  );
};

export default WatingRoomMedicalExpensesButton;
