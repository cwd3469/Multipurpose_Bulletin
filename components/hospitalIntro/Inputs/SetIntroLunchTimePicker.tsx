import { WTimeBox } from '@components/common/datepicker/WTimepicker';
import { Grid } from '@mui/material';
import { dayToTimeListUp } from '@utils/date';
import { WOptionType } from 'types/common';
import WSelecOpenTimeList from '@components/common/select/modules/WSelecOpenTimeList';

interface SetIntroLunchTimePickerProps {
  startDateOnChange: (date: string) => void;
  endDateOnChange: (date: string) => void;
  startTime: string;
  endTime: string;
}

const SetIntroLunchTimePicker = (props: SetIntroLunchTimePickerProps) => {
  const { startDateOnChange, endDateOnChange, startTime, endTime } = props;
  const timeList = dayToTimeListUp({
    start: '11',
    end: '15',
    Interval: 30,
    viewFormat: 'HH:mm',
    IdFormat: 'HHmm',
    ListFormat: 'single',
  });

  const options: WOptionType[] = timeList.map((item) => {
    return { id: item.id, name: item.name };
  });
  const lastOption: WOptionType = {
    id: JSON.stringify('1500'),
    name: '15:00',
  };

  const arr = [...options, lastOption];
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
  const menuStyle = {
    '&.WSelect-Munu-root .MuiPaper-root': {
      marginLeft: '0px',
      marginTop: '12px',
      '& .MuiList-root': {
        width: '145px !important',
      },
      '& li': {
        justifyContent: 'center',
      },
    },
  };
  const selectStyle = {
    '&.WSelect-root': {
      padding: '7px 0px',
    },
  };
  return (
    <Grid container justifyContent={'space-between'} alignItems={'center'}>
      <WTimeBox className="lunch_time">
        <WSelecOpenTimeList
          timeListOptions={startTimeList}
          value={startTime}
          callBack={(id: string) => {
            const date = JSON.parse(id);
            startDateOnChange(date);
          }}
          MenuPropsSx={menuStyle}
          sx={selectStyle}
          isButton
        />
      </WTimeBox>
      ~
      <WTimeBox className="lunch_time">
        <WSelecOpenTimeList
          timeListOptions={endTimeList}
          value={endTime}
          callBack={(id: string) => {
            const date = JSON.parse(id);
            endDateOnChange(date);
          }}
          MenuPropsSx={menuStyle}
          sx={selectStyle}
          isButton
        />
      </WTimeBox>
    </Grid>
  );
};

export default SetIntroLunchTimePicker;
