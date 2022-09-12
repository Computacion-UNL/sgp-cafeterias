import { DataTable, NextLink } from "@components";
import { currencyFormat, dateFormat, useReceipts } from "@lib";
import { ReceiptModel } from "@types";

export const ReceiptTable = () => {
  const { data: receipts, loading, pagination } = useReceipts();
  const { limit, onPageChange, page } = pagination;

  return (
    <DataTable
      headers={[
        "Código",
        "Fecha de emisión",
        "Adquiriente",
        "Pago",
        "Acciones",
      ]}
      search={{ placeholder: "Buscar comprobantes de pago" }}
      loading={loading}
      totalDocs={receipts?.totalDocs}
      limit={limit}
      onPageChange={onPageChange}
      page={page}
    >
      {receipts?.docs.map((order) => (
        <ReceiptTableRow key={order.id} {...order} />
      ))}
    </DataTable>
  );
};

const ReceiptTableRow = (props: ReceiptModel.Response) => {
  const { code, date, dni, fullName, id, order, payment } = props;

  return (
    <tr className="hover">
      <td className="font-bold">{code}</td>

      <td>{dateFormat(date)}</td>

      <td>
        <div>{fullName}</div>
        <div className="text-sm opacity-70">{dni}</div>
      </td>

      <td>
        <div>{currencyFormat(payment.amount)}</div>
        <div className="text-sm opacity-70">{payment.type}</div>
      </td>

      <td>
        <NextLink href={`/admin/comprobantes/${id}`}>
          <a className="btn btn-primary btn-sm mr-2">Ver</a>
        </NextLink>

        <NextLink href={`/admin/ordenes/${order.id}`}>
          <a className="btn btn-accent btn-sm">Ver Orden</a>
        </NextLink>
      </td>
    </tr>
  );
};
