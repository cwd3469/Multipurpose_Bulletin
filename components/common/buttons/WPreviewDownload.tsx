import {
  Box,
  Button,
  Grid,
  Stack,
  styled,
  SxProps,
  Theme,
} from '@mui/material';
import WDownloadBtn from './WDownloadBtn';
import { DocumentsType } from '../modal/WDetailModal';
import useImagePreview from '@hooks/file/useImagePreview';
import Image from 'next/image';

const PreviewBtn = styled(Button)(({ theme }) => ({
  backgroundColor: '#fff',
  height: '40px',
  width: '100px',
  border: '1px solid #e0e1e2',
  fontSize: '1.000rem',
  fontWeight: '400',
  padding: '5px',
  gap: '3px',
  letterSpacing: '-0.125rem',
}));

const WPreviewDownload = (props: {
  downloadPreView: DocumentsType[];
  sx?: SxProps<Theme>;
}) => {
  const { downloadPreView, sx } = props;
  return (
    <Stack sx={sx}>
      {downloadPreView.map((item, index) => {
        return (
          <Grid container justifyContent="space-between" key={index}>
            <WFileLadel className="wFileLadel">
              {item.fileOriginalName}
            </WFileLadel>
            <Grid container width="auto" gap="10px" className="btnGrid">
              <PreviewBtn
                className="wPreviewBtn"
                variant="outlined"
                color="info"
                onClick={() => {
                  window.open(`/pdf-preview/${item.fileUlid}`);
                }}
              >
                <Box width={'16px'} height={'16px'} position="relative">
                  <Image
                    src={'/assets/icons/copyIcon.svg'}
                    alt="copy"
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
                미리보기
              </PreviewBtn>
              <WDetailDownloadBtn
                ulid={item.fileUlid}
                name={item.fileOriginalName}
              />
            </Grid>
          </Grid>
        );
      })}
    </Stack>
  );
};

const WDetailDownloadBtn = (props: { ulid: string; name: string }) => {
  const { fileArr } = useImagePreview({
    imgList: [{ fileOriginalName: props.name, fileUlid: props.ulid }],
  });

  if (fileArr.length)
    return (
      <WDownloadBtn
        failed={false}
        download={fileArr[0].name}
        url={'data:application/octet-stream;base64,' + fileArr[0].url}
        sx={{
          height: '40px !important',
          width: '100px !important',
        }}
      />
    );
  return <></>;
};

export const WFileLadel = styled(Stack)(({ theme }) => ({
  ...theme.typography.body1,
  color: '#666',
  width: '400px',
  height: '40px',
  backgroundColor: '#fff',
  borderRadius: '6px',
  border: '1px solid #dbdbdb',
  lineHeight: '40px',
  padding: '0px 10px',
  textAlign: 'center',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  display: 'inline-block',
}));

export default WPreviewDownload;
