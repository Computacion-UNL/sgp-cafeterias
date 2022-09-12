import { getFormData, httpClient } from "@lib/helpers";
import { ProductModel } from "@types";

export const ProductService = {
  save: (values: ProductModel.NewValues) => {
    const formData = getFormData(values);
    return httpClient.post("/api/products", formData);
  },
  update: (values: ProductModel.UpdateValues, id: string) => {
    const formData = getFormData(values);
    return httpClient.put(`/api/products/${id}`, formData);
  },
  changeStatus: (id: string) =>
    httpClient.put(`/api/products/changeStatus/${id}`),
};
