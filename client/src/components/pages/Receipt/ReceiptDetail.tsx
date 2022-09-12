import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentDownloadIcon,
} from "@heroicons/react/outline";
import { useReceipt } from "@lib";
import fileDownload from "js-file-download";
import { useRouter } from "next/router";
import { useState } from "react";
import { Document, DocumentProps, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const ReceiptDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [numPages, setNumPages] = useState<number | undefined>();
  const [pageNumber, setPageNumber] = useState(1);
  const { data: receipt } = useReceipt(id as string);

  const onDocumentLoadSuccess: DocumentProps["onLoadSuccess"] = ({
    numPages,
  }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  const downloadReceipt = () => {
    fileDownload(receipt!, `Comprobante-${id}.pdf`);
  };

  if (!receipt) return <div>Cargando...</div>;

  return (
    <div className="w-11/12 max-w-5xl my-5 mx-auto flex justify-center">
      <Document
        file={receipt}
        loading="Obteniendo comprobante..."
        onLoadSuccess={onDocumentLoadSuccess}
        className="relative shadow-md rounded-lg overflow-hidden max-w-full bg-white group"
      >
        <Page
          pageNumber={pageNumber}
          className="w-full overflow-x-auto overflow-y-hidden"
        />

        <div className="absolute top-4 right-4 opacity-0 transition-opacity ease-in-out hover:opacity-100 shadow-xl group-hover:opacity-100 rounded-lg">
          <div className="tooltip tooltip-left" data-tip="Descargar PDF">
            <button
              className="btn btn-square btn-primary"
              onClick={downloadReceipt}
            >
              <DocumentDownloadIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 transition-opacity ease-in-out hover:opacity-100 btn-group shadow-xl items-center bg-base-100 group-hover:opacity-100 rounded-lg">
          <button
            className="btn btn-ghost"
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <span className="text-xs text-neutral px-2 bg-white">
            {pageNumber || (numPages ? 1 : "--")} de {numPages || "--"}
          </span>
          <button
            type="button"
            className="btn btn-ghost"
            disabled={!!numPages && pageNumber >= numPages}
            onClick={nextPage}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </Document>
    </div>
  );
};

export default ReceiptDetail;
