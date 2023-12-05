import { Box, Grid } from '@mui/material';
import { TreatmentState } from '../WaitingRoomPage';
import { WaitingRoomHeaderData } from '../type';
import WatingRoomStartBtn from '../Inputs/WatingRoomStartBtn';
import WatingRoomMoveQueueBtn from '../Inputs/WatingRoomMoveQueueBtn';
import WatingRoomHoldBtn from '../Inputs/WatingRoomHoldBtn';
import WatingRoomTreatmentCancelButton from '../Inputs/WatingRoomTreatmentCancelButton';
import WatingRoomPatientCallButton from '../Inputs/WatingRoomPatientCallButton';
import WatingRoomMedicalExpensesButton from '../Inputs/WatingRoomMedicalExpensesButton';
import WaitingRoomPatientInfo from './WaitingRoomPatientInfo';
import WatingRoomModufyHistoryBtn from '../Inputs/WatingRoomModufyHistoryBtn';
import { useCallback, useEffect, useState } from 'react';
import WClinicStateModal from '@components/common/modal/WClinicStateModal';
interface WaitingRoomHeaderType {
  trackCall?: () => void;
  leave?: () => Promise<void>;
  setState?: (state: TreatmentState) => void;
  state: TreatmentState;
  headerData: WaitingRoomHeaderData;
  trackState: boolean;
  patientStatus: boolean;
}

const WaitingRoomHeader = (props: WaitingRoomHeaderType) => {
  const { trackCall, leave, setState, state, headerData, patientStatus } =
    props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const stateCancel = useCallback(() => {
    setModalOpen(true);
    if (leave) leave();
  }, [leave]);
  const stateOn = useCallback(
    (shape: TreatmentState) => {
      if (setState) setState(shape);
    },
    [setState],
  );

  return (
    <Box>
      <Grid container justifyContent={'space-between'}>
        <WaitingRoomPatientInfo headerData={headerData} />
        <Grid container width="auto" gap="16px" height={'60px'}>
          {state === 'IN_TREAT' ? (
            <>
              <WatingRoomMedicalExpensesButton
                setState={() => stateOn('CLOSE')}
                leaveVideo={leave}
              />
              <WatingRoomTreatmentCancelButton
                setState={() => stateOn('CLOSE')}
                leaveVideo={leave}
                stateCancel={stateCancel}
              />
            </>
          ) : state === 'WAIT' ? (
            <>
              <WatingRoomMoveQueueBtn />
              <WatingRoomPatientCallButton
                patientStatus={patientStatus}
                stateCancel={stateCancel}
              />
              <WatingRoomStartBtn
                patientStatus={patientStatus}
                onClickTrackCall={trackCall}
                stateCancel={stateCancel}
                stateOn={stateOn}
              />
              <WatingRoomHoldBtn stateOn={stateOn} stateCancel={stateCancel} />
            </>
          ) : state === 'HOLD' ? (
            <>
              <WatingRoomMoveQueueBtn />
              <WatingRoomPatientCallButton
                patientStatus={patientStatus}
                stateCancel={stateCancel}
              />
              <WatingRoomStartBtn
                patientStatus={patientStatus}
                onClickTrackCall={trackCall}
                stateCancel={stateCancel}
                stateOn={stateOn}
              />
              <WatingRoomTreatmentCancelButton
                setState={() => stateOn('CLOSE')}
                stateCancel={stateCancel}
                leaveVideo={leave}
              />
            </>
          ) : state === 'CLOSE' ? (
            <WatingRoomMoveQueueBtn />
          ) : (
            <WatingRoomModufyHistoryBtn />
          )}
          <WClinicStateModal
            open={state === 'CANCEL' ? true : modalOpen}
            handleClose={() => setModalOpen(false)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default WaitingRoomHeader;
