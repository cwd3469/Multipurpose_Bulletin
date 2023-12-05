import { useTelemedicineTreatHold } from '@hooks/api/hospitalDoctor/doctorOffice';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useToastContext } from '@hooks/useToastContext';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useCallback, useContext } from 'react';
import WaitingUlidContext from '../context/WaitingUlidContext';
import { TreatmentState } from '../WaitingRoomPage';
import { WatingRoomHeaderBtn } from '../WaitingRoomTheme';

const WatingRoomHoldBtn = (props: {
  stateOn: (state: TreatmentState) => void;
  stateCancel: () => void;
}) => {
  const router = useRouter();
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const { ulid } = useContext(WaitingUlidContext);
  const { mutate: mutateHold } = useTelemedicineTreatHold();
  const backUrl = useCallback(() => {
    const now = dayjs().format('YYYY-MM-DD');
    const url = `?page=0&startDate=${now}&endDate=${now}`;
    router.replace('/doctor/telemedicine/queueing' + url);
  }, [router]);

  // 진료 보류
  const treatmentHold = useCallback(() => {
    mutateHold(
      { ulid },
      {
        onSuccess(data) {
          const codeMsg = data.data.code;
          if (codeMsg === '7117') return props.stateCancel();
          if (codeMsg !== '0000')
            return toast?.on(msg.errMsg(codeMsg), 'error');
          if (codeMsg === '0000') {
            toast?.on('해당 환자의 진료가 보류 되었습니다.', 'success');
            props.stateOn('HOLD');
            backUrl();
          }
        },
        onError(error, variables, context) {
          toast?.on(
            '상태값 변경에 실패하였습니다.\n 잠시 후 다시 시도해주세요.',
            'error',
          );
        },
      },
    );
  }, [backUrl, msg, mutateHold, props, toast, ulid]);

  return (
    <WatingRoomHeaderBtn onClick={treatmentHold}>진료 보류</WatingRoomHeaderBtn>
  );
};

export default WatingRoomHoldBtn;
