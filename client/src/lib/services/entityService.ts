import { getPaginationRequest, httpClient } from "@lib/helpers";
import { EntityModel, PaginationModel } from "@types";

export const EntityService = {
  search: ({ search, ...rest }: PaginationModel.SearchValues) => {
    const searchRequest = getPaginationRequest<EntityModel.Response>(
      "/api/users/entity",
      {
        searchKeys: ["dni", "firstname", "lastname"],
        paginationParams: { ...rest, query: { search } },
      }
    );

    return httpClient.request<PaginationModel.Response<EntityModel.Response>>(
      searchRequest
    );
  },
};
