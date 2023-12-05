import { usePostDoctorPatientCall } from '@hooks/api/hospitalDoctor/doctorQueue';
import { useToastContext } from '@hooks/useToastContext';
import { useDebounceFn } from 'ahooks';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import WatingRoomPatientAdmission from '../modal/WatingRoomPatientAdmission';
import WatingRoomPatientCall from '../modal/WatingRoomPatientCall';
import { WatingRoomHeaderBtn } from '../WaitingRoomTheme';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';

interface WatingRoomPatientCallButtonType {
  patientStatus: boolean;
  stateCancel: () => void;
}

const WatingRoomPatientCallButton = (
  props: WatingRoomPatientCallButtonType,
) => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const router = useRouter();
  const patientId = router.query.patientId as string | undefined;
  const { mutate: mutateuPostDoctorPatientCall } = usePostDoctorPatientCall();
  const [count, setCount] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const reset = () => {
    setTimeout(() => setCount(0), 500);
    setOpen(false);
  };
  const closeModal = () => {
    setOpen(false);
    reset();
  };
  // 환자 호출
  const patientCall = useCallback(() => {
    if (patientId) {
      mutateuPostDoctorPatientCall(patientId, {
        onSuccess(data, variables, context) {
          const codeMsg = data.data.code;
          if (codeMsg === '7123') return props.stateCancel();
          if (codeMsg !== '0000')
            return toast?.on(msg.errMsg(codeMsg), 'error');
          if (codeMsg === '0000') {
            setOpen(true);
            setCount(1);
          }
        },
        onError() {
          toast?.on(
            '환자 호출에 실패하였습니다. \n 잠시 후 다시 시도해 주세요.',
            'error',
          );
        },
      });
    }
  }, [msg, mutateuPostDoctorPatientCall, patientId, props, toast]);

  const onDebounceFnPatientCall = useDebounceFn(patientCall, {
    wait: 300,
  });

  useEffect(() => {
    return () => {
      setCount(0);
    };
  }, []);

  return (
    <>
      <WatingRoomHeaderBtn
        variant="outlined"
        color="info"
        onClick={onDebounceFnPatientCall.run}
      >
        환자 호출
      </WatingRoomHeaderBtn>
      {props.patientStatus ? (
        <WatingRoomPatientAdmission open={open} handleClose={closeModal} />
      ) : count ? (
        <WatingRoomPatientCall open={open} handleClose={reset} />
      ) : (
        ''
      )}
    </>
  );
};

export default WatingRoomPatientCallButton;
