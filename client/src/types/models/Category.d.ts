declare namespace CategoryModel {
  /**
   * Payload values
   */
  export type Values = {
    name: string;
    description: string;
    status: boolean;
  };

  export type NewValues = {
    name: string;
    description: string;
  };

  export type UpdateValues = Partial<NewValues>;

  /**
   * Responses
   */

  export interface Response {
    name: string;
    description: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
  }
}

export { CategoryModel };
