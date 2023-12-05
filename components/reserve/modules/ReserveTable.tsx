import React from 'react';
import { Grid } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import WDataTable from '@components/common/table/WDataTable';
import { ReserveTableType } from '../type';
import { dateFormat } from '@utils/date';
import WDayTimeText from '@components/common/typography/WDayTimeText';
import ReserveStateLabel from '../modals/ReserveStateLabel';
import ReserveDetailButton from '../modals/ReserveButton';
import useAuth from '@hooks/useAuth';

type ReserveTableDate = ReserveTableType & { id: number };
export type ReserveTableModalType = {
  name: string;
  open: boolean;
  ulid: string;
};
/**ReserveTable 예약 목록 테이블*/
const ReserveTable = (props: { data: ReserveTableType[] }): JSX.Element => {
  const { data } = props;
  //ReserveTable Data id add
  const userInfo = useAuth();
  const rows: ReserveTableDate[] = data.map((item, index) => {
    return { ...item, ['id']: index };
  });

  //ReserveTable Columns defalut Option
  const columnsOption = {
    sortable: false,
    editable: false,
    filterable: false,
    hideable: false,
  };
  //ReserveTable Table Columns
  let columns: GridColDef[] = [
    {
      ...columnsOption,
      field: 'createdAt',
      headerName: '접수 일시',
      width: userInfo.permission === 'MEDICAL_SUPPORT' ? 120 : 140,
      renderCell: (params) => {
        const { day, time } = dateFormat(params.row.createdAt);
        return <WDayTimeText day={day} time={time} />;
      },
    },
    {
      ...columnsOption,
      field: 'statusNameKo',
      headerName: '접수 상태',
      width: 120,
      renderCell: (params) => {
        return <ReserveStateLabel state={params.row.status} />;
      },
    },
    {
      ...columnsOption,
      field: 'cancelReason',
      headerName: '취소 사유',
      width: userInfo.permission === 'MEDICAL_SUPPORT' ? 155 : 180,
      renderCell: (params) => {
        return <>{params.row.cancelReason === null ? '-' : params.row.cancelReason}</>;
      },
    },

    {
      ...columnsOption,
      field: 'nameAndAge',
      headerName: '환자 정보',
      width: userInfo.permission === 'MEDICAL_SUPPORT' ? 100 : 120,
      renderCell: (params) => {
        return <span style={{ fontWeight: '600' }}>{params.row.nameAndAge}</span>;
      },
    },
    {
      ...columnsOption,
      field: 'enterTypeNameKo',
      headerName: '인입 분류',
      width: 120,
    },
    {
      ...columnsOption,
      field: 'reservedAt',
      headerName: '예약 일시',
      width: userInfo.permission === 'MEDICAL_SUPPORT' ? 130 : 140,
      renderCell: (params) => {
        const state = params.row.reseveTableReserveStatus;
        const { day, time } = dateFormat(params.row.reservedAt);

        if (state === 'REFUSE' || state === 'CANCEL') return <></>;
        return <WDayTimeText day={day} time={time} />;
      },
    },
    {
      ...columnsOption,
      field: 'reseveContents',
      headerName: '예약 접수 내용',
      width: userInfo.permission === 'MEDICAL_SUPPORT' ? 130 : 140,
      renderCell: (params) => {
        const state = params.row.status;
        return (
          <ReserveDetailButton reserveInfo={params.row} name={'reseveContents'} state={state} />
        );
      },
    },
    {
      ...columnsOption,
      field: 'reseveAccept',
      headerName: '예약 수락/변경',
      width: 110,
      renderCell: (params) => {
        const state = params.row.status;
        return (
          <ReserveDetailButton
            reserveInfo={params.row}
            name={state === 'RESERVED_ACCEPT' ? 'reseveModify' : 'reseveAccept'}
            state={state}
          />
        );
      },
    },
    {
      ...columnsOption,
      field: 'reseveRefusal',
      headerName: '예약/접수 거절',
      width: userInfo.permission === 'MEDICAL_SUPPORT' ? 110 : 120,
      renderCell: (params) => {
        const state = params.row.status;
        return (
          <ReserveDetailButton reserveInfo={params.row} name={'reseveRefusal'} state={state} />
        );
      },
    },
  ];

  if (userInfo.permission === 'MEDICAL_SUPPORT') {
    const doctorName: GridColDef = {
      ...columnsOption,
      field: 'doctorNameKo',
      headerName: '의사이름',
      width: 100,
    };
    columns.splice(2, 0, doctorName);
  }

  //ReserveTable Table render
  return (
    <Grid container height="710px">
      <WDataTable rows={rows} columns={columns} />
    </Grid>
  );
};

export default ReserveTable;
