import { Roles } from "@cafetho/shared";

declare namespace RoleModel {
  /**
   * Payload values
   */
  export type Values = {};

  /**
   * Responses
   */
  export interface Response {
    name: Roles;
    createdAt: string;
    status: boolean;
    updatedAt: string;
    id: string;
  }
}

export { RoleModel };
