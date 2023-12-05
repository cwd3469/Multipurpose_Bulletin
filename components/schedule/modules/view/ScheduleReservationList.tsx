import { ScheduleSubTitle, ScheduleTimeGroupButton } from './ScheduleStyle';
import { useContext } from 'react';
import { ScheduleContext, TimeValue } from '../../contexts/ScheduleContext';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { ScheduleItemList, ScheduleListBox, ScheduleNoneList } from './ScheduleStyle';
import Image from 'next/image';
import { WTimeListOption } from '@utils/date';

type ScheduleReservationListProp = {
  disabled?: boolean;
};

/**스케줄조회아코디언버튼*/
export const ScheduleAccordion = (props: {
  value: TimeValue;
  onClickItemSelect?: (time: WTimeListOption) => void;
  mode: 'available' | 'fixed';
  disabled?: boolean;
}) => {
  const { value, onClickItemSelect, mode, disabled } = props;
  const timeList = value ? value.timeList : [];
  const onClickButton = (item: WTimeListOption) => {
    if (disabled) return undefined;
    if (!onClickItemSelect) return undefined;
    onClickItemSelect(item);
  };
  return (
    <>
      {''}
      {timeList.length ? (
        timeList.map((item, index) => {
          return (
            <li
              key={JSON.stringify(item.name) + index}
              style={{
                paddingBottom: '12px',
              }}
            >
              <ScheduleTimeGroupButton key={index} className="select-on" fullWidth disabled>
                {''}
                {item.name}
              </ScheduleTimeGroupButton>
            </li>
          );
        })
      ) : (
        <>선택한 스케줄이 없습니다.</>
      )}
    </>
  );
};

/**스케줄조회아코디언버튼리스트*/
const ScheduleReadList = (props: { src: string; title: string; timeTable: TimeValue[] }) => {
  const { src, title, timeTable } = props;
  if (timeTable.length)
    return (
      <ScheduleListBox width="240px" sx={{ paddingRight: '20px' }}>
        <Grid
          container
          justifyContent={'center'}
          alignItems="center"
          gap="8px"
          paddingBottom="16px"
        >
          <Image src={src} alt="오전 예약 아이콘" width="24px" height="24px" />
          <Typography variant="subtitle1" fontWeight="600">
            {title}
          </Typography>
        </Grid>
        <Box sx={{ height: '750px', overflowY: 'auto' }}>
          <ScheduleItemList>
            {timeTable.map((item, index) => {
              return (
                <ScheduleAccordion key={index} value={item} mode="available" disabled={true} />
              );
            })}
          </ScheduleItemList>
        </Box>
      </ScheduleListBox>
    );
  return (
    <ScheduleListBox
      width="240px"
      sx={{ backgroundColor: 'rgba(255,255,255,0.5)', position: 'relative' }}
      justifyContent="center"
      alignItems="center"
    >
      <ScheduleNoneList contents={title} />
    </ScheduleListBox>
  );
};

/**스케줄 조회 아코디언 버튼 오전오후 리스트뷰*/
const ScheduleReservationList = (props: ScheduleReservationListProp) => {
  const { scheduleDate, selectList, getTimeDivision, apmList } = useContext(ScheduleContext);
  const obj = getTimeDivision ? getTimeDivision(selectList ? selectList : []) : [];
  const day = scheduleDate.format('M월DD일');

  if (apmList)
    return (
      <Stack gap="16px">
        <ScheduleSubTitle>
          <span className="active">{day}</span> 캘린더
        </ScheduleSubTitle>
        <Grid
          container
          sx={{ padding: '24px', gap: '24px', backgroundColor: '#f8f8f8', borderRadius: '12px' }}
        >
          {obj.length ? (
            <>
              <ScheduleReadList
                src={'/assets/icons/ic_sun.svg'}
                title={'오전 예약'}
                timeTable={apmList(obj).am}
              />
              <ScheduleReadList
                src={'/assets/icons/ic_moon.svg'}
                title={'오후 예약'}
                timeTable={apmList(obj).pm}
              />
            </>
          ) : (
            <ScheduleListBox
              width="504px"
              sx={{ backgroundColor: 'rgba(255,255,255,0.5)', position: 'relative' }}
              justifyContent="center"
              alignItems="center"
            >
              <ScheduleNoneList />
            </ScheduleListBox>
          )}
        </Grid>
      </Stack>
    );
  return <>loading...</>;
};

export default ScheduleReservationList;
