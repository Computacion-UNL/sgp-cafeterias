import { getPaginationRequest } from "@lib/helpers";
import { GetRequest, useDataPagination, useSWRRequest } from "@lib/hooks";
import { CategoryModel, PaginationModel } from "@types";

export const useCategories = (pagination: boolean = true) => {
  const dataPagination = useDataPagination<CategoryModel.Response>();
  const request = getPaginationRequest("/api/products/categories", {
    dataPagination,
    paginationParams: { pagination },
    searchKeys: ["name"],
  });

  const categories =
    useSWRRequest<PaginationModel.Response<CategoryModel.Response>>(request);
  return { ...categories, ...dataPagination };
};

export const useSidebarCategories = () => {
  const request: GetRequest = {
    url: `/api/products/categories`,
    params: { pagination: false, query: { status: true } },
  };

  const categories =
    useSWRRequest<PaginationModel.Response<CategoryModel.Response>>(request);
  return categories;
};
