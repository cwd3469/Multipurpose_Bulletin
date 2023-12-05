import { Grid, Typography } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { TimerComponentsTyep } from 'types/signin';
import { TimerButton } from './AuthTheme';

export default function AuthTimer(props: TimerComponentsTyep) {
  const { resend, showTime, isReStart, action, time } = props;

  const [showBtn, setShowBtn] = useState<boolean>(false);
  const lastMinutes = showTime ? showTime.minutes : 0;
  const lastSeconds = showTime ? showTime.seconds : 30;

  const [, updateState] = useState<number>();
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const forceUpdate = useCallback(() => updateState(1), []);
  const reStart = () => {
    setMinutes(time);
    setSeconds(props.seconds ? props.seconds : 0);
    forceUpdate();
  };
  useEffect(() => {
    setMinutes(time);
    setSeconds(props.seconds ? props.seconds : 0);
  }, [props.seconds, time]);

  useEffect(() => {
    forceUpdate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
          action();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [minutes, seconds, action]);

  let timer = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  useEffect(() => {
    if (minutes <= lastMinutes) {
      if (seconds <= lastSeconds) {
        setShowBtn(true);
      }
    } else {
      setShowBtn(false);
    }
  }, [lastMinutes, lastSeconds, minutes, seconds]);

  return (
    <Grid
      container
      justifyContent={'center'}
      alignItems="center"
      gap="8px"
      width="auto"
    >
      {showBtn ? (
        <TimerButton
          onClick={() => {
            resend();
            if (isReStart) {
              reStart();
            }
          }}
        >
          재발송
        </TimerButton>
      ) : (
        ''
      )}

      <Typography variant="body2" fontWeight={'bold'} color="#4ac6ff">
        {timer}
      </Typography>
    </Grid>
  );
}
