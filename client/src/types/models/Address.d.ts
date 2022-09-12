declare namespace AddressModel {
  /**
   * Payload values
   */
  export type NewValues = {
    firstname: string;
    dni: string;
    lastname?: string;
    user?: string;
    email: string;
    phone: string;
    mainStreet: string;
    secondaryStreet?: string;
  };

  export type UpdateValues = Partial<Omit<NewValues, "user">>;

  /**
   * Responses
   */

  export interface Response {
    email: string;
    phone: string;
    mainStreet: string;
    secondaryStreet?: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  }
}

export { AddressModel };
