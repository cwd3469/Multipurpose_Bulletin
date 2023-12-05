import React, { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import WDataTable, { GridButton } from '@components/common/table/WDataTable';
import { SupportReception } from '../type';
import { dateFormat } from '@utils/date';
import WDayTimeText from '@components/common/typography/WDayTimeText';
import SupportReceptionDetail from '../modal/SupportReceptionDetail';
import SupportReceptionRefusal from '../modal/SupportReceptionRefusal';
import SupportReceptionAccept from '../modal/SupportReceptionAccept';
import { Grid } from '@mui/material';
import { TelemedicineCause } from '@components/history/modules/HistoryDocTheme';
const SupportReceptionTable = (props: {
  data: SupportReception[];
}): JSX.Element => {
  const { data } = props;
  const rows = data.map((item, index) => {
    return { ...item, ['id']: index };
  });
  // modal open
  const [detail, setDetail] = useState<boolean>(false);
  const [accept, setAccept] = useState<boolean>(false);
  const [refusal, setRefusal] = useState<boolean>(false);
  // modal ulid
  const [detailUlid, setDetailUlid] = useState<string>('');
  const [acceptUlid, setAcceptUlid] = useState<string>('');
  const [refusalUlid, setRefusalUlid] = useState<string>('');

  const stateDecision = (state: string) => (state === 'REGIST' ? false : true);

  const onOpenMoadl = (
    uild: string,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    setStateText: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(true);
    setTimeout(() => setStateText(uild), 500);
  };

  const onCloseMoadl = (
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    setStateText: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(false);
    setTimeout(() => setStateText(''), 500);
  };

  const columns: GridColDef[] = [
    {
      field: 'createdAt',
      headerName: '접수 일시',
      width: 180,
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
      field: 'statusNameKo',
      headerName: '접수 상태',
      width: 100,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
    },
    {
      field: 'doctorNameKo',
      headerName: '의사 이름',
      width: 100,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
    },
    {
      field: 'telemedicineType',
      headerName: '진료수단',
      width: 110,
      sortable: false,
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
      field: 'nameAndAge',
      headerName: '환자 정보',
      width: 120,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
    },
    {
      field: 'enterTypeNameKo',
      headerName: '인입 분류',
      width: 140,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
    },
    {
      field: 'detailView',
      headerName: '진료 접수 내용 상세',
      width: 150,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => (
        <GridButton
          onClick={() =>
            onOpenMoadl(params.row.registrationUlid, setDetail, setDetailUlid)
          }
        >
          접수 내용 보기
        </GridButton>
      ),
    },
    {
      field: 'acceptance',
      headerName: '접수 수락',
      width: 150,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => (
        <GridButton
          onClick={() =>
            onOpenMoadl(params.row.registrationUlid, setAccept, setAcceptUlid)
          }
          disabled={stateDecision(params.row.status)}
        >
          접수 수락
        </GridButton>
      ),
    },
    {
      field: 'refusal',
      sortable: false,
      headerName: '접수 거절',
      width: 145,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => (
        <GridButton
          onClick={() =>
            onOpenMoadl(params.row.registrationUlid, setRefusal, setRefusalUlid)
          }
          disabled={stateDecision(params.row.status)}
        >
          접수 거절
        </GridButton>
      ),
    },
  ];

  return (
    <Grid container sx={{ height: '706px' }}>
      <WDataTable rows={rows} columns={columns} />
      {detailUlid ? (
        <SupportReceptionDetail
          ulid={detailUlid}
          open={detail}
          handleClose={() => onCloseMoadl(setDetail, setDetailUlid)}
        />
      ) : (
        ''
      )}
      {refusalUlid ? (
        <SupportReceptionRefusal
          ulid={refusalUlid}
          open={refusal}
          handleClose={() => onCloseMoadl(setRefusal, setRefusalUlid)}
        />
      ) : (
        ''
      )}
      {acceptUlid ? (
        <SupportReceptionAccept
          ulid={acceptUlid}
          open={accept}
          handleClose={() => onCloseMoadl(setAccept, setAcceptUlid)}
        />
      ) : (
        ''
      )}
    </Grid>
  );
};

export default SupportReceptionTable;
