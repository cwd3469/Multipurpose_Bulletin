import { Box, Grid, Stack, styled } from '@mui/material';
import { ModalType } from 'types/signin';
import WAlertModal from '@components/common/modal/WAlertModal';

interface ModifyType extends ModalType {
  id: number;
}

const HistoryModifyList = (props: ModifyType) => {
  const { handleClose, open, id } = props;

  const reset = () => {
    handleClose();
  };
  const data = [
    {
      id: 1,
      date: '2022. 10. 21 09:10',
      contents:
        '감기 기운으로 인한 몸살로 예상됩니다.충분한 휴식이 필요합니다.',
    },
    {
      id: 2,
      date: '2022. 10. 11 09:10',
      contents:
        '감기 기운으로 인한 몸살로 예상됩니다.충분한 휴식이 필요합니다. 감기 기운으로 인한 몸살로 예상됩니다.충분한 휴식이 필요합니다.',
    },
    {
      id: 3,
      date: '2022. 01. 21 09:10',
      contents:
        '감기 기운으로 인한 몸살로 예상됩니다.충분한 휴식이 필요합니다. 감기 기운으로 인한 몸살로 예상됩니다.충분한 휴식이 필요합니다.',
    },
    {
      id: 4,
      date: '2022. 10. 21 19:10',
      contents:
        '감기 기운으로 인한 몸살로 예상됩니다.충분한 휴식이 필요합니다. 감기 기운으로 인한 몸살로 예상됩니다.충분한 휴식이 필요합니다.',
    },
  ];

  return (
    <WAlertModal
      open={open}
      handleClose={reset}
      maxWidth={'xl'}
      btnTitle="확인"
      title="수정 기록 보기"
      titleSx={{ padding: '80px 20px 43px' }}
    >
      <Stack width="800px">
        <Stack width="800px" padding="0px 40px">
          <Stack
            gap="28px"
            sx={{
              borderRadius: '6px',
              backgroundColor: 'rgba(216, 216, 216, 0.2)',
              padding: '60px 40px',
            }}
          >
            <Grid container alignItems={'center'}>
              <ModifyDate className="th">일시</ModifyDate>
              <ModifyContents className="th">내용</ModifyContents>
            </Grid>
            <Stack>
              {data.map((history, index) => {
                return (
                  <Grid
                    container
                    alignItems={'center'}
                    borderBottom="1px solid #ebeced"
                    key={index}
                    sx={{
                      padding: '16px 0px',
                    }}
                  >
                    <ModifyDate className="tb">{history.date}</ModifyDate>
                    <ModifyContents className="tb">
                      {history.contents}
                    </ModifyContents>
                  </Grid>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
        <Box height="44px" />
      </Stack>
    </WAlertModal>
  );
};

export const ModifyDate = styled(Box)(({ theme }) => ({
  width: '230px',
  color: '#333',
  '&.th': {
    ...theme.typography.subtitle1,
  },
  '&.tb': {
    ...theme.typography.body1,
  },
}));

export const ModifyContents = styled(Box)(({ theme }) => ({
  width: '400px',
  color: '#333',
  '&.th': {
    ...theme.typography.subtitle1,
  },
  '&.tb': {
    ...theme.typography.body1,
  },
}));
export default HistoryModifyList;
