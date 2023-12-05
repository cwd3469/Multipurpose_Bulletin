import React, { useState, useEffect, useCallback, useContext } from 'react';
import Image from 'next/image';
import { Box, Button, Grid, styled, Typography as Text } from '@mui/material';
import colors from '@styles/colors';

import { getCookie, setCookie } from 'cookies-next';
import UserInfoContext from '@hooks/contexts/UserInfoContext';
import { useToastContext } from '@hooks/useToastContext';
import GnbModal from './GnbModal';

const fontStyle = {
  fontSize: '12px',
  fontWeight: '400',
  textAlign: 'center',
  lineHeight: '1',
  color: '#666',
};

export const Extension = styled(Button)(({ theme }) => ({
  backgroundColor: colors.gray_11,
  minWidth: 'auto',
  padding: 0,
}));

export default function GnbTimer() {
  const { validTime, signOut, handleTokenInfo, accountInfo } =
    useContext(UserInfoContext);
  const [open, setOpen] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(1000);
  const [seconds, setSeconds] = useState<number>(1000);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const toast = useToastContext();
  const action = useCallback(() => {
    //TODO: 작업을 위해 임시 기능 폐쇄
    handleClose();
    toast?.on('로그인 유효 시간이 만료되어 \n 로그아웃 되었습니다.', 'info');
    if (signOut) signOut();
  }, [signOut, toast]);

  const resend = useCallback(() => {
    //TODO: 작업을 위해 임시 기능 폐쇄
    handleClose();
    handleTokenInfo();
  }, [handleTokenInfo]);

  const reStart = () => {
    const { minute, seconds } = validTime;
    setMinutes(minute);
    setSeconds(seconds);
  };

  useEffect(() => {
    const { minute, seconds } = validTime;
    setMinutes(minute);
    setSeconds(seconds);
  }, [validTime]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds <= 0) {
        if (minutes <= 0) {
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
    if (minutes <= 1) {
      if (seconds <= 59) {
        const refreshToken = getCookie('refreshToken');
        const refreshCount = getCookie('refreshCount');
        if (refreshToken !== refreshCount) {
          handleOpen();
          setCookie('refreshCount', refreshToken);
        }
      }
    }
  }, [minutes, seconds]);
  if (accountInfo)
    if (accountInfo.hasExpiredTime) {
      return (
        <Grid
          container
          justifyContent={'center'}
          alignItems="center"
          width="auto"
        >
          <Image
            src={'/assets/icons/clock.svg'}
            alt="시계아이콘"
            width="15px"
            height="15px"
          />
          <Text
            variant="caption"
            lineHeight="1"
            sx={{ ...fontStyle, width: '27px' }}
          >
            {timer}
          </Text>
          <Box width="5px" />
          <Extension
            sx={{ ...fontStyle }}
            onClick={() => {
              reStart();
              resend();
            }}
          >
            연장
          </Extension>
          <GnbModal
            open={open}
            handleClose={handleClose}
            timer={timer}
            resend={resend}
          />
        </Grid>
      );
    }
  return <></>;
}
