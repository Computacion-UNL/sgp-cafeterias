import { Roles } from "@cafetho/shared";

declare namespace IAuthorization {
  export interface Props {
    roles: Roles[];
  }
}

export { IAuthorization };
