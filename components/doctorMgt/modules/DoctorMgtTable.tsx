import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import WDataTable, { GridButton } from '@components/common/table/WDataTable';
import { DoctorMgtDtoType } from '../type';
import { useRouter } from 'next/router';
import { DoctorDetailButton } from '../DoctorMgtTheme';
import { dateFormat } from '@utils/date';

const DoctorMgtTable = (props: { data: DoctorMgtDtoType[] }): JSX.Element => {
  const { data } = props;

  const rows = data.map((item, index) => {
    return { ...item, ['id']: index };
  });

  const router = useRouter();

  const onlickRouter = (id: string) => {
    router.push(
      {
        pathname: `/hospital-admin/doctor-info/${id}`,
      },
      undefined,
      {
        shallow: true,
      },
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'doctorAccountId',
      headerName: '아이디',
      width: 120,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
    },

    {
      field: 'treatableDepartmentNames',
      headerName: '진료과',
      width: 500,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        return (
          <Typography
            textAlign={'center'}
            sx={{
              wordBreak: 'keep-all',
            }}
          >
            {params.row.treatableDepartmentNames}
          </Typography>
        );
      },
    },
    {
      field: 'nameKo',
      headerName: '의사이름',
      width: 120,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
    },

    {
      field: 'createdAt',
      headerName: '의사 등록일',
      width: 200,
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
      field: 'accountNonLocked',
      headerName: '계정상태',
      width: 100,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        const state = params.row.accountNonLocked ? '활성' : '비활성';
        return <>{state}</>;
      },
    },
    {
      field: 'doctorDetail',
      headerName: '의사상세보기',
      width: 140,
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
              onlickRouter(params.row.doctorAccountUlid);
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

export default DoctorMgtTable;
