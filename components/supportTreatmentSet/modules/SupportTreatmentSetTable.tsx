import React, { useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { GridColDef } from '@mui/x-data-grid';
import WDataTable, { GridButton } from '@components/common/table/WDataTable';
import { TreatmentSetTableType } from '../type';
import WSwitch from '@components/common/buttons/WSwitch';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Typography } from '@mui/material';
import SupportTreatmentSetReception from '../modal/SupportTreatmentSetReception';
import UserInfoContext from '@hooks/contexts/UserInfoContext';
import ScheduleIcon from 'public/assets/icons/ic_schedule_gray.svg';

export interface DataListType extends TreatmentSetTableType {
  id: number;
}

const SupportTreatmentSetTable = (props: { data: TreatmentSetTableType[] }): JSX.Element => {
  const { data } = props;
  const rows = data.map((item, index) => {
    return { ...item, ['id']: index };
  });
  const { handleTokenInfo, accountInfo } = useContext(UserInfoContext);
  const router = useRouter();
  const [tableData, setTableData] = useState<DataListType>();
  const [reception, setReception] = useState<boolean>(false);

  const onClickInDataOpen = useCallback((info: DataListType) => {
    setTableData(info);
    setReception(true);
  }, []);

  const onClickInDataClose = useCallback(() => {
    setTableData(undefined);
    setReception(false);
  }, []);

  const openDoctorSet = (id: string) => {
    handleTokenInfo();
    router.push(
      {
        pathname: `/medical-support/doctor-set/`,
        query: { doctorId: id },
      },
      undefined,
      {
        shallow: true,
      },
    );
  };
  const isNotEmr = accountInfo && !accountInfo.useEmr ? true : false;
  let columns: GridColDef[] = [
    {
      field: 'department',
      headerName: '진료과',
      width: isNotEmr ? 530 : 540,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        return (
          <Typography
            textAlign="center"
            width="400px"
            sx={{
              wordBreak: 'keep-all',
            }}
          >
            {params.row.department}
          </Typography>
        );
      },
    },
    {
      field: 'doctorNameKo',
      headerName: '의사 이름',
      width: isNotEmr ? 100 : 160,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
    },
    {
      field: 'doctorAccountUlid',
      headerName: '의사 진료 설정',
      width: isNotEmr ? 180 : 200,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        return (
          <GridButton
            onClick={() => {
              openDoctorSet(params.row.doctorAccountUlid);
            }}
            startIcon={<PersonIcon sx={{ fontSize: '18px', color: '#666' }} />}
            style={{
              '&.Icon-style': {
                padding: '7px 10px',
              },
              '& .MuiGrid-root': {
                gap: '5px',
                '& .MuiTypography-root': {
                  letterSpacing: '-1px',
                  fontSize: '12px',
                },
              },
            }}
          >
            {params.row.isCompleted ? '의사 진료 설정' : '의사 진료 설정 필요'}
          </GridButton>
        );
      },
    },
    {
      field: 'clinicStatus',
      headerName: '의사 접수 시작 / 마감',
      width: isNotEmr ? 220 : 290,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        const info = {
          fullWidth: '154px',
          switchheight: '40px',
          switchWidth: '78px',
          switchOn: '"ON"',
          switchOff: '"OFF"',
          moveTranslateX: 'translateX(76px)',
          borderRadius: '6px',
        };
        const btn = {
          position: 'absolute',
          left: '0px',
          top: '0px',
          width: '100%',
          height: '100%',
        };

        return (
          <Box sx={{ position: 'relative' }}>
            <WSwitch checked={params.row.clinicStatus} info={info} disabled />
            <Button sx={btn} onClick={() => onClickInDataOpen(params.row)}></Button>
          </Box>
        );
      },
    },
  ];

  if (isNotEmr) {
    const schedule: GridColDef[] = [
      {
        field: 'doctorScheduleMts',
        headerName: '의사 스케줄 관리',
        width: 160,
        sortable: false,
        editable: false,
        filterable: false,
        hideable: false,
        renderCell: (params) => {
          return (
            <GridButton
              onClick={() => {
                router.push(`/medical-support/doctor-schedule/${params.row.doctorAccountUlid}`);
              }}
              startIcon={<ScheduleIcon />}
              style={{
                '&.Icon-style': {
                  padding: '5px 10px',
                },
                '& .MuiGrid-root': {
                  gap: '5px',
                  '& .MuiTypography-root': {
                    letterSpacing: '-1px',
                    fontSize: '14px',
                  },
                },
              }}
            >
              {'스케줄 관리'}
            </GridButton>
          );
        },
      },
    ];
    columns.splice(3, 0, schedule[0]);
  }

  return (
    <>
      <WDataTable rows={rows} columns={columns} />
      <SupportTreatmentSetReception
        open={reception}
        handleClose={onClickInDataClose}
        tableData={tableData}
      />
    </>
  );
};

export default SupportTreatmentSetTable;
