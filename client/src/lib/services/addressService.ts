import { httpClient } from "@lib/helpers";
import { AddressModel } from "@types";

export const AddressService = {
  all: () => httpClient.get("/api/users/address"),
  save: (values: AddressModel.NewValues) =>
    httpClient.post("/api/users/address", values),
  update: (values: AddressModel.UpdateValues, id: string) =>
    httpClient.put(`/api/users/address/${id}`, values),
};
