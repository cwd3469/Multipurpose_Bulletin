import { Grid } from '@mui/material';
import { dayToTimeListUp, stringToDate } from '@utils/date';
import { WOptionType } from 'types/common';
import WSelecOpenTimeList from '@components/common/select/modules/WSelecOpenTimeList';

interface ReserveTimePickerProps {
  onChange: (date: string) => void;
  value: string;
}
/**ReserveTimePicker 예약 타임 피커*/
const ReserveTimePicker = (props: ReserveTimePickerProps) => {
  const { onChange, value } = props;
  const dayToTimeList = dayToTimeListUp({
    start: '05',
    end: '24',
    Interval: 10,
    viewFormat: 'HH:mm',
    IdFormat: 'HH:mm',
    ListFormat: 'range',
  });

  const options: WOptionType[] = dayToTimeList.map((item) => {
    return { id: JSON.stringify(item.id), name: item.name };
  });
  const timeValue = (time: string) => {
    const startDayjs = stringToDate(time);
    const endDayjs = startDayjs.add(10, 'm');
    const startTime = startDayjs.format('HH:mm');
    const endTime = endDayjs.format('HH:mm');
    const timejs = { startTime: startTime, endTime: endTime };
    return JSON.stringify(timejs);
  };

  return (
    <Grid container justifyContent={'space-between'} alignItems={'center'}>
      <WSelecOpenTimeList
        timeListOptions={options}
        value={timeValue(value)}
        callBack={(id: string) => {
          const date = JSON.parse(id);
          onChange(date);
        }}
        isButton={true}
        MenuPropsSx={{
          '&.WSelect-Munu-root .MuiPaper-root': {
            marginLeft: '0px',
            marginTop: '12px',
            '& .MuiList-root': {
              width: '285px !important',
            },
            '& li': {
              justifyContent: 'center',
            },
          },
        }}
        sx={{
          '&.WSelect-root': {
            padding: '12px 12px',
            width: '100%',
            border: '1px solid #ebeced',
            '& .MuiSelect-select': {
              textAlign: 'left',
            },
          },
          '& .MuiSvgIcon-root': {
            display: 'block',
          },
        }}
      />
    </Grid>
  );
};

export default ReserveTimePicker;
