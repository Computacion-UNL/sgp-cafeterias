import { OrderStatus, Roles } from "@cafetho/shared/build/types";
import { OrderStatusBadge, ConfirmDialog, Button } from "@components";
import {
  currencyFormat,
  OrderService,
  toastErrors,
  useAuthContext,
  useOrder,
  useRequest,
} from "@lib";
import { useRouter } from "next/router";
import { FC } from "react";
import { toast } from "react-toastify";

export interface OrderDetailProps {
  updatedStatus?: boolean;
}

export const OrderDetail: FC<OrderDetailProps> = (props) => {
  const { updatedStatus } = props;

  const { currentUser } = useAuthContext();
  const router = useRouter();
  const { id } = router.query;
  const { data: order, mutate } = useOrder(id as string);
  const { doRequest, loading } = useRequest({
    request: OrderService.update,
    onSuccess: async () => {
      await mutate();
      toast.success("Estado de la orden actualizado con éxito", {
        toastId: id as string,
      });
    },
    onError: (err) => toastErrors(err),
  });
  const { totalValue, code, status, table } = order!;

  const updateStatus = () => {
    doRequest(
      { status: getUpdateOrderStatus(currentUser!.rol.name, status) },
      id as string
    );
  };

  return (
    <div className="stats stats-vertical md:stats-horizontal bg-base-200 w-full md:w-auto">
      <div className="stat place-items-center gap-0 bg-transparent px-10 hover:opacity-80">
        <div className="stat-value text-lg tabular-nums">{code}</div>{" "}
        <div className="stat-desc">Código de referencia</div>
      </div>{" "}
      {updatedStatus ? (
        <ConfirmDialog
          buttonComponent={Button}
          buttonProps={{
            className:
              "stat place-items-center gap-0 bg-transparent px-10 hover:opacity-80",
            disabled:
              loading || !isAvailableUpdateState(currentUser!.rol.name, status),
            defaultClass: true,
          }}
          content={
            <span>
              El estado de la orden cambiará a "
              <strong>
                {getUpdateOrderStatus(currentUser!.rol.name, status)}
              </strong>
              " luego de pulsar el botón Confirmar
            </span>
          }
          title="¿Actualizar estado de la orden?"
          onConfirm={updateStatus}
        >
          <div className="stat-value text-lg tabular-nums">
            <OrderStatusBadge status={status} />
          </div>{" "}
          <div className="stat-desc">Estado</div>
        </ConfirmDialog>
      ) : (
        <div className="stat place-items-center gap-0 bg-transparent px-10 hover:opacity-80">
          <div className="stat-value text-lg tabular-nums">
            <OrderStatusBadge status={status} />
          </div>{" "}
          <div className="stat-desc">Estado</div>
        </div>
      )}{" "}
      <div className="stat place-items-center gap-0 bg-transparent px-10 hover:opacity-80">
        <div className="stat-value text-lg tabular-nums">
          <span>{currencyFormat(totalValue)}</span>
        </div>{" "}
        <div className="stat-desc">Total</div>
      </div>{" "}
      <div className="stat place-items-center gap-0 bg-transparent px-10 hover:opacity-80">
        <div className="stat-value text-lg tabular-nums">
          <span>{table || "No especificado"}</span>
        </div>{" "}
        <div className="stat-desc">N° de mesa</div>
      </div>
    </div>
  );
};

OrderDetail.defaultProps = { updatedStatus: false };

const getUpdateOrderStatus = (
  currentRol: Roles,
  currentOrderStatus: OrderStatus
): OrderStatus => {
  switch (currentRol) {
    case Roles.waiter:
      switch (currentOrderStatus) {
        case OrderStatus.dispatched:
          return OrderStatus.payable;

        case OrderStatus.payable:
          return OrderStatus.completed;

        default:
          break;
      }

    case Roles.chef:
      switch (currentOrderStatus) {
        case OrderStatus.create:
          return OrderStatus.processing;

        case OrderStatus.processing:
          return OrderStatus.dispatched;

        default:
          break;
      }

    default:
      return currentOrderStatus;
  }
};

const isAvailableUpdateState = (
  currentRol: Roles,
  currentOrderStatus: OrderStatus
): boolean => {
  switch (currentRol) {
    case Roles.chef:
      return (
        currentOrderStatus === OrderStatus.create ||
        currentOrderStatus === OrderStatus.processing
      );

    case Roles.waiter:
      return (
        currentOrderStatus === OrderStatus.dispatched ||
        currentOrderStatus === OrderStatus.payable
      );

    default:
      return false;
  }
};
