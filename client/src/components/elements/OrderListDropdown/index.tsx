import { HeartIcon } from "@heroicons/react/outline";
import {
  currencyFormat,
  orderItemsState,
  orderListState,
  orderTotalValueState,
} from "@lib";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { NextLink } from "../NextLink";

export const OrderListDropdown = () => {
  const orderItems = useRecoilValue(orderItemsState);
  const orderTotalValue = useRecoilValue(orderTotalValueState);
  const setOrderList = useSetRecoilState(orderListState);

  useEffect(() => {
    const newTotalPrice = orderItems.reduce((totalPrice, orderItem) => {
      totalPrice += orderItem.totalPrice;
      return totalPrice;
    }, 0);
    setOrderList((prev) => ({ ...prev, totalValue: newTotalPrice }));
  }, [orderItems, setOrderList]);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <HeartIcon className="h-5 w-5" />
          <span className="badge badge-sm indicator-item">
            {orderItems.length >= 100 ? "+99" : orderItems.length}
          </span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
      >
        <div className="card-body">
          <span className="font-bold text-lg">{orderItems.length} Items</span>
          <span className="text-info">
            Total: {currencyFormat(orderTotalValue)}
          </span>
          <div className="card-actions">
            <NextLink href="/mi-orden">
              <button className="btn btn-primary btn-block">Ver orden</button>
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  );
};
