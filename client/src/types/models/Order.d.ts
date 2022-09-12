import { OrderStatus } from "@cafetho/shared/build/types";
import { OrderItem } from "@lib";

declare namespace OrderModel {
  /**
   * Payload values
   */

  export type NewValues = {
    totalValue: number;
    table?: string;
    items: (Omit<OrderItem, "product"> & { product: string })[];
    user: string;
  };

  export type UpdateValues = Partial<NewValues> & {
    status?: OrderStatus;
  };

  /**
   * Responses
   */

  export interface Response {
    code: string;
    totalValue: number;
    status: OrderStatus;
    table?: string;
    createdAt: string;
    updatedAt: string;
    id: string;
    user: string;
  }
}

export { OrderModel };
