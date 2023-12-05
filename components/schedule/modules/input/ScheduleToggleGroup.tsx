import { useRouter } from 'next/router';
import { ScheduleToggleButton, ScheduleToggleButtonGroup } from '../view/ScheduleStyle';
import { Box } from '@mui/material';
import { useEffect } from 'react';

const ScheduleToggleGroup = () => {
  const router = useRouter();
  const { doctorUlid } = router.query;
  const registerValue = doctorUlid
    ? `/medical-support/doctor-schedule/management/${doctorUlid}`
    : '/doctor/schedule/management';
  const modifyValue = doctorUlid
    ? `/medical-support/doctor-schedule/modify/${doctorUlid}`
    : '/doctor/schedule/modify';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePage = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: any) => {
    if (router.pathname === value) return;
    if (value) {
      const path = value as string;
      router.push(path);
    }
  };
  return (
    <>
      <Box height="35px" />
      <ScheduleToggleButtonGroup
        color="primary"
        value={router.asPath}
        exclusive
        onChange={handlePage}
      >
        <ScheduleToggleButton value={registerValue} className="WModify-selected">
          <span>스케줄 등록/삭제</span>
        </ScheduleToggleButton>
        <ScheduleToggleButton value={modifyValue} className="WModify-selected">
          <span>스케줄 수정</span>
        </ScheduleToggleButton>
      </ScheduleToggleButtonGroup>
      <Box height="27px" />
    </>
  );
};

export default ScheduleToggleGroup;
