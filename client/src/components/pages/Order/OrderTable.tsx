import { Permissions } from "@cafetho/shared/build/types";
import {
  DataTable,
  NextLink,
  OrderStatusBadge,
  WithPermissions,
} from "@components";
import { currencyFormat, dateFormat, useOrders } from "@lib";
import { OrderModel } from "@types";
import { useRouter } from "next/router";

export interface OrderTableProps {
  user?: string;
}

export const OrderTable = (props: OrderTableProps) => {
  const { user } = props;
  const { data: orders, loading, pagination } = useOrders(user);
  const { limit, onPageChange, page } = pagination;

  return (
    <DataTable
      headers={[
        "Código",
        "Fecha de orden",
        "Valor total",
        "N° de mesa",
        "Estado",
        "Acciones",
      ]}
      search={{ placeholder: "Buscar órdenes" }}
      loading={loading}
      totalDocs={orders?.totalDocs}
      limit={limit}
      onPageChange={onPageChange}
      page={page}
    >
      {orders?.docs.map((order) => (
        <OrderTableRow key={order.id} {...order} />
      ))}
    </DataTable>
  );
};

const OrderTableRow = (props: OrderModel.Response) => {
  const { code, totalValue, createdAt, status, id, table } = props;
  const router = useRouter();

  return (
    <tr className="hover">
      <td>{code}</td>

      <td>{dateFormat(createdAt)}</td>

      <td>{currencyFormat(totalValue)}</td>

      <td>{table || "Sin especificar"}</td>

      <td>
        <OrderStatusBadge status={status} />
      </td>

      <td>
        <NextLink
          href={{
            pathname: `/admin/ordenes/${id}`,
            query: { returnUrl: router.asPath },
          }}
        >
          <a className="btn btn-primary btn-sm">Ver</a>
        </NextLink>

        <WithPermissions permission={Permissions["save:receipt"]}>
          <NextLink href={`/admin/ordenes/comprobante/${id}`}>
            <a className="btn btn-secondary btn-sm ml-2">Generar comprobante</a>
          </NextLink>
        </WithPermissions>
      </td>
    </tr>
  );
};
