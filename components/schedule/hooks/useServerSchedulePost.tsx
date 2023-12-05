import {
  apiScheduleDelete,
  apiSchedulePost,
  apiScheduleUpdate,
} from '@hooks/api/hospitalDoctor/doctorSchedule';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import useScheduleModal from './useScheduleModal';
import useScheduleDto, {
  ScheduleDeleteDto,
  SchedulePostDto,
  ScheduleUpdateDto,
} from './useScheduleDto';

const useServerSchedulePost = (props: { handleClose: () => void }) => {
  const { dto: scheduleDto, onSuccess, onWarning, onError } = useScheduleDto({ ...props });
  const { setInName } = useScheduleModal();
  const { mutate } = useMutation(apiSchedulePost);
  const { mutate: mutateDalete } = useMutation(apiScheduleDelete);
  const { mutate: mutateUpdate } = useMutation(apiScheduleUpdate);

  /**useServerSchedulePost 스케줄 등록 기능 */
  const postScheduleToServer = useCallback(() => {
    const dto: SchedulePostDto = scheduleDto.post;
    mutate(dto, {
      onSuccess(data, variables, context) {
        const code = data.data.code;
        if (code === '1037') return setInName && setInName('unselectable');
        if (code !== '0000') return onWarning(code);
        onSuccess();
        return;
      },
      onError(error, variables, context) {
        onError('저장');
        return;
      },
    });
  }, [scheduleDto.post, mutate, setInName, onWarning, onSuccess, onError]);

  /**useServerSchedulePost 스케줄 수정 기능 */
  const updateScheduleToServer = useCallback(() => {
    const dto: ScheduleUpdateDto = scheduleDto.update;

    mutateUpdate(dto, {
      onSuccess(data, variables, context) {
        const code = data.data.code;
        if (code === '1036') return setInName && setInName('reserve-one');
        if (code !== '0000') return onWarning(code);
        return onSuccess();
      },
      onError(error, variables, context) {
        onError('수정');
        return;
      },
    });
  }, [scheduleDto.update, mutateUpdate, setInName, onSuccess, onWarning, onError]);

  /**useServerSchedulePost 스케줄 삭제 기능 */
  const deleteScheduleToServer = useCallback(() => {
    const dto: ScheduleDeleteDto = scheduleDto.delete;

    mutateDalete(dto, {
      onSuccess(data, variables, context) {
        const code = data.data.code;
        if (code === '1036') return setInName && setInName('reserve-two');
        if (code !== '0000') return onWarning(code);
        return onSuccess();
      },
      onError(error, variables, context) {
        onError('삭제');
        return;
      },
    });
  }, [scheduleDto.delete, mutateDalete, setInName, onWarning, onSuccess, onError]);

  return {
    postScheduleToServer,
    deleteScheduleToServer,
    updateScheduleToServer,
  };
};

export default useServerSchedulePost;
