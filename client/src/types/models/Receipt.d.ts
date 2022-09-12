import { PayType } from "@cafetho/shared/build/types";
import { ReceiptItem } from "@lib";
import { OrderModel } from "./Order";
import { PaymentModel } from "./Payment";

declare namespace ReceiptModel {
  /**
   * Payload values
   */
  export type NewValues = {
    fullName: string;
    dni: string;
    phone?: string;
    email?: string;
    address?: string;
    order: string;
    amount: number;
    type: PayType;
    items: (Omit<ReceiptItem, "product"> & { product: string })[];
  };

  /**
   * Responses
   */
  export interface Response {
    code: string;
    fullName: string;
    dni: string;
    phone?: string;
    email?: string;
    address?: string;
    date: string;
    order: OrderModel.Response;
    payment: PaymentModel.Response;
    createdAt: string;
    updatedAt: string;
    id: string;
  }

  export interface CountProductResponse {
    product: string;
    quantity: number;
  }
}

export { ReceiptModel };
