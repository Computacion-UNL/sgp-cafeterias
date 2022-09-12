import { Roles } from "@cafetho/shared";
import { RoleModel } from "./Role";

declare namespace UserModel {
  /**
   * Payload values
   */
  export type Values = {
    email: string;
    firstname: string;
    lastname: string;
  };

  export type NewValues = {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    dni: string;
    rol: string;
  };

  export type UpdateValues = {
    firstname?: string;
    lastname?: string;
  };

  /**
   * Responses
   */
  export interface EntityResponse {
    address: string;
    createdAt: string;
    dni: string;
    firstname: string;
    id: string;
    lastname: string;
    principal: boolean;
    updatedAt: string;
    user: string;
  }

  export interface Response {
    entity: EntityResponse;
    email: string;
    status: boolean;
    rol: Pick<RoleModel.Response, "name" | "id">;
    createdAt: string;
    updatedAt: string;
    id: string;
  }
}

export { UserModel };
