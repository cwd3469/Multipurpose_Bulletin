import { Box, Button, Grid } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { TimerInterface } from '../types/signin';

export default function useTimer(props: TimerInterface) {
  const { time, action } = props;
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
  return { timer, minutes, seconds, reStart };
}
