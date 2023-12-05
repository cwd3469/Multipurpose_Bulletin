import { useContext } from 'react';
import {
  ScheduleBox,
  ScheduleToggleButton,
  ScheduleToggleButtonGroup,
  ScheduleSubTitle,
  ScheduleTimeGroupButton,
  ScheduleNoneList,
} from '../view/ScheduleStyle';
import { ScheduleContext, TimeValue } from '../../contexts/ScheduleContext';
import { Stack, Box, Grid, SxProps, Theme } from '@mui/material';
import Image from 'next/image';
import { WTimeListOption } from '@utils/date';
import { ScheduleComponent } from './ScheduleCalendar';
import { useRouter } from 'next/router';

export const ScheduleTimeListButtonGroup = (props: {
  timeGroup?: TimeValue[];
  onClickButton?: (time: WTimeListOption) => void;
  sx?: SxProps<Theme>;
  solt?: {
    button?: ScheduleComponent;
  };
  disabled?: boolean;
}) => {
  const { timeGroup, onClickButton, solt, sx, disabled } = props;
  const router = useRouter();
  const strArr = router.asPath.split('/');
  let boo = strArr.includes('modify');
  return (
    <Stack sx={{ height: '773px', overflowY: 'auto', ...sx }}>
      <Stack gap="23.5px" position="relative">
        {timeGroup && timeGroup.length ? (
          timeGroup.map((item, index) => {
            return (
              <Stack key={index} gap="23.5px">
                <Grid container gap="12px">
                  {item.timeList.map((element, index) => {
                    return (
                      <ScheduleTimeGroupButton
                        key={index}
                        sx={{ width: '47%' }}
                        disabled={disabled}
                        onClick={() => onClickButton && onClickButton(element)}
                        className={
                          solt ? (solt.button ? solt.button.className : undefined) : undefined
                        }
                      >
                        {element.name}
                      </ScheduleTimeGroupButton>
                    );
                  })}
                </Grid>
                <Box
                  sx={{
                    backgroundImage: ` url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23D8D8D8FF' stroke-width='1' stroke-dasharray='3' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                    width: '100%',
                    height: '1px',
                  }}
                />
              </Stack>
            );
          })
        ) : (
          <ScheduleNoneList
            sx={{
              top: '208px',
            }}
            subText={boo ? '예약 된 시간이 없습니다.' : '예약 가능 시간을 선택해 주세요.'}
          />
        )}
      </Stack>
    </Stack>
  );
};

/**스케줄 등록 선택 가능 리스트*/
const ScheduleTimeList = (props: { disabled?: boolean }) => {
  const info = useContext(ScheduleContext);
  const obj = info.getTimeDivision ? info.getTimeDivision(info.timeList ? info.timeList : []) : [];

  return (
    <Stack gap="16px">
      <ScheduleSubTitle>예약 가능 시간 선택</ScheduleSubTitle>
      <ScheduleBox
        width="344px"
        sx={{
          padding: '24px 28px',
          paddingRight: '13px',
          backgroundColor: '#f8f8f8',
        }}
      >
        <Box paddingRight="13px">
          <ScheduleToggleButtonGroup
            color="primary"
            value={info.alignment}
            exclusive
            onChange={info.setInAlignment}
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
          timeGroup={obj}
          onClickButton={info.setTimeSelected}
          disabled={props.disabled}
        />
      </ScheduleBox>
    </Stack>
  );
};
export default ScheduleTimeList;
