import styled from '@emotion/styled';
import { Box, Grid, Link, SxProps, Theme, Typography } from '@mui/material';
import Image from 'next/image';

interface WDownloadBtnType {
  sx?: SxProps<Theme>;
  failed: boolean;
  disabled?: boolean;
  url: string;
  download?: string;
}

const WDownloadBtn = (props: WDownloadBtnType) => {
  const { failed, url, disabled, sx, download } = props;
  return (
    <DownloadBtn
      className="wDownloadBtn"
      href={failed ? undefined : url}
      download={download ? download : true}
      sx={{
        color: failed ? '#b6b6b6' : url ? '#000' : '#b6b6b6',
        ...sx,
      }}
    >
      <Grid
        container
        width="100%"
        height={'100%'}
        justifyContent="center"
        alignItems={'center'}
        gap="5px"
      >
        <Box width={'16px'} height={'16px'} position="relative">
          {failed ? (
            disabled
          ) : url ? (
            <Image
              src={'/assets/icons/copyIcon.svg'}
              alt="copy"
              layout="fill"
              objectFit="contain"
            />
          ) : (
            <Image
              src={'/assets/icons/copyDisable.svg'}
              alt="copy"
              layout="fill"
              objectFit="contain"
            />
          )}
        </Box>

        <Typography variant="body2">다운로드</Typography>
      </Grid>
    </DownloadBtn>
  );
};

const DownloadBtn = styled(Link)(({ theme }) => ({
  backgroundColor: '#fff',
  textDecoration: 'none',
  border: '1px solid #e0e1e2',
  height: '48px',
  width: '120px',
  borderRadius: '6px',
  letterSpacing: '-0.125rem',
  '&:hover': {
    border: '1px solid #333',
    backgroundColor: '#eee',
  },
}));

export default WDownloadBtn;
