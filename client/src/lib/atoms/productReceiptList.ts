import { EntityModel, ProductOrderModel } from "@types";
import { atom, selector } from "recoil";

export type ProductReceiptListState = {
  amount: number;
  items: ReceiptItem[];
};

export type ReceiptItem = {
  quantity: number;
  totalPrice: number;
  unitPrice: number;
  product: ProductOrderModel.Response["product"];
};

export const productReceiptListState = atom<ProductReceiptListState>({
  key: "productReceiptListState",
  default: { amount: 0, items: [] },
});

export const receiptAmountState = selector({
  key: "receiptAmountState",
  get: ({ get }) => get(productReceiptListState).amount,
});

export const receiptItemsState = selector({
  key: "receiptItemsState",
  get: ({ get }) => get(productReceiptListState).items,
});

export const receiptCustomerState = atom<EntityModel.Response | null>({
  key: "receiptCustomerState",
  default: null,
});
