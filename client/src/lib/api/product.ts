import { getPaginationRequest } from "@lib/helpers";
import { useDataPagination, useSWRRequest } from "@lib/hooks";
import { PaginationModel, ProductModel } from "@types";

export const useProducts = () => {
  const dataPagination = useDataPagination<ProductModel.Response>();
  const request = getPaginationRequest("/api/products", {
    dataPagination,
    searchKeys: ["name"],
  });

  const products =
    useSWRRequest<PaginationModel.Response<ProductModel.Response>>(request);
  return { ...products, ...dataPagination };
};

export const useActiveProducts = (page: number, category?: string) => {
  const dataPagination = useDataPagination<ProductModel.Response>({
    paginationProps: { initialLimit: 20, initialPage: page },
  });
  const request = getPaginationRequest("/api/products", {
    dataPagination,
    paginationParams: { sort: { createdAt: "desc" } },
    initialParams: { status: true, category },
    searchKeys: ["name"],
  });

  const products =
    useSWRRequest<PaginationModel.Response<ProductModel.Response>>(request);
  return { ...products, ...dataPagination };
};
