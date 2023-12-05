import { ScheduleContext } from '@components/schedule/contexts/ScheduleContext';
import { useCallback, useContext, useState } from 'react';
import {
  ScheduleBox,
  ScheduleButton,
  ScheduleSubTitle,
  ScheduleToggleButton,
  ScheduleToggleButtonGroup,
} from '../view/ScheduleStyle';
import { Box, Grid, Stack } from '@mui/material';
import Image from 'next/image';
import { ScheduleTimeListButtonGroup } from './ScheduleTimeList';
import useScheduleModal from '@components/schedule/hooks/useScheduleModal';

const ScheduleSelectTimeTable = () => {
  const {
    alignment,
    selectList,
    getTimeDivision,
    apmList,
    setTimeNotSelected,
    setInAlignment,
    initTimeList,
  } = useContext(ScheduleContext);

  const obj = getTimeDivision ? getTimeDivision(selectList ? selectList : []) : [];
  const time = apmList && apmList(obj)[alignment ? alignment : 'am'];
  const disabled = time ? (obj.length ? false : true) : true;
  const { setInName } = useScheduleModal();
  const handleModalOn = useCallback(
    (name?: string) => {
      setInName && setInName(name);
    },
    [setInName],
  );
  return (
    <Stack gap="16px">
      <ScheduleSubTitle>확정된 시간</ScheduleSubTitle>
      <ScheduleBox
        width="338px"
        sx={{
          padding: '24px',
          paddingRight: '13px',
          border: 'none',
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23D8D8D8FF' stroke-width='1' stroke-dasharray='5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
        }}
      >
        <Box paddingRight="14px">
          <ScheduleToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={setInAlignment}
          >
            <ScheduleToggleButton value="am">
              <Image
                src={'/assets/icons/ic_sun.svg'}
                alt="오전예약아이콘"
                width="22px"
                height="22px"
              />
              <span>오전</span>
            </ScheduleToggleButton>
            <ScheduleToggleButton value="pm">
              <Image
                src={'/assets/icons/ic_moon.svg'}
                alt="오후예약아이콘"
                width="22px"
                height="22px"
              />
              <span>오후</span>
            </ScheduleToggleButton>
          </ScheduleToggleButtonGroup>
        </Box>
        <Box height="24px" />
        <ScheduleTimeListButtonGroup
          timeGroup={time}
          onClickButton={setTimeNotSelected}
          solt={{
            button: {
              className: 'cancel-on',
            },
          }}
          sx={{
            height: '703px',
          }}
        />
        <Box height="24px" />
        <Grid container paddingRight="14px">
          {' '}
          <ScheduleButton
            onClick={() => handleModalOn('reset')}
            sx={{ width: '100%' }}
            disabled={disabled}
            startIcon={
              <Image
                src={
                  disabled ? '/assets/icons/ic_clear_disabled.svg' : '/assets/icons/ic_clear.svg'
                }
                alt="ic_schedule"
                width={24}
                height={24}
              />
            }
          >
            예약 시간 비우기
          </ScheduleButton>
        </Grid>
      </ScheduleBox>
    </Stack>
  );
};

export default ScheduleSelectTimeTable;
