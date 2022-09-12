import { OrderStatus } from "@cafetho/shared/build/types";
import classNames from "classnames";
import React from "react";

export interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge = (props: OrderStatusBadgeProps) => {
  const { status } = props;

  const badgeClass = classNames("badge", {
    "badge-primary": status === OrderStatus.payable,
    "badge-success": status === OrderStatus.completed,
    "badge-secondary": status === OrderStatus.dispatched,
    "badge-accent": status === OrderStatus.processing,
  });

  return <div className={badgeClass}>{status}</div>;
};
