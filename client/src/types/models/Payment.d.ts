import { PayType } from "@cafetho/shared/build/types";

declare namespace PaymentModel {
  export interface Response {
    amount: number;
    type: PayType;
    createdAt: string;
    updatedAt: string;
    id: string;
  }
}

export { PaymentModel };
