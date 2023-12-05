import Image from 'next/image';
import { GridButton } from '@components/common/table/WDataTable';
import { Grid, Stack, SxProps, Theme, Typography } from '@mui/material';
import { commaAdd } from '@utils/formatNumber';
import { paymentStatusText } from '@utils/transtext';

export const MedicineExpFormat = (props: {
  medicineExpenses: string;
  resisterStatues: boolean;
  paymentStatus: string;
  medicineState: string;
  medicineCountry: string;
  sx?: SxProps<Theme>;
}) => {
  const {
    medicineExpenses,
    paymentStatus,
    medicineState,
    medicineCountry,
    resisterStatues,
    sx,
  } = props;
  const exp = commaAdd(medicineExpenses) + ' 원';
  if (medicineState === 'CLOSE') {
    if (resisterStatues) {
      if (medicineCountry === '국내') {
        return (
          <Stack alignContent="center" sx={sx}>
            <Typography textAlign="center">{exp}</Typography>
            <Typography color="#333333" textAlign="center">
              {paymentStatusText(paymentStatus)}
            </Typography>
          </Stack>
        );
      } else {
        return (
          <Typography textAlign="center" sx={sx}>
            {exp}
          </Typography>
        );
      }
    } else {
      return (
        <Typography sx={sx} textAlign="center">
          {'(미등록)'}
        </Typography>
      );
    }
  } else {
    return <>-</>;
  }
};

export const ExpensesFix = (props: {
  isDone: boolean;
  medicineState: string;
  prescriptionStatus: string;
  openExpensesOn: (state: string) => void;
  openRegistration: () => void;
  sx?: SxProps<Theme>;
  disabled?: boolean;
}) => {
  const {
    sx,
    isDone,
    disabled,
    medicineState,
    prescriptionStatus,
    openExpensesOn,
    openRegistration,
  } = props;

  const btnTitle =
    medicineState === 'CLOSE'
      ? isDone
        ? '진료비/처방전 수정'
        : prescriptionStatus
        ? '진료비/처방전 수정'
        : '진료비/처방전 등록'
      : '진료비 없음';

  const prescription =
    medicineState === 'CLOSE'
      ? isDone
        ? prescriptionStatus
          ? '처방전 있음'
          : '처방전 없음'
        : '-'
      : '처방전 없음';

  const src =
    medicineState === 'CLOSE'
      ? isDone
        ? prescriptionStatus
          ? '/assets/icons/boardCheck.svg'
          : '/assets/icons/boardNone.svg'
        : ''
      : '/assets/icons/boardNone.svg';

  const onClick = () => {
    if (medicineState === 'CLOSE') {
      if (isDone) {
        //처방전 수정
        openExpensesOn(prescriptionStatus);
      } else {
        // 등록
        openRegistration();
      }
    }
  };

  return (
    <Grid
      container
      justifyContent={'space-between'}
      alignItems="center"
      padding="0px 6px"
      sx={sx}
    >
      <GridButton
        style={{
          width: '60%',
          letterSpacing: '-1px',
          '& .MuiGrid-root': {
            justifyContent: 'center',
          },
        }}
        disabled={
          disabled ? disabled : medicineState === 'CLOSE' ? false : true
        }
        onClick={onClick}
      >
        {btnTitle}
      </GridButton>
      <Grid
        className="no-prescription"
        container
        justifyContent={'center'}
        alignItems="center"
        gap="1px"
        width="40%"
      >
        {src ? (
          <Image src={src} alt="처방전 이미지" width={20} height={20} />
        ) : (
          ''
        )}
        <Typography variant="caption" color="#000" letterSpacing="-1px">
          {prescription}
        </Typography>
      </Grid>
    </Grid>
  );
};

export const OverseasBtn = (props: {
  medicineState: string;
  openDocPrescriptionOn: () => void;
  openExpList: () => void;
  sx?: SxProps<Theme>;
}) => {
  const { medicineState, openDocPrescriptionOn, openExpList, sx } = props;
  return (
    <Grid
      container
      justifyContent={'space-between'}
      alignItems="center"
      sx={sx}
    >
      <Grid
        container
        width={'140px'}
        justifyContent={'center'}
        paddingLeft="6px"
        className="expList-btn"
      >
        <GridButton
          onClick={openExpList}
          style={{
            width: '90px',
            letterSpacing: '-1px',
            '& .MuiGrid-root': {
              justifyContent: 'center',
            },
          }}
          disabled={medicineState === 'close' ? false : true}
        >
          추가 진료비
        </GridButton>
      </Grid>
      <Grid
        container
        width={'100px'}
        justifyContent={'center'}
        paddingLeft="6px"
        className="doc-btn"
      >
        <GridButton
          onClick={openDocPrescriptionOn}
          style={{
            width: '80px',
            letterSpacing: '-1px',
            '& .MuiGrid-root': {
              justifyContent: 'center',
            },
          }}
          disabled={medicineState === 'close' ? false : true}
        >
          첨부 서류
        </GridButton>
      </Grid>
    </Grid>
  );
};

export const medicineState = (state: string) => {
  switch (state) {
    case 'close':
      return '진료 종료';
    case 'cancel':
      return '진료 취소';
  }
};

export const telemedicineCauseSwitch = (
  string: string,
): {
  keyId: string;
  src: string;
} => {
  switch (string) {
    case 'VIDEO_CALL':
      return {
        keyId: '화상 진료',
        src: '/assets/icons/video_call.svg',
      };
    case 'VOICE_CALL':
      return {
        keyId: '음성 진료',
        src: '/assets/icons/voice_call.svg',
      };
    case '화상':
      return {
        keyId: '화상 진료',
        src: '/assets/icons/video_call.svg',
      };
    case '음성':
      return {
        keyId: '음성 진료',
        src: '/assets/icons/voice_call.svg',
      };
    default:
      return {
        keyId: '',
        src: '',
      };
  }
};

export const TelemedicineCause = (props: { telemedicineType: string }) => {
  const path = telemedicineCauseSwitch(props.telemedicineType);
  return (
    <Grid container alignItems="center" justifyContent="center" gap="8px">
      {path.src ? (
        <Image src={path.src} alt="진료수단 아이콘" width={28} height={28} />
      ) : (
        ''
      )}
      <Typography textAlign={'center'} color="#555" fontWeight="bold">
        {path.keyId}
      </Typography>
    </Grid>
  );
};

export const medicineCause = (string: string) => {
  if (string) {
    return string;
  } else {
    return '정상 종료';
  }
};

export const countryState = (string: string) => {
  switch (string) {
    case 'domestic':
      return '국내';
    case 'overseas':
      return '해외';
  }
};
