import React, { useCallback, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import WDataTable, { GridButton } from '@components/common/table/WDataTable';
import { NoneReimbursePageDto } from '../type';
import { commaAdd } from '@utils/formatNumber';
import NonReimburseModify from '../modal/NonReimburseModify';
import { dateFormat } from '@utils/date';
import NonReimburseDelete from '../modal/NonReimburseDelete';

const NonReimburseTable = (props: {
  data: NoneReimbursePageDto[];
}): JSX.Element => {
  const { data } = props;
  const rows = data.map((item, index) => {
    return { ...item, ['id']: index };
  });

  const [open, setOpen] = useState<boolean>(false);
  const [deleteOn, setDeleteOn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>();
  const [deleteId, setDeleteId] = useState<string>();
  const openModal = useCallback((id: string) => {
    setOpen(true);
    setUserId(id);
  }, []);
  const closeModal = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setUserId(undefined);
    }, 500);
  }, []);
  const opneDelete = useCallback((id: string) => {
    setDeleteOn(true);
    setDeleteId(id);
  }, []);
  const closeDelete = useCallback(() => {
    setDeleteOn(false);
    setTimeout(() => {
      setDeleteId(undefined);
    }, 500);
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'createdAt',
      headerName: '등록일',
      width: 240,
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
      field: 'nameKo',
      sortable: false,
      headerName: '비급여 항목명',
      width: 360,
      editable: false,
      filterable: false,
      hideable: false,
    },
    {
      field: 'amount',
      sortable: false,
      headerName: '비급여 항목 금액',
      width: 200,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        return <>{commaAdd(String(params.row.amount))} 원</>;
      },
    },

    {
      field: 'modify',
      sortable: false,
      headerName: '수정',
      width: 195,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        return (
          <GridButton
            onClick={() => {
              openModal(params.row.nonReimbursementItemUlid);
            }}
            style={{ minWidth: 'auto' }}
          >
            수정
          </GridButton>
        );
      },
    },
    {
      field: 'delete',
      sortable: false,
      headerName: '삭제',
      width: 195,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        return (
          <GridButton
            onClick={() => {
              opneDelete(params.row.nonReimbursementItemUlid);
            }}
            style={{ minWidth: 'auto' }}
          >
            삭제
          </GridButton>
        );
      },
    },
  ];

  return (
    <>
      <WDataTable rows={rows} columns={columns} />
      {userId ? (
        <NonReimburseModify open={open} handleClose={closeModal} id={userId} />
      ) : (
        ''
      )}
      {deleteId ? (
        <NonReimburseDelete
          open={deleteOn}
          handleClose={closeDelete}
          id={deleteId}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default NonReimburseTable;
