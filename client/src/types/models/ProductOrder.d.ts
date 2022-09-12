import { OrderItem } from "@lib";
import { ProductModel } from "./Product";

declare namespace ProductOrderModel {
  /**
   * Payload values
   */

  /**
   * Responses
   */

  export interface Response {
    quantity: number;
    totalPrice: number;
    unitPrice: number;
    order: string;
    product: Pick<
      ProductModel.Response,
      "name" | "description" | "id" | "urlPhoto"
    >;
    createdAt: string;
    updatedAt: string;
    id: string;
  }
}

export { ProductOrderModel };
