import { getPaginationRequest } from "@lib/helpers";
import { useDataPagination, useSWRRequest } from "@lib/hooks";
import { PaginationModel, UserModel } from "@types";

export const useUsers = () => {
  const dataPagination = useDataPagination<UserModel.Response>();
  const request = getPaginationRequest("/api/users/", {
    dataPagination,
    searchKeys: ["email"],
  });

  const users =
    useSWRRequest<PaginationModel.Response<UserModel.Response>>(request);
  return { ...users, ...dataPagination };
};
