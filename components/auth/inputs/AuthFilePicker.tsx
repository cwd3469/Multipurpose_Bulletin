/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import { Box, Grid, Typography } from '@mui/material';
import { WMultiDragDrop } from '@components/common/fileUpload/types';
import useMultiFileUpload from '@components/common/fileUpload/useMultiFileUpload';
import WaitingRoomPdfView from '@components/waitingRoom/modules/WaitingRoomPdfView';
import { useRef, useState } from 'react';
import {
  DefaltInfo,
  DeleteBtn,
  FileLadel,
  ImageViewBox,
  ImageViewName,
} from '../signup/styled';
interface AuthFilePicker extends WMultiDragDrop {
  deleteUid: () => void;
  required?: boolean;
}

const AuthFilePicker = (props: AuthFilePicker) => {
  const { label, target, deleteUid, required } = props;
  const [files, setFileList] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { onChangeFile, dragRef, isDragging, imageSrc, err, deleteImg } =
    useMultiFileUpload({ ...props, setFileList: setFileList });

  return (
    <Grid container flexDirection="column">
      <input
        onChange={onChangeFile}
        ref={fileInputRef}
        type="file"
        id={target}
        style={{ display: 'none' }}
        accept=".jpg,.png,.pdf"
        name="file"
      />
      {imageSrc.length !== 0 ? (
        imageSrc.map((img, inx) => {
          return (
            <div key={inx}>
              <ImageViewName>{img.id}</ImageViewName>
              <Box height="8px" />
              <ImageViewBox>
                {img.type == 'application/pdf' ? (
                  <WaitingRoomPdfView pdf={files[0]} />
                ) : (
                  <Image
                    src={img.type == 'application/pdf' ? '' : img.url}
                    alt="이미지"
                    layout="fill"
                    objectFit="cover"
                    style={{ overflow: 'hidden', borderRadius: '6px' }}
                  />
                )}
                <DeleteBtn
                  onClick={(event) => {
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                    event.stopPropagation();
                    deleteImg(img.index);
                    deleteUid();
                  }}
                >
                  <Box width="24px" height="24px" position={'relative'}>
                    <Image
                      src={'/assets/icons/closeIcon.svg'}
                      alt="로고 취소"
                      layout="fill"
                    />
                  </Box>
                </DeleteBtn>
              </ImageViewBox>
            </div>
          );
        })
      ) : (
        <>
          <Typography color="#ccc">{label}</Typography>
          <Box height="8px" />
          <FileLadel
            className={isDragging ? 'drag-in' : 'drag-out'}
            ref={dragRef}
            htmlFor={target}
          >
            <DefaltInfo />
          </FileLadel>
        </>
      )}
      <Box width="200px" height="30px" padding="8px 0">
        {err.boo ? (
          <Typography variant="caption" color="#FC5935" lineHeight="1.2">
            {err.msg}
          </Typography>
        ) : (
          ''
        )}
      </Box>
    </Grid>
  );
};

export default AuthFilePicker;
