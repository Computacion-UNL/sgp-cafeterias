import { httpClient } from "@lib/helpers";
import { OrderModel } from "@types";

export const OrderService = {
  save: (values: OrderModel.NewValues) => {
    return httpClient.post("/api/orders", values);
  },
  update: (values: OrderModel.UpdateValues, id: string) => {
    return httpClient.put(`/api/orders/${id}`, values);
  },
};
