import { getPaginationRequest } from "@lib/helpers";
import { useDataPagination, useSWRRequest } from "@lib/hooks";
import { EntityModel, PaginationModel } from "@types";

export const useAddresses = (entity: string) => {
  const dataPagination = useDataPagination<EntityModel.Response>();
  const request = getPaginationRequest("/api/users/entity", {
    dataPagination,
    initialParams: { user: entity },
    searchKeys: ["dni", "firstname", "lastname"],
  });

  const addresses =
    useSWRRequest<PaginationModel.Response<EntityModel.Response>>(request);
  return { ...addresses, ...dataPagination };
};
