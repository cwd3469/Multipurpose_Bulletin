import { useTreatStart } from '@hooks/api/hospitalDoctor/doctorOffice';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useToastContext } from '@hooks/useToastContext';
import { useDebounceFn } from 'ahooks';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { WaitingInfoContext } from '../context/WaitingInfoContext';
import WaitingUlidContext from '../context/WaitingUlidContext';
import { TreatmentState } from '../WaitingRoomPage';
import { WatingRoomHeaderBtn } from '../WaitingRoomTheme';

const WatingRoomStartBtn = (props: {
  onClickTrackCall?: () => void;
  stateOn: (state: TreatmentState) => void;
  patientStatus: boolean;
  stateCancel: () => void;
}) => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { setInfoFn } = useContext(WaitingInfoContext);
  const { ulid } = useContext(WaitingUlidContext);
  const { mutate: mutateTreatStart } = useTreatStart();
  // 진료 시작
  const onStartTreat = () => {
    mutateTreatStart(ulid, {
      onSuccess(data, variables, context) {
        const codeMsg = data.data.code;
        if (codeMsg !== '0000') {
          if (codeMsg === '7112') return props.stateCancel();
          toast?.on(msg.errMsg(codeMsg), 'error');
          return;
        }
        toast?.on('해당 환자에 대한 비대면 진료가 시작되었습니다.', 'success');
        props.stateOn('IN_TREAT');
        const now = dayjs().format('YYYY.MM.DD HH:mm');
        setInfoFn(now, 'startTime');
        if (props.onClickTrackCall) {
          props.onClickTrackCall();
        }
      },
      onError(error, variables, context) {
        toast?.on(
          '상태값 변경에 실패하였습니다.\n 잠시 후 다시 시도해주세요.',
          'error',
        );
      },
    });
  };

  const onDebounceFnStartTreat = useDebounceFn(onStartTreat, {
    wait: 300,
  });

  return (
    <WatingRoomHeaderBtn
      onClick={onDebounceFnStartTreat.run}
      className={props.patientStatus ? 'is-treat' : ''}
    >
      진료 시작
    </WatingRoomHeaderBtn>
  );
};

export default WatingRoomStartBtn;
