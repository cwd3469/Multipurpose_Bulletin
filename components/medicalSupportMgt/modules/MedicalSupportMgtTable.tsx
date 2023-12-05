import React from 'react';
import { Grid, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import WDataTable, { GridButton } from '@components/common/table/WDataTable';
import { MedicalSupportMgtType } from '../type';
import { useRouter } from 'next/router';
import { DoctorDetailButton } from '@components/doctorMgt/DoctorMgtTheme';
import { dateFormat } from '@utils/date';
import { transTextAccountState } from '@utils/transtext';

const MedicalSupportMgtTable = (props: {
  data: MedicalSupportMgtType[];
}): JSX.Element => {
  const { data } = props;
  const rows = data.map((item, index) => {
    return { ...item, ['id']: index };
  });
  const router = useRouter();
  const onlickRouter = (id: string) => {
    router.push(`/hospital-admin/medical-support-info/${id}`, undefined, {
      shallow: true,
    });
  };

  const columns: GridColDef[] = [
    {
      field: 'medicalSupportAccountId',
      headerName: '아이디',
      width: 239,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
    },
    {
      field: 'nameKo',
      headerName: '진료 지원 이름',
      width: 239,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
    },

    {
      field: 'createdAt',
      headerName: '진료 지원 등록일',
      width: 239,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        const { dayTime, day, time } = dateFormat(params.row.createdAt);
        return (
          <Typography
            variant="body1"
            sx={{
              letterSpacing: '-0.14px',
              '& .bold': { fontWeight: 'bold', color: '#333' },
            }}
          >
            <span className="bold">{day}</span> {time}
          </Typography>
        );
      },
    },
    {
      field: 'accountNonLocked',
      headerName: '계정상태',
      width: 239,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        return transTextAccountState(params.row.accountNonLocked);
      },
    },
    {
      field: 'doctorDetail',
      headerName: '진료 지원 상세보기',
      width: 239,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        return (
          <DoctorDetailButton
            variant="outlined"
            color="info"
            onClick={() => {
              onlickRouter(params.row.medicalSupportAccountUlid);
            }}
          >
            상세 보기
          </DoctorDetailButton>
        );
      },
    },
  ];

  return <WDataTable rows={rows} columns={columns} />;
};

export default MedicalSupportMgtTable;
