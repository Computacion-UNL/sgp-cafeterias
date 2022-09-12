import { Permissions } from "@cafetho/shared";

declare namespace PermissionModel {
  /**
   * Payload values
   */
  export type Values = {};

  /**
   * Responses
   */
  export interface Response {
    name: Permissions;
    status: boolean;
    id: string;
  }
}

export { PermissionModel };
