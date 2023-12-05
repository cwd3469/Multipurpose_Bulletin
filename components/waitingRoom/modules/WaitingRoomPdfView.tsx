/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const WaitingRoomPdfView = (props: { pdf: File }) => {
  const { pdf } = props;
  const [numPages, setNumPages] = useState<any>(null);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: {
    numPages: any;
  }) {
    setNumPages(nextNumPages);
  }
  useEffect(() => {
    return () => {
      setNumPages(null);
    };
  }, []);

  return (
    <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from({ length: numPages }, (_, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      ))}
    </Document>
  );
};

export default WaitingRoomPdfView;
