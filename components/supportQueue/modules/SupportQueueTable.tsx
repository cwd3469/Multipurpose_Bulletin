import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import WDataTable, { GridButton } from '@components/common/table/WDataTable';
import { SupportQueueType } from '../type';
import { QueueLabel } from '@components/queue/views/QueueTheme';
import { dateFormat } from '@utils/date';
import SupportQueueDetail from '../modal/SupportQueueDetail';
import SupportQueueCancellation from '../modal/SupportQueueCancellation';
import { TelemedicineCause } from '@components/history/modules/HistoryDocTheme';

const SupportQueueTable = (props: {
  data: SupportQueueType[];
}): JSX.Element => {
  const { data } = props;
  const rows = data.map((item, index) => {
    return { ...item, ['id']: index };
  });
  const [detail, setDetail] = useState<boolean>(false);
  const [refusal, setRefusal] = useState<boolean>(false);
  const [detailId, setDetailId] = useState<string>('');
  const [refusalId, setRefusalId] = useState<string>('');
  const btnDisabledOn = (status: string) =>
    status === 'IN_TREAT' ? true : false;
  const openDetail = (ulid: string) => {
    setDetail(true);
    setDetailId(ulid);
  };
  const openRefusal = (ulid: string) => {
    setRefusal(true);
    setRefusalId(ulid);
  };

  const columns: GridColDef[] = [
    {
      field: 'status',
      headerName: '상태값',
      width: 140,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        return (
          <QueueLabel status={params.row.status}>
            {params.row.statusNameKo}
          </QueueLabel>
        );
      },
    },
    {
      field: 'createdAt',
      headerName: '대기열 등록 일시',
      width: 140,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        const { day, time } = dateFormat(params.row.createdAt);
        return (
          <Grid container justifyContent={'center'} gap="4px">
            <Typography fontWeight={'700'}>{day}</Typography>
            <Typography color="#666">{time}</Typography>
          </Grid>
        );
      },
    },
    {
      field: 'doctorNameKo',
      sortable: false,
      headerName: '의사 이름',
      width: 100,
      editable: false,
      filterable: false,
      hideable: false,
    },
    {
      field: 'patientRegistrationNum',
      sortable: false,
      headerName: '환자 등록번호',
      width: 140,
      editable: false,
      filterable: false,
      hideable: false,
    },
    {
      field: 'nameAndAge',
      sortable: false,
      headerName: '환자 정보',
      width: 140,
      editable: false,
      filterable: false,
      hideable: false,
    },
    {
      field: 'telemedicineType',
      sortable: false,
      headerName: '진료수단',
      width: 180,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        return (
          <TelemedicineCause telemedicineType={params.row.telemedicineType} />
        );
      },
    },
    {
      field: 'detailView',
      sortable: false,
      headerName: '진료 접수 내용 상세',
      width: 180,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        return (
          <GridButton onClick={() => openDetail(params.row.registrationUlid)}>
            접수 내용 보기
          </GridButton>
        );
      },
    },
    {
      field: 'refusal',
      sortable: false,
      headerName: '진료 취소',
      width: 175,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        return (
          <GridButton
            onClick={() => openRefusal(params.row.registrationUlid)}
            disabled={btnDisabledOn(params.row.status)}
          >
            진료 취소
          </GridButton>
        );
      },
    },
  ];

  return (
    <Grid container sx={{ height: '706px' }}>
      <WDataTable rows={rows} columns={columns} />
      {detailId ? (
        <SupportQueueDetail
          open={detail}
          handleClose={() => {
            setDetailId('');
            setDetail(false);
          }}
          ulid={detailId}
        />
      ) : (
        ''
      )}
      {refusalId ? (
        <SupportQueueCancellation
          open={refusal}
          handleClose={() => {
            setRefusal(false);
            setRefusalId('');
          }}
          refusalId={refusalId}
        />
      ) : (
        ''
      )}
    </Grid>
  );
};

export default SupportQueueTable;
