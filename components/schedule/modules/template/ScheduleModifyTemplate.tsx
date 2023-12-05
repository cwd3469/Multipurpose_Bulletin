import { Grid, Stack } from '@mui/material';
import ScheduleCalendar from '../input/ScheduleCalendar';
import ScheduleDoctorProfile from '../input/ScheduleDoctorProfile';
import { ScheduleProvider } from '@components/schedule/contexts/ScheduleContext';
import { useContext } from 'react';
import { ScheduleMonthContext } from '@components/schedule/contexts/ScheduleMonth';
import ScheduleSelectTimeTable from '../input/ScheduleSelectTimeTable';
import ScheduleTimeList from '../input/ScheduleTimeList';
import ScheduleStateButtons from '../input/ScheduleStateButtons';
import ScheduleModalProcess from '@components/schedule/modals/ScheduleModalProcess';

const ScheduleModifyTemplate = () => {
  const { dayTimeTable } = useContext(ScheduleMonthContext);
  return (
    <ScheduleProvider contents={dayTimeTable}>
      <Stack gap="24px">
        <ScheduleDoctorProfile />
        <Grid
          container
          justifyContent="space-between"
          bgcolor="#fff"
          padding="32px 37px"
          borderRadius="12px"
        >
          <ScheduleCalendar
            mode="modify"
            title="날짜 선택"
            solt={{
              calendar: {
                className: 'Mgt-Schedule-calender',
                sx: {
                  '&.Mgt-Schedule-calender': {
                    width: '348px',
                  },
                },
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
            sx={{
              '& .ScheduleCalendar-ScheduleBox': {
                width: '392px',
                minHeight: '889px',
                padding: '32px 21px',
              },
            }}
          />
          <ScheduleTimeList />
          <ScheduleSelectTimeTable />
        </Grid>
        <ScheduleStateButtons mode="modify" />
        <ScheduleModalProcess />
      </Stack>
    </ScheduleProvider>
  );
};

export default ScheduleModifyTemplate;
