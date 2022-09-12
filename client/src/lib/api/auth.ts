import { SWRParams, useSWRRequest } from "@lib/hooks";
import { PermissionModel } from "@types";

export const useCurrentPermissions = (
  params?: SWRParams<PermissionModel.Response[]>
) => {
  const currentPermissions = useSWRRequest<PermissionModel.Response[]>(
    { url: `/api/users/currentpermissions`, ...params?.request },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      ...params?.config,
    }
  );
  return currentPermissions;
};
