import { ProductModel } from "@types";
import { atom, selector } from "recoil";

export type OrderListState = {
  totalValue: number;
  items: OrderItem[];
};

export type OrderItem = {
  quantity: number;
  totalPrice: number;
  unitPrice: number;
  product: ProductModel.Response;
};
export const orderListState = atom<OrderListState>({
  key: "orderListState",
  default: { totalValue: 0, items: [] },
});

export const orderTotalValueState = selector({
  key: "orderTotalValueState",
  get: ({ get }) => get(orderListState).totalValue,
});

export const orderItemsState = selector({
  key: "orderItemsState",
  get: ({ get }) => get(orderListState).items,
});
