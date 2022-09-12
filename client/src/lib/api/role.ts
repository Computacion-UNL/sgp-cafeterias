import { GetRequest, useSWRRequest } from "@lib/hooks";
import { RoleModel } from "@types";

export const useRoles = () => {
  const request: GetRequest = { url: "/api/users/roles" };

  const roles = useSWRRequest<RoleModel.Response[]>(request);
  return roles;
};
