import { Grid, Stack } from '@mui/material';
import Image from 'next/image';
import { ModalType } from 'types/signin';
import WAlertModal from '@components/common/modal/WAlertModal';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import React from 'react';
import { WIconButton } from '../buttons/WIconButton';

interface ImagePreView extends ModalType {
  src: string;
  title?: string;
}

const WPreviewModal = (props: ImagePreView) => {
  const { handleClose, open, src, title } = props;

  const reset = () => {
    handleClose();
  };

  return (
    <WAlertModal
      open={open}
      handleClose={reset}
      maxWidth={'xl'}
      btnTitle="확인"
      title={title ? title : '진료 상세 내용'}
      titleSx={{
        padding: '50px 0px 20px',
      }}
    >
      <Stack width="750px" height="700px">
        <TransformWrapper initialScale={1}>
          {({ zoomIn, zoomOut, resetTransform, centerView, ...rest }) => (
            <Stack gap="20px">
              <Grid container justifyContent="end" gap="10px">
                <WIconButton
                  onClick={() => zoomIn()}
                  startIcon={
                    <Image
                      src={'/assets/icons/zoom/reset-icon.svg'}
                      alt="zoomIn"
                      width={24}
                      height={24}
                    />
                  }
                >
                  파일 확대
                </WIconButton>
                <WIconButton
                  onClick={() => zoomOut()}
                  startIcon={
                    <Image
                      src={'/assets/icons/zoom/zoom-in.svg'}
                      alt="zoomIn"
                      width={24}
                      height={24}
                    />
                  }
                >
                  파일 축소
                </WIconButton>
                <WIconButton
                  onClick={() => resetTransform()}
                  startIcon={
                    <Image
                      src={'/assets/icons/zoom/zoom-out.svg'}
                      alt="zoomIn"
                      width={24}
                      height={24}
                    />
                  }
                >
                  초기화
                </WIconButton>
              </Grid>
              <Grid
                container
                justifyContent="center"
                sx={{
                  position: 'relative',
                  height: '600px',
                }}
              >
                <TransformComponent>
                  <img
                    src={`${src}`}
                    alt="이미지 프리뷰"
                    style={{
                      width: '750px',
                    }}
                  />
                </TransformComponent>
              </Grid>
            </Stack>
          )}
        </TransformWrapper>
      </Stack>
    </WAlertModal>
  );
};
export default WPreviewModal;
