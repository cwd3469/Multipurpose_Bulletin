import { useEffect, useState } from 'react';
import WAlertModal from '@components/common/modal/WAlertModal';
import { Box, Button, Grid, Skeleton, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import WPreviewModal from './WPreviewModal';
import { ModalType } from 'types/signin';
import useImagePreview from '@hooks/file/useImagePreview';
import WPreviewDownload from '../buttons/WPreviewDownload';
import { dateFormat } from '@utils/date';
import dayjs from 'dayjs';

export interface DocumentsType {
  fileOriginalName: string;
  fileUlid: string;
}
export interface DownloadPreView {
  url: string;
  name: string;
}
export interface WDepartmentHistoryTalking {
  answer: string[];
  directIn: string;
  question: string;
}
export interface WDetailModalDataDto {
  departmentHistoryTalking: WDepartmentHistoryTalking[];
  registrationUlid: string;
  symptom: string;
  symptomImages: DocumentsType[];
}
export interface WDetailModalType extends ModalType {
  symptom?: string;
  medicalHistoryTalk?: WDepartmentHistoryTalking[];
  imgList?: DocumentsType[];
  addDoc?: DocumentsType[];
  title?: string;
  closedAt?: string;
  patientMessage?: string;
}
export interface WDetailModalTypeQueue extends ModalType {
  closedAt: string;
  documents: DocumentsType[];
  medicalHistoryTalk: WDepartmentHistoryTalking[];
  patientMessage: string;
  registrationUlid: string;
  symptom: string;
  symptomImages: DocumentsType[];
}
export interface WSupportDetailModalType extends ModalType {
  closedAt: string;
  additionalDocuments: DocumentsType[];
  symptomImages: DocumentsType[];
  patientSymptomMessage: string;
  medicalHistoryTalk: WDepartmentHistoryTalking[];
  registrationUlid: string;
  symptom: string;
}
export interface WSupportDetailModalTypeQueue extends WSupportDetailModalType {
  closedAt: string;
  documents: DocumentsType[];
  medicalHistoryTalk: WDepartmentHistoryTalking[];
  patientMessage: string;
  registrationUlid: string;
  symptom: string;
  symptomImages: DocumentsType[];
}

const WDetailModal = (props: WDetailModalType) => {
  const [src, setSrc] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const [symptomState, setSymptomState] = useState<string>();
  const [medicalHistoryTalkState, setMedicalHistoryTalkState] =
    useState<WDepartmentHistoryTalking[]>();
  const [patientMessageState, setPatientMessageState] = useState<string>();
  const [closedAtState, setClosedAtState] = useState<string>();
  const [imgListState, setImgListState] = useState<DocumentsType[]>();
  const [addDocState, setAddDocState] = useState<DocumentsType[]>();

  useEffect(() => {
    setSymptomState(props.symptom);
    setMedicalHistoryTalkState(props.medicalHistoryTalk);
    setImgListState(props.imgList);
    setAddDocState(props.addDoc);
    setClosedAtState(props.closedAt);
    setPatientMessageState(props.patientMessage);
  }, [
    props.addDoc,
    props.closedAt,
    props.imgList,
    props.medicalHistoryTalk,
    props.patientMessage,
    props.symptom,
  ]);

  const imageOnClick = (url: string) => {
    setSrc(url);
    setModalOpen(true);
    setDisable(true);
  };
  const reset = () => {
    props.handleClose();
    setModalOpen(false);
  };
  const backModal = () => {
    setModalOpen(false);
    setDisable(false);
  };
  const now = dayjs().format();
  const treatDate = dateFormat(closedAtState ? closedAtState : now);
  return (
    <WAlertModal
      open={props.open}
      handleClose={reset}
      maxWidth={'xl'}
      btnTitle="확인"
      bgDisable={disable}
      titleSx={{ padding: '50px 40px 40px' }}
      title={props.title ? props.title : '진료 접수 상세 내용'}
    >
      <>
        <Stack width="720px">
          <Stack
            gap="28px"
            sx={{
              borderRadius: '6px',
              backgroundColor: 'rgba(216, 216, 216, 0.2)',
              padding: ' 40px',
            }}
          >
            {closedAtState ? (
              <Stack gap="16px">
                <Typography variant="subtitle1" lineHeight={'24px'}>
                  진료 일시
                </Typography>
                <Typography
                  variant="body1"
                  lineHeight={'1.4'}
                  color="#333"
                  width={'545px'}
                >
                  {treatDate.dayTime}
                </Typography>
              </Stack>
            ) : (
              ''
            )}
            {patientMessageState ? (
              <Stack gap="16px">
                <Typography variant="subtitle1" lineHeight={'24px'}>
                  환자 전달사항
                </Typography>
                <Typography
                  variant="body1"
                  lineHeight={'1.4'}
                  color="#333"
                  width={'545px'}
                >
                  {patientMessageState}
                </Typography>
              </Stack>
            ) : (
              ''
            )}
            {symptomState ? (
              <Stack gap="16px">
                <Typography variant="subtitle1" lineHeight={'24px'}>
                  증상
                </Typography>
                <Typography
                  variant="body1"
                  lineHeight={'1.4'}
                  color="#333"
                  width={'545px'}
                >
                  {symptomState}
                </Typography>
              </Stack>
            ) : (
              ''
            )}
            {imgListState ? (
              <WDetailLesionPhoto
                photoList={imgListState}
                openModal={imageOnClick}
              />
            ) : (
              <></>
            )}
            <Stack gap="16px">
              <Typography variant="subtitle1" lineHeight={'24px'}>
                추가 서류
              </Typography>
              {addDocState?.length ? (
                <WPreviewDownload downloadPreView={addDocState} />
              ) : (
                <Typography variant="body1" lineHeight={'1'} color="#666">
                  서류 없음
                </Typography>
              )}
            </Stack>
            {medicalHistoryTalkState ? (
              <Stack gap="16px">
                <Typography variant="subtitle1" lineHeight={'24px'}>
                  진료과별 문진
                </Typography>
                <Stack gap="16px">
                  {medicalHistoryTalkState.length === 0 ? (
                    <Typography variant="body1" lineHeight={'1'} color="#666">
                      문진 없음
                    </Typography>
                  ) : (
                    medicalHistoryTalkState.map((item, index) => {
                      return (
                        <Box key={index}>
                          <Typography
                            variant="body1"
                            lineHeight={'1'}
                            color="#333"
                          >
                            {index + 1}. {item.question}
                          </Typography>
                          <Grid container paddingTop="4px">
                            {item.answer.map((el, int) => {
                              return (
                                <Typography
                                  key={int}
                                  sx={{ padding: '8px' }}
                                  variant="body1"
                                  lineHeight={'1'}
                                  color="#666"
                                >
                                  {el}
                                </Typography>
                              );
                            })}
                            {item.directIn ? (
                              <Typography
                                sx={{ padding: '8px' }}
                                variant="body1"
                                lineHeight={'1'}
                                color="#666"
                              >
                                {item.directIn}
                              </Typography>
                            ) : (
                              ''
                            )}
                          </Grid>
                        </Box>
                      );
                    })
                  )}
                </Stack>
              </Stack>
            ) : (
              ''
            )}
          </Stack>
          <Box height="52px" />
        </Stack>
        <WPreviewModal
          open={modalOpen}
          handleClose={backModal}
          src={src}
          title={'병변 사진 자세히보기'}
        />
      </>
    </WAlertModal>
  );
};

const WDetailLesionPhoto = (props: {
  photoList: DocumentsType[];
  openModal: (url: string) => void;
}) => {
  const { fileArr } = useImagePreview({ imgList: props.photoList });

  const isFileArr = fileArr.length ? true : false;
  const isCycle = props.photoList.length ? (isFileArr ? false : true) : false;

  return (
    <Stack gap="16px">
      <Typography variant="subtitle1" lineHeight={'24px'}>
        병변 사진
      </Typography>
      {isCycle ? (
        <Grid container gap="8px">
          {props.photoList.map((item, index) => {
            return (
              <Skeleton
                variant="rectangular"
                width={100}
                height={90}
                key={index}
              />
            );
          })}
        </Grid>
      ) : fileArr.length ? (
        <Grid container gap="8px">
          {fileArr.map((img, index) => {
            return (
              <Button
                key={index}
                sx={{ padding: '0px' }}
                onClick={() =>
                  props.openModal('data:image/png;base64,' + img.url)
                }
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
      ) : (
        <Typography variant="body1" lineHeight={'1'} color="#666">
          사진 없음
        </Typography>
      )}
    </Stack>
  );
};
export default WDetailModal;
