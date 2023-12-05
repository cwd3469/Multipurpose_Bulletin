import { Grid, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import WDataTable from '@components/common/table/WDataTable';
import WPagination from '@components/common/table/WPagination';
import WatingRoomPrescription from '../modal/WatingRoomPrescription';
import WatingRoomTreatmentDetail from '../modal/WatingRoomTreatmentDetail';
import { usePatientHistory } from '@hooks/api/hospitalDoctor/doctorOffice';
import { dateFormat } from '@utils/date';
import { PatientInfoButton } from '../WaitingRoomTheme';

interface TreatHistoryType {
  completedAt: string;
  enterTypeNameKo: string;
  prescriptionUlid: string;
  registrationUlid: string;
}

const WaitingRoomTreatHistory = (props: { patientId: string }) => {
  const [page, setPage] = useState<number>(1);

  const { data, isError, isLoading } = usePatientHistory({
    ulid: props.patientId,
    page: page - 1,
  });

  const setInPage = (index: number) => {
    setPage(index);
  };
  if (isLoading) {
    return <>isLoading...</>;
  }
  if (isError) {
    return <>isError...</>;
  }
  if (data) {
    if (data.data.code === '0000') {
      const answer: TreatHistoryType[] = data.data.data.page.content;
      const totalPages = data.data.data.page.totalPages;
      return (
        <>
          <WaitingRoomTreatTemplates
            data={answer}
            totalPages={totalPages}
            setInPage={setInPage}
            page={page}
          />
        </>
      );
    } else {
      return <>isError...</>;
    }
  }
  return <></>;
};

const WaitingRoomTreatTemplates = (props: {
  data: TreatHistoryType[];
  totalPages: number;
  setInPage: (index: number) => void;
  page: number;
}) => {
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [prescriptionOpen, setPrescriptionOpen] = useState<boolean>(false);
  const [detailId, setDetailId] = useState<string>('');
  const [prescriptionId, setPrescriptionId] = useState<string>('');
  const [prescriptionFileId, setPrescriptionFileId] = useState<string>('');

  const modalDetailOpen = useCallback((id: string, open: boolean) => {
    setDetailOpen(open);
    setDetailId(id);
  }, []);

  const modalPrescriptionOpen = useCallback((id: string, fileId: string, open: boolean) => {
    setPrescriptionOpen(open);
    setPrescriptionId(id);
    setPrescriptionFileId(fileId);
  }, []);

  const data = {
    medicalHistory: props.data.map((item, index) => {
      return { ...item, ['id']: index };
    }),
  };

  const columns: GridColDef[] = [
    {
      field: 'completedAt',
      headerClassName: 'headerStyle',
      headerName: '진료일',
      width: 86,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        const { day } = dateFormat(params.row.completedAt);
        return <Typography variant="caption">{day}</Typography>;
      },
    },
    {
      field: 'enterTypeNameKo',
      headerClassName: 'headerStyle',
      headerName: '과목/증상',
      width: 86,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        return (
          <Typography variant="caption" letterSpacing={'-1px'}>
            {params.row.enterTypeNameKo}
          </Typography>
        );
      },
    },
    {
      field: 'prescription',
      headerClassName: 'headerStyle',
      headerName: '처방전',
      width: 86,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        return (
          <PatientInfoButton
            variant="outlined"
            color="info"
            disabled={params.row.prescriptionUlid ? false : true}
            onClick={() => {
              modalPrescriptionOpen(params.row.registrationUlid, params.row.prescriptionUlid, true);
            }}
          >
            처방전보기
          </PatientInfoButton>
        );
      },
    },
    {
      field: 'details',
      headerClassName: 'headerStyle',
      headerName: '진료 상세',
      width: 82,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        return (
          <PatientInfoButton
            variant="outlined"
            color="info"
            onClick={() => {
              modalDetailOpen(params.row.registrationUlid, true);
            }}
          >
            상세보기
          </PatientInfoButton>
        );
      },
    },
  ];

  return (
    <Stack gap="12px">
      <Typography variant="subtitle1" lineHeight={'1'}>
        진료 이력
      </Typography>
      <Stack>
        <Grid
          container
          sx={{
            height: '172px',
            '& .css-13yp6ec-MuiDataGrid-root.MuiDataGrid-root': {
              borderRadius: '6px',
            },
            '& .headerStyle .MuiDataGrid-columnHeaderTitleContainer': {
              fontSize: '12px',
            },
            '& .headerStyle': {
              height: '40px !important',
            },
          }}
        >
          <WDataTable
            columns={columns}
            rows={data.medicalHistory}
            headerHeight={46}
            rowHeight={62}
            pageSize={2}
            noDataTxt={'진료 이력 정보가 없습니다.'}
          />
        </Grid>
        <WPagination
          page={props.page}
          pagination={(event, value) => {
            props.setInPage(value);
          }}
          count={props.totalPages}
          size={'small'}
          color="#999"
          fontSize="12px"
          paddingTop="4px"
          minWidth="auto"
          sx={{
            '& .WPagination-root': {
              '& .MuiPagination-ul': {
                gap: '0px',
              },
              '& .MuiButtonBase-root': {
                height: '24px',
                minWidth: '24px',
                padding: '0px',
              },
            },
          }}
        />
      </Stack>
      {detailId ? (
        <WatingRoomTreatmentDetail
          ulid={detailId}
          open={detailOpen}
          handleClose={() => {
            modalDetailOpen('', false);
          }}
        />
      ) : (
        <></>
      )}
      {prescriptionId ? (
        <WatingRoomPrescription
          ulid={prescriptionId}
          open={prescriptionOpen}
          fileInfoUlid={prescriptionFileId}
          handleClose={() => {
            modalPrescriptionOpen('', '', false);
          }}
        />
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default WaitingRoomTreatHistory;
