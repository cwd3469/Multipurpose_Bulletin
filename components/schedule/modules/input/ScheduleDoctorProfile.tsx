import { Box, Typography } from '@mui/material';
import { ScheduleBox, ScheduleButton, ScheduleProgileBox } from '../view/ScheduleStyle';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ScheduleMonthContext } from '../../contexts/ScheduleMonth';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

const ScheduleDoctorProfile = (props: { isRead?: boolean }) => {
  const router = useRouter();
  const { doctorUlid } = router.query;
  const { profileInfo } = useContext(ScheduleMonthContext);

  const maxScheduleDate = profileInfo
    ? profileInfo.maxScheduleDate !== 'null'
      ? dayjs(profileInfo.maxScheduleDate).format('YYYY-MM-DD dddd')
      : dayjs().add(1, 'day').format('YYYY-MM-DD')
    : '';

  const pathDoctor = () => router.push('/doctor/schedule/management');
  const pathSupport = () =>
    router.push(`/medical-support/doctor-schedule/management/${doctorUlid}`);

  return (
    <ScheduleBox sx={{ borderRadius: '12px' }}>
      <ScheduleProgileBox gap="8px">
        <Typography variant="h5" lineHeight="1">
          {profileInfo ? profileInfo.doctorName : ''} 의사
        </Typography>
        <Box sx={{ width: '1px', height: '16px', backgroundColor: '#999' }} />
        <Typography variant="subtitle1" lineHeight="1" fontWeight="400" marginRight="auto">
          <span style={{ color: '#3DA1FF', fontWeight: '700' }}>{maxScheduleDate}</span>
          {` 이 후 저장된 예약 스케줄이 없습니다.`}
        </Typography>
        <Box minHeight="48px">
          {props.isRead ? (
            <ScheduleButton
              startIcon={
                <Image
                  src={'/assets/icons/ic_schedule.svg'}
                  alt="ic_schedule"
                  width={24}
                  height={24}
                />
              }
              onClick={doctorUlid ? pathSupport : pathDoctor}
            >
              스케줄 관리
            </ScheduleButton>
          ) : (
            ''
          )}
        </Box>
      </ScheduleProgileBox>
    </ScheduleBox>
  );

  return <>loding...</>;
};

export default ScheduleDoctorProfile;
