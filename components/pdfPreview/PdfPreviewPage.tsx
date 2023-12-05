import useImagePreview from '@hooks/file/useImagePreview';
import { Box } from '@mui/material';
import { count } from 'console';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

const PdfPreviewPage = (props: { ulid: string }) => {
  const { fileArr } = useImagePreview({
    imgList: [{ fileOriginalName: '', fileUlid: props.ulid }],
  });

  if (fileArr.length) {
    return (
      <Box height="100vh">
        <embed
          src={`data:application/pdf;base64,${fileArr[0].url}`}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      </Box>
    );
  }
  return <></>;
};

export default PdfPreviewPage;
