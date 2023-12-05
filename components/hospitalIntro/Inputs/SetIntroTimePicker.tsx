import WSelecOpenTimeList from '@components/common/select/modules/WSelecOpenTimeList';
import { Grid, styled, Box, Typography } from '@mui/material';
import { dayToTimeListUp } from '@utils/date';
import { WOptionType } from 'types/common';

export const TimeBox = styled(Grid)((GridTypeMap) => ({
  border: '1px solid #4ac6ff',
  width: '120px',
  borderRadius: '6px',
  padding: '0',
  height: '36px',
  alignItems: 'center',
  justifyContent: 'center',
  '&.disabled': {
    border: '1px solid #ddd',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#ebeced',
    color: '#949494',
    fontSize: '14px',
    letterSpacing: '0.5px',
  },
}));

interface TimepickerType {
  startState: (time: string) => void;
  endState: (time: string) => void;
  startTime?: string;
  endTime?: string;
  disabled?: boolean;
}

const SetIntroTimePicker = (props: TimepickerType) => {
  const { startTime, endTime, startState, endState, disabled } = props;
  const timeList = dayToTimeListUp({
    start: '07',
    end: '24',
    Interval: 30,
    viewFormat: 'HH:mm',
    IdFormat: 'HHmm',
    ListFormat: 'single',
  });

  const options: WOptionType[] = timeList.map((item) => {
    return { id: item.id, name: item.name };
  });
  const timeLast: WOptionType = {
    name: '24:00',
    id: JSON.stringify('2400'),
  };
  const arr = [...options, timeLast];
  const checkTime = Number(endTime) > Number(startTime);
  const startTimeList = checkTime
    ? arr.filter((item, index) => {
        const timeId = JSON.parse(item.id);
        return Number(timeId) < Number(endTime);
      })
    : arr;
  const endTimeList = checkTime
    ? arr.filter((item, index) => {
        const timeId = JSON.parse(item.id);
        return Number(timeId) > Number(startTime);
      })
    : arr;

  return (
    <TimeBox container className={`${disabled ? 'disabled' : ''}`}>
      <Box sx={{ width: '45%' }}>
        <WSelecOpenTimeList
          timeListOptions={startTimeList}
          name="ssn-1"
          disabled={disabled}
          value={startTime}
          callBack={(id: string) => {
            const date = JSON.parse(id);
            startState(date);
          }}
          isButton
        />
      </Box>
      <Typography color="#999">~</Typography>
      <Box sx={{ width: '45%' }}>
        <WSelecOpenTimeList
          timeListOptions={endTimeList}
          name="ssn-2"
          disabled={disabled}
          value={endTime}
          callBack={(id: string) => {
            const date = JSON.parse(id);
            endState(date);
          }}
          isButton
        />
      </Box>
    </TimeBox>
  );
};

export default SetIntroTimePicker;
