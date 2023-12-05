import { SUPPORTTREATSET } from '@hooks/api/hospitalSupport/queryKey';
import {
  apiReceptionStateOpen,
  apiReceptionStateClose,
  apiReceptionStateAllStart,
  apiReceptionStateAllClose,
} from '@hooks/api/hospitalSupport/supportDoctorTreat';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useToastContext } from '@hooks/useToastContext';
import { useRouter } from 'next/router';
import { useCallback, useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { SupportTreatFilterContext } from '../contexts/SupportTreatFilterContext';

interface UseMutateReceptionState {
  doctorUlid?: string;
  doctorIsDone?: boolean;
  hospitalIsDone?: boolean;
  reset?: () => void;
  openMobal?: () => void;
}

const useMutateReceptionState = (props: UseMutateReceptionState) => {
  const [bgDisabled, setBgDisabled] = useState<boolean>(false);
  const { filter } = useContext(SupportTreatFilterContext);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: mutateReceptionStateOpen } = useMutation(
    apiReceptionStateOpen,
  );
  const { mutate: mutateReceptionStateClose } = useMutation(
    apiReceptionStateClose,
  );
  const { mutate: mutateReceptionStateAllStart } = useMutation(
    apiReceptionStateAllStart,
  );
  const { mutate: mutateReceptionStateAllClose } = useMutation(
    apiReceptionStateAllClose,
  );
  const toast = useToastContext();
  const msg = useCodeMsgBundle();

  // 의사 접수 시작 변경
  const onClickReceptionStateStart = useCallback(() => {
    if (props.doctorUlid && typeof props.doctorIsDone !== 'undefined') {
      const dto = { ulid: props.doctorUlid };
      mutateReceptionStateOpen(dto, {
        onError(error, variables, context) {
          toast?.on(
            '의사의 진료 접수 상태 변경이 실패하였습니다. \n 잠시 후, 다시 시도해 주세요.',
            'error',
          );
        },
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries(SUPPORTTREATSET(router.query));
          const code = data.data.code;
          if (code !== '0000') {
            if (code === '7102') {
              if (props.openMobal) {
                props.openMobal();
                toast?.on(msg.errMsg(code), 'warning');
              }
            } else {
              toast?.on(msg.errMsg(code), 'warning');
            }
          } else {
            toast?.on(
              '의사의 진료 접수 상태 변경이 완료되었습니다.',
              'success',
            );
            if (props.reset) {
              props.reset();
            }
          }
        },
      });
    }
  }, [msg, mutateReceptionStateOpen, props, queryClient, router.query, toast]);

  // 의사 접수 마감 변경
  const onClickReceptionStateClose = useCallback(() => {
    if (props.doctorUlid && typeof props.doctorIsDone !== 'undefined') {
      const dto = { ulid: props.doctorUlid };
      mutateReceptionStateClose(dto, {
        onError(error, variables, context) {
          toast?.on(
            '의사의 진료 접수 상태 변경이 실패하였습니다. \n 잠시 후, 다시 시도해 주세요.',
            'error',
          );
        },
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries(SUPPORTTREATSET(router.query));
          const code = data.data.code;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'warning');
          } else {
            toast?.on(
              '의사의 진료 접수 상태 변경이 완료되었습니다.',
              'success',
            );
            if (props.reset) {
              props.reset();
            }
          }
        },
      });
    }
  }, [msg, mutateReceptionStateClose, props, queryClient, router.query, toast]);

  // 의사 전체 접수 상태 변경 open
  const onClickReceptionStateAllStart = useCallback(() => {
    if (typeof props.hospitalIsDone !== 'undefined') {
      mutateReceptionStateAllStart(undefined, {
        onError(error, variables, context) {
          if (props.hospitalIsDone) {
            toast?.on(
              '의사의 접수 마감이 실패하였습니다. \n 잠시 후, 다시 시도해 주세요',
              'error',
            );
          } else {
            toast?.on(
              '의사의 접수 시작이 실패하였습니다. \n 잠시 후, 다시 시도해 주세요.',
              'error',
            );
          }
        },
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries(SUPPORTTREATSET(router.query));
          const code = data.data.code;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'warning');
          } else {
            if (props.hospitalIsDone) {
              toast?.on('의사의 접수 마감이 완료되었습니다.', 'success');
            } else {
              toast?.on('의사의 접수 시작이 완료되었습니다.', 'success');
            }
            if (props.reset) {
              props.reset();
            }
          }
        },
      });
    }
  }, [
    msg,
    mutateReceptionStateAllStart,
    props,
    queryClient,
    router.query,
    toast,
  ]);
  // 의사 전체 접수 상태 변경 close
  const onClickReceptionStateAllClose = useCallback(() => {
    if (typeof props.hospitalIsDone !== 'undefined') {
      mutateReceptionStateAllClose(undefined, {
        onError(error, variables, context) {
          if (props.hospitalIsDone) {
            toast?.on(
              '의사의 접수 마감이 실패하였습니다. \n 잠시 후, 다시 시도해 주세요',
              'error',
            );
          } else {
            toast?.on(
              '의사의 접수 시작이 실패하였습니다. \n 잠시 후, 다시 시도해 주세요.',
              'error',
            );
          }
        },
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries(SUPPORTTREATSET(router.query));
          const code = data.data.code;
          if (code !== '0000') {
            toast?.on(msg.errMsg(code), 'warning');
          } else {
            if (props.hospitalIsDone) {
              toast?.on('의사의 접수 마감이 완료되었습니다.', 'success');
            } else {
              toast?.on('의사의 접수 시작이 완료되었습니다.', 'success');
            }
            if (props.reset) {
              props.reset();
            }
          }
        },
      });
    }
  }, [
    msg,
    mutateReceptionStateAllClose,
    props,
    queryClient,
    router.query,
    toast,
  ]);

  return {
    onClickReceptionStateStart,
    onClickReceptionStateClose,
    onClickReceptionStateAllStart,
    onClickReceptionStateAllClose,
    bgDisabled,
    setBgDisabled,
  };
};

export default useMutateReceptionState;
