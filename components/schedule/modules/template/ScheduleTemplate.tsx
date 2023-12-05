import { Grid, Stack } from '@mui/material';
import ScheduleCalendar from '../input/ScheduleCalendar';
import ScheduleDoctorProfile from '../input/ScheduleDoctorProfile';
import ScheduleReservationList from '../view/ScheduleReservationList';
import { ScheduleProvider } from '@components/schedule/contexts/ScheduleContext';
import { useContext } from 'react';
import { ScheduleMonthContext } from '@components/schedule/contexts/ScheduleMonth';

const ScheduleTemplate = () => {
  const { dayTimeTable } = useContext(ScheduleMonthContext);
  return (
    <ScheduleProvider contents={dayTimeTable}>
      <Stack gap="24px">
        <ScheduleDoctorProfile isRead />
        <Grid
          container
          justifyContent="space-between"
          bgcolor="#fff"
          padding="32px 37px"
          borderRadius="12px"
        >
          <ScheduleCalendar
            title="예약 스케줄 캘린더"
            solt={{
              calenderGuid: {
                sx: {
                  padding: '23px',
                  '& h6': {
                    fontSize: '18px',
                    lineHeight: '24px',
                  },
                },
              },
            }}
          />
          <ScheduleReservationList disabled />
        </Grid>
      </Stack>
    </ScheduleProvider>
  );
};

export default ScheduleTemplate;
