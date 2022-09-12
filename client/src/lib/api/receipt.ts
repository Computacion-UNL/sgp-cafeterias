import {
  getPaginationRequest,
  GetRequest,
  useDataPagination,
  useSWRRequest,
} from "@lib";
import { PaginationModel, ReceiptModel } from "@types";

export const useReceipts = () => {
  const dataPagination = useDataPagination<ReceiptModel.Response>();
  const request = getPaginationRequest("/api/orders/receipts", {
    dataPagination,
    searchKeys: ["code", "dni", "fullName"],
    paginationParams: { sort: { createdAt: "desc" } },
  });

  const receipts =
    useSWRRequest<PaginationModel.Response<ReceiptModel.Response>>(request);
  return { ...receipts, ...dataPagination };
};

export const useReceipt = (id: string) => {
  const request: GetRequest = {
    url: `/api/orders/receipts/${id}`,
    responseType: "blob",
  };

  const receipt = useSWRRequest<Blob>(request);
  return receipt;
};
