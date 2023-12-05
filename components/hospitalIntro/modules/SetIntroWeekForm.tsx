import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import SetIntroTimePicker from '../Inputs/SetIntroTimePicker';
import { SetIntroToggle } from './SetIntroTheme';
import { WeekendDto } from '../type';
import WSwitch from '@components/common/buttons/WSwitch';
interface WeekFormType {
  week: string;
  name: string;
  night: boolean;
  open: boolean;
  openTime: string;
  closeTime: string;
  setWeekOnChange: (value: WeekendDto, keyId: string) => void;
}

const SetIntroWeekForm = (props: WeekFormType) => {
  const { week, name, night, open, setWeekOnChange, openTime, closeTime } = props;

  const [startTime, setStart] = useState<string>('0700');
  const [endTime, setEnd] = useState<string>('2400');
  const [selected, setSelected] = useState<boolean>(false);
  const [hospitalOpen, setHospitalOpen] = useState<boolean>(false);

  useEffect(() => {
    setStart(Number(openTime) < 700 ? '0700' : openTime);
    setEnd(Number(closeTime) < 700 ? '2400' : closeTime);
    if (night) {
      setSelected(night);
    }
    if (open) {
      setHospitalOpen(open);
    }
  }, [closeTime, night, open, openTime]);

  useEffect(() => {
    return () => {
      setStart('');
      setEnd('');
      setSelected(false);
      setHospitalOpen(false);
    };
  }, [closeTime, night, open, openTime]);

  const info = {
    fullWidth: '90px',
    switchheight: '37px',
    switchWidth: '44px',
    switchOn: '"ON"',
    switchOff: '"OFF"',
    moveTranslateX: 'translateX(46px)',
    borderRadius: '6px',
  };
  // - 오픈 시간
  const setStartime = useCallback(
    (time: string) => {
      setStart(time);
      const startDate = time;
      const endDate = endTime;
      const res = {
        openTime: startDate,
        closeTime: endDate,
        hasOperation: hospitalOpen,
        hasNightOperation: selected,
      };
      setWeekOnChange(res, week);
    },
    [endTime, hospitalOpen, selected, setWeekOnChange, week],
  );
  // - 닫는 시간
  const setEndTime = useCallback(
    (time: string) => {
      setEnd(time);
      const startDate = startTime;
      const endDate = time;
      const res = {
        openTime: startDate,
        closeTime: endDate,
        hasOperation: hospitalOpen,
        hasNightOperation: selected,
      };
      setWeekOnChange(res, week);
    },
    [hospitalOpen, selected, setWeekOnChange, startTime, week],
  );
  // - 야간 진료 유무
  const setNightToggle = useCallback(
    (boo: boolean) => {
      setSelected(boo);
      const startDate = startTime;
      const endDate = endTime;
      const res = {
        openTime: startDate,
        closeTime: endDate,
        hasOperation: hospitalOpen,
        hasNightOperation: boo,
      };
      setWeekOnChange(res, week);
    },
    [endTime, hospitalOpen, setWeekOnChange, startTime, week],
  );
  // - 당일 오픈 유무
  const setOpenSwich = useCallback(
    (boo: boolean) => {
      setHospitalOpen(boo);
      const startDate = startTime;
      const endDate = endTime;
      const res = {
        openTime: startDate,
        closeTime: endDate,
        hasOperation: boo,
        hasNightOperation: selected,
      };
      setWeekOnChange(res, week);
    },
    [endTime, selected, setWeekOnChange, startTime, week],
  );

  return (
    <Grid container alignItems={'center'} gap="8px" justifyContent={'start'} padding="0 0 14px 9px">
      <Typography
        variant="body2"
        fontWeight="bold"
        color={week === 'sun' || week === 'holiday' ? '#f11919' : '#333'}
      >
        {name}
      </Typography>
      <SetIntroTimePicker
        startTime={startTime}
        endTime={endTime}
        startState={setStartime}
        endState={setEndTime}
        disabled={!hospitalOpen}
      />
      <SetIntroToggle
        disabled={!hospitalOpen}
        value="check"
        color="primary"
        selected={selected}
        sx={{
          padding: '8px',
          gap: '4px',
          fontSize: '14px',
          boxSizing: 'border-box',
          borderWidth: '1px',
          height: '37px',
          '&:hover': {
            borderColor: '#4ac6ff',
            color: '#4ac6ff',
            backgroundColor: '#fff',
          },
          '&.Mui-selected': {
            border: hospitalOpen ? '1px solid #4ac6ff' : '1px solid #ddd',
            color: hospitalOpen ? '#4ac6ff' : 'rgba(0, 0, 0, 0.26)',
          },
          '&.Mui-disabled': {
            backgroundColor: '#ebeced',
            color: '#949494',
            border: '1px solid #ddd',
          },
        }}
        onChange={() => {
          setNightToggle(!selected);
        }}
      >
        야간 진료
        {selected ? (
          hospitalOpen ? (
            <Image src={'/assets/icons/checkIconActive.svg'} alt="체크" width={12} height={12} />
          ) : (
            <Image src={'/assets/icons/checkIcon.svg'} alt="체크" width={12} height={12} />
          )
        ) : (
          <Image src={'/assets/icons/checkIcon.svg'} alt="체크" width={12} height={12} />
        )}{' '}
      </SetIntroToggle>
      <WSwitch
        checked={hospitalOpen}
        info={info}
        onChange={() => {
          setOpenSwich(!hospitalOpen);
        }}
      />
    </Grid>
  );
};

export default SetIntroWeekForm;
