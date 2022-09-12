import {
  getPaginationRequest,
  GetRequest,
  useDataPagination,
  useSWRRequest,
} from "@lib";
import {
  OrderModel,
  PaginationModel,
  ProductOrderModel,
  ReceiptModel,
} from "@types";

export const useOrders = (user?: string) => {
  const dataPagination = useDataPagination<OrderModel.Response>();
  const request = getPaginationRequest("/api/orders", {
    dataPagination,
    searchKeys: ["code"],
    initialParams: { user },
    paginationParams: { sort: { createdAt: "desc" } },
  });

  const orders =
    useSWRRequest<PaginationModel.Response<OrderModel.Response>>(request);
  return { ...orders, ...dataPagination };
};

export const useOrder = (id: string) => {
  const request: GetRequest = { url: `/api/orders/${id}` };

  const order = useSWRRequest<OrderModel.Response>(request);
  return order;
};

export const useOrderItems = (order: string) => {
  const dataPagination = useDataPagination<ProductOrderModel.Response>();
  const request = getPaginationRequest(`/api/orders/item-order`, {
    dataPagination,
    initialParams: { order },
    paginationParams: { sort: { createdAt: "desc" } },
  });

  const orderItems =
    useSWRRequest<PaginationModel.Response<ProductOrderModel.Response>>(
      request
    );

  return { ...orderItems, ...dataPagination };
};

export const useCountProductReceipt = (order: string) => {
  const request: GetRequest = { url: `/api/orders/product-receipt/${order}` };

  const countProductReceipt =
    useSWRRequest<ReceiptModel.CountProductResponse[]>(request);
  return countProductReceipt;
};
