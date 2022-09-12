import { Permissions } from "@cafetho/shared/build/types";
import { useCurrentPermissions } from "@lib";
import React, { FC, Fragment, memo, PropsWithChildren, useMemo } from "react";

export interface WithPermissions {
  permission: Permissions;
}

export const WithPermissions: FC<PropsWithChildren<WithPermissions>> = memo(
  (props) => {
    const { permission, children } = props;

    const { data: currentPermissions } = useCurrentPermissions();

    const hasPermission = useMemo(
      () =>
        !!currentPermissions &&
        currentPermissions.findIndex(
          (currentPermission) => currentPermission.name === permission
        ) !== -1,
      [currentPermissions, permission]
    );

    if (hasPermission) return <Fragment>{children}</Fragment>;
    else return <Fragment />;
  }
);

WithPermissions.displayName = "WithPermissions";
