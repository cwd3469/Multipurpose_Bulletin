import React, { useContext, useState } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import WDataTable, { GridButton } from '@components/common/table/WDataTable';
import { SupportHistoryInterface } from './type';
import { useRouter } from 'next/router';
import {
  ExpensesFix,
  medicineCause,
  MedicineExpFormat,
  OverseasBtn,
  TelemedicineCause,
} from '@components/history/modules/HistoryDocTheme';
import { dateFormat } from '@utils/date';
import SupportHistoryAmountRegist from '../modal/SupportHistoryAmountRegist';
import SupportHistoryAmountModify from '../modal/SupportHistoryAmountModify';
import WDayTimeText from '@components/common/typography/WDayTimeText';
import UserInfoContext from '@hooks/contexts/UserInfoContext';

const SupportHistoryTable = (props: {
  data: SupportHistoryInterface[];
}): JSX.Element => {
  const { data } = props;
  const { handleTokenInfo } = useContext(UserInfoContext);
  const rows = data.map((item, index) => {
    return { ...item, ['id']: index };
  });
  const router = useRouter();
  //처방전 수정 모달 ulid
  const [expensesId, setExpensesId] = useState<string>('');
  // 처방전 등록 모달 ulid
  const [confirmationId, setConfirmationId] = useState<string>('');
  //처방전 수정 모달
  const [expensesOn, setExpensesOn] = useState<boolean>(false);
  // 처방전 등록 모달
  const [confirmation, setConfirmation] = useState<boolean>(false);

  const openDetailPage = (id: string) => {
    handleTokenInfo();
    router.push(
      {
        pathname: `/medical-support/telemedicine/history-detail/`,
        query: { patientId: id },
      },
      undefined,
      {
        shallow: true,
      },
    );
  };

  /**국내 진료비 / 처방전 / 수정 */
  const openExpensesOn = (prescriptionUlid: string, id: string) => {
    setExpensesOn(true);
    setExpensesId(id);
  };
  /**국내 진료비 / 처방전 / 등록 */
  const openRegistration = (id: string) => {
    setConfirmation(true);
    setConfirmationId(id);
  };

  const columns: GridColDef[] = [
    {
      field: 'completedAt',
      headerName: '완료 일시',
      width: 144,
      sortable: false,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        const { day, time } = dateFormat(params.row.completedAt);
        return <WDayTimeText day={day} time={time} />;
      },
    },
    {
      field: 'doctorNameKo',
      sortable: false,
      headerName: '의사 이름',
      width: 90,
      editable: false,
      filterable: false,
      hideable: false,
    },
    {
      field: 'patientRegistrationNum',
      sortable: false,
      headerName: '환자 등록번호',
      width: 90,
      editable: false,
      filterable: false,
      hideable: false,
    },
    {
      field: 'nameAndAge',
      sortable: false,
      headerName: '환자 정보',
      width: 100,
      editable: false,
      filterable: false,
      hideable: false,
    },
    {
      field: 'telemedicineType',
      sortable: false,
      headerName: '진료수단',
      width: 100,
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
      field: 'statusNameKo',
      sortable: false,
      headerName: '상태',
      width: 80,
      editable: false,
    },
    {
      field: 'endStatusMessage',
      sortable: false,
      headerName: '사유',
      width: 140,
      editable: false,
      renderCell: (params) => {
        return (
          <Typography textAlign={'center'}>
            {medicineCause(params.row.endStatusMessage)}
          </Typography>
        );
      },
    },
    {
      field: 'amount',
      sortable: false,
      headerName: '진료비',
      width: 100,
      editable: false,
      renderCell: (params) => {
        const { amount, isDone, status, location, paymentStatus } = params.row;
        return (
          <Stack alignItems={'center'}>
            <MedicineExpFormat
              resisterStatues={isDone}
              medicineCountry={location}
              medicineExpenses={`${amount}`}
              paymentStatus={paymentStatus}
              medicineState={status}
            />
          </Stack>
        );
      },
    },
    {
      field: 'expensesFix',
      sortable: false,
      headerName: '진료비 / 처방전 / 서류',
      width: 240,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        const {
          isDone,
          status,
          prescriptionUlid,
          location,
          registrationUlid,
          isFixableTreatmentCost,
        } = params.row;
        if (location === '국내') {
          return (
            <ExpensesFix
              isDone={isDone}
              disabled={!isFixableTreatmentCost}
              medicineState={status}
              prescriptionStatus={prescriptionUlid}
              openExpensesOn={(state: string) =>
                openExpensesOn(state, registrationUlid)
              }
              openRegistration={() => openRegistration(registrationUlid)}
            />
          );
        } else {
          return (
            <OverseasBtn
              medicineState={status}
              openDocPrescriptionOn={() => undefined}
              openExpList={() => undefined}
            />
          );
        }
      },
    },

    {
      field: 'detailView',
      sortable: false,
      headerName: '진료 내용 상세',
      width: 114,
      editable: false,
      filterable: false,
      hideable: false,
      renderCell: (params) => {
        const { status, registrationUlid } = params.row;
        return (
          <GridButton
            disabled={status === 'CLOSE' ? false : true}
            onClick={() => openDetailPage(registrationUlid)}
          >
            진료 내역 상세
          </GridButton>
        );
      },
    },
  ];

  return (
    <Grid container sx={{ height: '706px' }}>
      <WDataTable rows={rows} columns={columns} />
      {expensesId ? (
        <SupportHistoryAmountModify
          ulid={expensesId}
          open={expensesOn}
          handleClose={() => {
            setExpensesOn(false);
            setExpensesId('');
          }}
        />
      ) : (
        ''
      )}
      {confirmationId ? (
        <SupportHistoryAmountRegist
          ulid={confirmationId}
          open={confirmation}
          handleClose={() => {
            setConfirmation(false);
            setConfirmationId('');
          }}
        />
      ) : (
        ''
      )}
    </Grid>
  );
};

export default SupportHistoryTable;
