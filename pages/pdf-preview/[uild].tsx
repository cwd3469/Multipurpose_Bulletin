import PdfPreviewPage from '@components/pdfPreview/PdfPreviewPage';
import { useRouter } from 'next/router';

const PdfPreview = () => {
  const router = useRouter();
  if (router.query.uild) {
    const str = router.query.uild as string;
    return (
      <>
        <PdfPreviewPage ulid={str} />
      </>
    );
  }
  return <></>;
};

export default PdfPreview;
