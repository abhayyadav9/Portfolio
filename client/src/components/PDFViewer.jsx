import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Use a known stable version for PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;

const PDFViewer = ({ pdfURL }) => {
  return (
    <div>
      <Document file={pdfURL}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PDFViewer;
