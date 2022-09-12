import { httpClient } from "@lib/helpers";
import { ReceiptModel } from "@types";

export const ReceiptService = {
  save: (values: ReceiptModel.NewValues) => {
    return httpClient.post("/api/orders/receipts", values);
  },
};
