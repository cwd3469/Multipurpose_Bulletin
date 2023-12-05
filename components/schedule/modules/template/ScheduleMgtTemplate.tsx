import { Grid, Stack } from '@mui/material';
import ScheduleDoctorProfile from '../input/ScheduleDoctorProfile';
import ScheduleTimeList from '../input/ScheduleTimeList';
import ScheduleSelectTimeTable from '../input/ScheduleSelectTimeTable';
import ScheduleStateButtons from '../input/ScheduleStateButtons';
import ScheduleModalProcess from '@components/schedule/modals/ScheduleModalProcess';
import ScheduleRangeCalendar from '../input/ScheduleRangeCalendar';
import { ScheduleProvider } from '@components/schedule/contexts/ScheduleContext';

const ScheduleMgtTemplate = () => {
  return (
    <ScheduleProvider>
      <Stack gap="24px">
        <ScheduleDoctorProfile />
        <Grid
          container
          justifyContent="space-between"
          bgcolor="#fff"
          padding="32px 37px"
          borderRadius="12px"
        >
          <ScheduleRangeCalendar
            title="날짜 선택"
            sx={{
              '& .ScheduleCalendar-ScheduleBox': {
                width: '400px',
                padding: '32px 24px 24px',
              },
              '& .gap-box': {
                height: '18.5px',
              },
            }}
            solt={{
              calendar: {
                className: 'Mgt-Schedule-calender',
              },
              calenderGuid: {
                sx: {
                  padding: '16px',
                  '& h6': {
                    fontSize: '16px',
                    lineHeight: '20px',
                  },
                  '& .MuiSvgIcon-root': {
                    width: '16px',
                    height: '16px',
                  },
                },
              },
            }}
          />
          <ScheduleTimeList />
          <ScheduleSelectTimeTable />
        </Grid>
        <ScheduleStateButtons />
        <ScheduleModalProcess />
      </Stack>
    </ScheduleProvider>
  );
};

export default ScheduleMgtTemplate;
