import HistoryModifyList from '@components/history/modal/HistoryModifyList';
import UserInfoContext from '@hooks/contexts/UserInfoContext';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useCallback, useContext, useState } from 'react';
import { WatingRoomHeaderBtn } from '../WaitingRoomTheme';

const WatingRoomModufyHistoryBtn = () => {
  const router = useRouter();
  const info = useContext(UserInfoContext);

  const onRouteList = useCallback(() => {
    const storage = globalThis?.sessionStorage;

    if (storage.prevPath) {
      router.back();
    } else {
      if (info.permission === 'HOSPITAL_DOCTOR') {
        router.push('/doctor/telemedicine/history', undefined, {
          shallow: true,
        });
      } else if (info.permission === 'MEDICAL_SUPPORT') {
        router.push('/medical-support/telemedicine/history', undefined, {
          shallow: true,
        });
      } else {
        router.push('/hospital-admin/hospital-set', undefined, {
          shallow: true,
        });
      }
    }
  }, [info.permission, router]);
  // 대기열 이동
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modificationHistory = useCallback(() => {
    setModalOpen(true);
  }, []);

  return (
    <>
      <WatingRoomHeaderBtn
        onClick={onRouteList}
        sx={{
          width: '140px',
          backgroundColor: '#4ac6ff',
          color: '#fff',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        }}
        color="primary"
        variant="contained"
      >
        목록으로 돌아가기
      </WatingRoomHeaderBtn>
      {/* <WatingRoomHeaderBtn
        onClick={modificationHistory}
        sx={{ width: '140px' }}
      >
        수정 기록 보기
      </WatingRoomHeaderBtn> */}
      <HistoryModifyList
        open={modalOpen}
        id={0}
        handleClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default WatingRoomModufyHistoryBtn;
