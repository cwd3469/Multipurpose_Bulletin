import WAlertModal from '@components/common/modal/WAlertModal';
import { Box, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import usePrescriptionPreview from '@hooks/file/usePrescriptionPreview';
import WaitingRoomPdfView from '../modules/WaitingRoomPdfView';

const WatingRoomPrescription = (props: {
  ulid: string;
  fileInfoUlid: string;
  open: boolean;
  handleClose: () => void;
}) => {
  const info = {
    registrationUlid: props.ulid,
    fileInfoUlid: props.fileInfoUlid,
    handleClose: props.handleClose,
  };
  const [imageSrc, setImageSrc] = useState<string>('');
  const { fileArr, fileForm, reset: fileReset } = usePrescriptionPreview(info);

  useEffect(() => {
    if (fileArr.length) {
      const reader = new FileReader();
      const file = fileArr[0];
      reader.onload = () => {
        const objectURL = URL.createObjectURL(file);
        const csv: string = reader.result as string;
        const fileObj = {
          id: file.name,
          src: csv,
          index: file.lastModified,
          type: file.type,
          url: objectURL,
        };
        setImageSrc(objectURL);
      };

      reader.readAsDataURL(file);
    }
  }, [fileArr]);

  return (
    <>
      <WAlertModal
        open={props.open}
        handleClose={props.handleClose}
        maxWidth="lg"
        title="처방전 자세히보기"
      >
        <Stack width={'735px'} paddingBottom="50px">
          {fileArr.length ? (
            fileArr[0].type === 'application/pdf' ? (
              <Grid container width="735px" justifyContent="center">
                <WaitingRoomPdfView pdf={fileArr[0]} />
              </Grid>
            ) : (
              <Box height="900px" position="relative">
                <Image
                  src={imageSrc}
                  alt="처방전"
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
            )
          ) : (
            <></>
          )}
        </Stack>
      </WAlertModal>
    </>
  );
};

export default WatingRoomPrescription;
