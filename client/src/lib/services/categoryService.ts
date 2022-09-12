import { getPaginationRequest, httpClient } from "@lib/helpers";
import { CategoryModel, PaginationModel } from "@types";

export const CategoryService = {
  save: (values: CategoryModel.NewValues) =>
    httpClient.post("/api/products/category", values),
  update: (values: CategoryModel.UpdateValues, id: string) =>
    httpClient.put(`/api/products/category/${id}`, values),
  changeStatus: (id: string) =>
    httpClient.put(`/api/products/category/changeStatus/${id}`),
  search: ({ search, ...rest }: PaginationModel.SearchValues) => {
    const searchRequest = getPaginationRequest<CategoryModel.Response>(
      "/api/products/categories",
      {
        searchKeys: ["name"],
        paginationParams: { ...rest, query: { search } },
      }
    );

    return httpClient.request<PaginationModel.Response<CategoryModel.Response>>(
      searchRequest
    );
  },
};
