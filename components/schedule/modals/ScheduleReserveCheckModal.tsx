import React from 'react';
import { ModalType } from 'types/signin';
import WAlertModal from '@components/common/modal/WAlertModal';
import { Stack, Typography } from '@mui/material';
import ScheduleReserveCheckTable from '../modules/template/ScheduleReserveCheckTable';
import WPagination from '@components/common/table/WPagination';
import useServerReserveEffect from '../hooks/useServerReserveEffect';

export type ReserveCheckArreyType = {
  status: string;
  statusNameKo: string;
  nameAndAge: string;
  createdAt: string;
};

type ScheduleReserveCheckModalProps = ModalType & {
  mode?: 'modify' | 'delete';
};

const ScheduleReserveCheckModal = (props: ScheduleReserveCheckModalProps) => {
  const { open, handleClose, mode } = props;
  const { page, setInPage, tableContent, totalPages } = useServerReserveEffect({
    handleClose,
    mode: mode,
  });
  const pagination = (event: React.ChangeEvent<unknown>, value: number) => setInPage(value);

  return (
    <WAlertModal
      maxWidth="lg"
      title={'예약 변경'}
      subTitle={'이미 등록된 예약이 있어 수정/삭제가 안됩니다.'}
      handleClose={handleClose}
      open={open}
      activeOn
      closeBtnOn
      titleSx={{
        padding: '56px 0 32px',
        gap: '16px',
        '& .WModal-subtitle': {
          '& .MuiTypography-root': {
            color: '#666',
          },
        },
      }}
      setAlert
    >
      <Stack
        width="720px"
        bgcolor="#f8f8f8"
        padding="40px"
        margin={'0px 15px'}
        borderRadius={'12px'}
        gap="16px"
      >
        <Typography fontSize="18px" fontWeight="600" color="#3c3d47">
          삭제 스케줄에 포함된 예약 내역
        </Typography>
        <ScheduleReserveCheckTable data={tableContent} />
        <WPagination
          paddingTop="4px"
          page={Number(page)}
          pagination={pagination}
          count={totalPages}
        />
      </Stack>
    </WAlertModal>
  );
};

export default ScheduleReserveCheckModal;
