import { CategoryModel } from "./Category";

declare namespace ProductModel {
  /**
   * Payload values
   */
  export type NewValues = {
    name: string;
    category: CategoryModel.Response | string;
    price: number;
    photo: File;
    description?: string;
  };

  export type UpdateValues = Partial<NewValues>;

  /**
   * Responses
   */

  export interface Response {
    name: string;
    description: string;
    urlPhoto: string;
    publicIdPhoto: string;
    category: Pick<CategoryModel.Response, "name" | "id">;
    price: number;
    status?: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
  }
}

export { ProductModel };
