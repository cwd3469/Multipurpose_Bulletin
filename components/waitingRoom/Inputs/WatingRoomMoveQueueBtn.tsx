import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useCallback, useContext } from 'react';
import { WatingRoomHeaderBtn } from '../WaitingRoomTheme';

const WatingRoomMoveQueueBtn = () => {
  const router = useRouter();
  // 대기열 이동
  const routeQueuePage = useCallback(() => {
    const now = dayjs().format('YYYY-MM-DD');
    const url = `?page=0&startDate=${now}&endDate=${now}`;
    const storage = globalThis?.sessionStorage;
    if (storage.prevPath) {
      router.back();
    } else {
      router.replace('/doctor/telemedicine/queueing' + url);
    }
  }, [router]);

  return (
    <WatingRoomHeaderBtn sx={{ width: '110px' }} onClick={routeQueuePage}>
      대기열 이동
    </WatingRoomHeaderBtn>
  );
};

export default WatingRoomMoveQueueBtn;
