import { AddressModel } from "./Address";

declare namespace EntityModel {
  /**
   * Payload values
   */
  export type Values = {};

  /**
   * Responses
   */
  export interface Response {
    firstname: string;
    dni: string;
    lastname?: string;
    principal: boolean;
    user: string;
    createdAt: string;
    updatedAt: string;
    id: string;
    address?: AddressModel.Response;
  }
}

export { EntityModel };
