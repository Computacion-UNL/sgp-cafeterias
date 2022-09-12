import { httpClient } from "@lib/helpers";
import { UserModel } from "@types";

export const UserService = {
  save: (values: UserModel.NewValues) => httpClient.post("/api/users/", values),
  changeStatus: (id: string) => httpClient.put(`/api/users/changeStatus/${id}`),
  update: (values: UserModel.UpdateValues, id: string) =>
    httpClient.put(`/api/users/${id}`, values),
};
