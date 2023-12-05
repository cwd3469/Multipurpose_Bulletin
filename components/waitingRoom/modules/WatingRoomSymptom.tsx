import Image from 'next/image';
import { useState } from 'react';
import { Box, Button, Grid, Skeleton, Stack, SxProps, Theme, Typography } from '@mui/material';
import {
  SymptomMeducalInterview,
  SymptomScrollBox,
  WaitingRoomTextarea,
} from '../WaitingRoomTheme';
import WCopyButton from '@components/common/buttons/WCopyButton';
import WPreviewModal from '@components/common/modal/WPreviewModal';
import { WDepartmentHistoryTalking } from '@components/common/modal/WDetailModal';
import { WatingRoomSymptomData } from '../type';
import useImagePreview from '@hooks/file/useImagePreview';
import WPreviewDownload from '@components/common/buttons/WPreviewDownload';

const MeducalInterview = (props: WDepartmentHistoryTalking) => {
  const { answer, directIn, question } = props;

  return (
    <Grid
      container
      padding="15px 0"
      borderBottom={'1px solid #EBECED'}
      justifyContent="space-between"
      alignItems={'center'}
    >
      {' '}
      <Typography variant="caption" color="#666" letterSpacing={'0px'} width="275px">
        {question}
      </Typography>
      <Grid container alignItems="center" justifyContent={'space-between'} paddingRight="5px">
        <Grid container color="#333" width="300px">
          {answer.map((txt, index) => {
            return (
              <Typography key={index} variant="body1" paddingRight="14px">
                {txt}
              </Typography>
            );
          })}
          <Typography variant="body1">{directIn}</Typography>
        </Grid>
        <WCopyButton copyTxt={answer.join(' ') + `: ${directIn}`} />
      </Grid>
    </Grid>
  );
};

const NullIList = (props: { text: string; sx?: SxProps<Theme> }) => {
  return (
    <Stack
      sx={{
        width: '100%',
        gap: '6px',
        alignItems: 'center',
        justifyContent: 'center',
        ...props.sx,
      }}
    >
      <Image
        src={'/assets/icons/informationCircle.svg'}
        alt="informationCircle"
        width={18}
        height={18}
      ></Image>
      <Typography
        variant="body1"
        textAlign={'center'}
        color="#999"
        fontWeight="400"
        letterSpacing="0px"
        lineHeight="1"
      >
        {props.text}
      </Typography>
    </Stack>
  );
};

const WatingRoomSymptom = (props: { symptomData: WatingRoomSymptomData }) => {
  const { symptomData } = props;
  const { symptom, symptomImages, medicalHistoryTalk } = symptomData;
  const data = {
    symptom: symptom,
  };
  const { fileArr } = useImagePreview({
    imgList: symptomImages,
  });
  const [src, setSrc] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const backModal = () => setModalOpen(false);
  const imageOnClick = (url: string) => {
    setSrc(url);
    setModalOpen(true);
  };
  const meducalInterview: WDepartmentHistoryTalking[] = medicalHistoryTalk;
  const isFileArr = fileArr.length ? true : false;
  const isCycle = symptomImages.length ? (isFileArr ? false : true) : false;

  return (
    <Box
      sx={{
        width: '400px',
      }}
    >
      <Stack gap="20px">
        <Stack gap="12px">
          <Typography variant="subtitle1" lineHeight={'24px'}>
            증상
          </Typography>
          <SymptomScrollBox>
            <WaitingRoomTextarea
              value={data.symptom}
              readOnly
              sx={{
                height: '120px !important',
                overflowY: 'scroll !important',
              }}
            ></WaitingRoomTextarea>
            <Box height="8px" />
            <Grid container justifyContent={'end'}>
              <WCopyButton copyTxt={data.symptom} />
            </Grid>
          </SymptomScrollBox>
        </Stack>
        <Stack gap="12px">
          <Typography variant="subtitle1" lineHeight={'24px'}>
            병변 사진
          </Typography>
          <Grid container gap="5px" height="88px">
            {isCycle ? (
              <Grid container gap="8px">
                {symptomImages.map((item, index) => {
                  return <Skeleton variant="rectangular" width={100} height={90} key={index} />;
                })}
              </Grid>
            ) : isFileArr ? (
              <Grid container gap="8px">
                {fileArr.map((img, index) => {
                  return (
                    <Button
                      key={index}
                      sx={{ padding: '0px' }}
                      onClick={() => imageOnClick('data:image/png;base64,' + img.url)}
                    >
                      <Box
                        sx={{
                          width: '100px',
                          height: '80px',
                          position: 'relative',
                        }}
                      >
                        <Image
                          src={`data:image/png;base64,${img.url}`}
                          alt="병변사진"
                          layout="fill"
                          objectFit="cover"
                        />
                      </Box>
                    </Button>
                  );
                })}
              </Grid>
            ) : isCycle ? (
              <></>
            ) : (
              <NullIList text="병변 사진 정보가 없습니다." sx={{ height: '52px' }} />
            )}
          </Grid>
        </Stack>
        <Stack gap="12px">
          <Typography variant="subtitle1" lineHeight={'24px'}>
            추가 서류
          </Typography>
          <Box height="40px">
            {props.symptomData.documents.length ? (
              <WPreviewDownload
                sx={{
                  '& .btnGrid': {
                    gap: '3px',
                  },
                  '& .wFileLadel': {
                    width: '220px',
                  },
                  '& .wPreviewBtn': {
                    fontSize: '12px',
                    padding: '5px',
                    width: '80px',
                    '& .MuiBox-root': {
                      width: '14px',
                    },
                  },
                  '& .wDownloadBtn': {
                    padding: '5px',
                    width: '80px !important',
                    '& .MuiBox-root': {
                      width: '14px',
                    },
                    '& .MuiTypography-root': {
                      fontSize: '12px',
                    },
                  },
                }}
                downloadPreView={props.symptomData.documents}
              />
            ) : (
              <NullIList text="추가 서류 정보가 없습니다." sx={{ height: '40px' }} />
            )}
          </Box>
        </Stack>
        <Stack gap="12px">
          <Typography variant="subtitle1" lineHeight={'24px'}>
            진료과별 문진 내역
          </Typography>
          <SymptomMeducalInterview>
            <Stack>
              {meducalInterview.length ? (
                meducalInterview.map((item, index) => {
                  return <MeducalInterview key={index} {...item} />;
                })
              ) : (
                <NullIList text="문진 내역 정보가 없습니다." sx={{ height: '60px' }} />
              )}
            </Stack>
          </SymptomMeducalInterview>
        </Stack>
      </Stack>
      <WPreviewModal
        open={modalOpen}
        handleClose={backModal}
        src={src}
        title="병변 사진 자세히 보기"
      />
    </Box>
  );
};

export default WatingRoomSymptom;
