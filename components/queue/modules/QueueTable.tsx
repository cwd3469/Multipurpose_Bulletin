import React, { useContext, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import WDataTable, { GridButton } from '@components/common/table/WDataTable';
import { QueueType } from '../type';
import QueueDetail from '../modal/QueueDetail';
import QueueRefusal from '../modal/QueueCancellation';
import { useRouter } from 'next/router';
import { QueueLabel } from '@components/queue/views/QueueTheme';
import { dateFormat } from '@utils/date';
import { useQueryClient } from 'react-query';
import { TEANTSTART } from '@hooks/api/hospitalDoctor/queryKey';
import WDayTimeText from '@components/common/typography/WDayTimeText';
import Image from 'next/image';
import UserInfoContext from '@hooks/contexts/UserInfoContext';
import { TelemedicineCause } from '@components/history/modules/HistoryDocTheme';

const QueueTable = (props: { data: QueueType[] }): JSX.Element => {
  const { data } = props;
  const rows = data.map((item, index) => {
    return { ...item, ['id']: index };
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const { handleTokenInfo } = useContext(UserInfoContext);
  const [detail, setDetail] = useState<boolean>(false);
  const [refusal, setRefusal] = useState<boolean>(false);
  const [detailId, setDetailId] = useState<string>('');
  const [refusalId, setRefusalId] = useState<string>('');
  const btnDisabledOn = (status: string) =>
    status === 'IN_TREAT' ? true : false;
  const openAccceptance = (ulid: string) => {
    router.push({
      pathname: `/doctor/telemedicine/waiting-room/`,
      query: { patientId: ulid },
    });
  };
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
      width: 130,
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
      width: 130,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        const { day, time } = dateFormat(params.row.createdAt);
        return <WDayTimeText day={day} time={time} />;
      },
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
      width: 140,
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
      width: 160,
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
      field: 'acceptance',
      sortable: false,
      headerName: '진료 입장',
      width: 190,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        const { registrationUlid, status } = params.row;
        return (
          <GridButton
            onClick={() => {
              handleTokenInfo();
              openAccceptance(registrationUlid);
              if (status === 'IN_TREAT') {
                queryClient.invalidateQueries(TEANTSTART(registrationUlid));
              }
            }}
          >
            진료 입장
          </GridButton>
        );
      },
    },
    {
      field: 'refusal',
      sortable: false,
      headerName: '진료 취소',
      width: 160,
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
    <>
      <WDataTable rows={rows} columns={columns} />
      {detailId ? (
        <QueueDetail
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
        <QueueRefusal
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
    </>
  );
};

export default QueueTable;
