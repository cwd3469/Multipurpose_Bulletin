import { useCallback, useContext, useEffect } from 'react';
import { ScheduleEventButtom, ScheduleProgileBox } from '../view/ScheduleStyle';
import { ScheduleContext } from '../../contexts/ScheduleContext';
import useScheduleModal from '@components/schedule/hooks/useScheduleModal';
import { ScheduleMonthContext } from '@components/schedule/contexts/ScheduleMonth';

const ScheduleStateButtons = (props: { mode?: 'modify' | 'register' }) => {
  const info = useContext(ScheduleContext);
  const month = useContext(ScheduleMonthContext);

  const { setInName } = useScheduleModal();
  const handleModalOn = useCallback(
    (name?: string) => {
      setInName && setInName(name);
    },
    [setInName],
  );
  const valid = info.validCheckModify && info.validCheckModify(month.scheduleDayList);

  return (
    <ScheduleProgileBox sx={{ padding: '0px', justifyContent: 'center', gap: '24px' }}>
      {props.mode === 'modify' ? (
        <ScheduleEventButtom onClick={() => handleModalOn('modify')} disabled={valid}>
          스케줄 수정
        </ScheduleEventButtom>
      ) : (
        <>
          {' '}
          <ScheduleEventButtom
            onClick={() => handleModalOn('delete')}
            className="Delete-btn"
            disabled={month.weekList.length ? info.inputErrorCheck : true}
          >
            스케줄 삭제
          </ScheduleEventButtom>
          <ScheduleEventButtom
            onClick={() => handleModalOn('storage')}
            disabled={month.weekList.length ? info.validCheck : true}
          >
            스케줄 저장
          </ScheduleEventButtom>
        </>
      )}
    </ScheduleProgileBox>
  );
};

export default ScheduleStateButtons;
