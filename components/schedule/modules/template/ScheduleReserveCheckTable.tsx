import React from 'react';
import { Grid } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import WDataTable from '@components/common/table/WDataTable';
import { dateFormat } from '@utils/date';
import WDayTimeText from '@components/common/typography/WDayTimeText';
import { ReserveCheckArreyType } from '@components/schedule/modals/ScheduleReserveCheckModal';
import ReserveStateLabel from '@components/reserve/modals/ReserveStateLabel';

type ReserveCheckTableDate = ReserveCheckArreyType & { id: number };

const ScheduleReserveCheckTable = (props: { data: ReserveCheckArreyType[] }): JSX.Element => {
  const { data } = props;
  //ReserveTable Data id add
  const rows: ReserveCheckTableDate[] = data.map((item, index) => {
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
  const columns: GridColDef[] = [
    {
      ...columnsOption,
      field: 'createdAt',
      headerName: '접수 일시',
      width: 246,
      renderCell: (params) => {
        const { day, time } = dateFormat(params.row.createdAt);
        return (
          <WDayTimeText
            day={day}
            time={time}
            sx={{
              '& .MuiTypography-root': {
                fontSize: '1rem',
              },
            }}
          />
        );
      },
    },
    {
      ...columnsOption,
      field: 'statusNameKo',
      headerName: '접수 상태',
      width: 110,
      renderCell: (params) => {
        return <ReserveStateLabel state={params.row.status} className="Reserve-check" />;
      },
    },
    {
      ...columnsOption,
      field: 'nameAndAge',
      headerName: '환자 정보',
      width: 278,
      renderCell: (params) => {
        return <span style={{ fontWeight: '600', fontSize: '1rem' }}>{params.row.nameAndAge}</span>;
      },
    },
  ];
  //ReserveTable Table render
  return (
    <Grid container height="400px">
      <WDataTable
        className={'Schedule-Reserve-Check-Table'}
        rows={rows}
        columns={columns}
        headerHeight={52}
        rowHeight={38}
        pageSize={8}
        sx={{
          '&.Schedule-Reserve-Check-Table ': {
            '& .MuiDataGrid-row .MuiDataGrid-cell': {
              borderBottom: '0px',
            },
            '& .MuiDataGrid-virtualScrollerContent': {
              padding: '16px 0 0px',
            },
            '& .MuiDataGrid-virtualScrollerRenderZone': {
              gap: '2px',
            },
          },
        }}
      />
    </Grid>
  );
};

export default ScheduleReserveCheckTable;
