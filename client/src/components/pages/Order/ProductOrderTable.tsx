import { DataTable } from "@components/elements";
import { currencyFormat, useOrder, useOrderItems } from "@lib";
import { ProductOrderModel } from "@types";
import { useRouter } from "next/router";

export const ProductOrderTable = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: order } = useOrder(id as string);
  const {
    data: productsOrder,
    loading,
    pagination,
  } = useOrderItems(id as string);
  const { limit, onPageChange, page } = pagination;
  const { totalValue } = order!;

  return (
    <DataTable
      headers={["Cantidad", "Producto", "Precio Unitario", "Precio total"]}
      loading={loading}
      totalDocs={productsOrder?.totalDocs}
      limit={limit}
      onPageChange={onPageChange}
      page={page}
    >
      {productsOrder?.docs.map((productOrder) => (
        <ProductOrderTableRow key={productOrder.id} {...productOrder} />
      ))}
      <tr>
        <td colSpan={3} className="text-right font-bold uppercase">
          Total a pagar:
        </td>
        <td className="font-bold text-green-800">
          {currencyFormat(totalValue)}
        </td>
      </tr>
    </DataTable>
  );
};

const ProductOrderTableRow = (props: ProductOrderModel.Response) => {
  const { product, quantity, unitPrice, totalPrice, id } = props;

  return (
    <tr className="hover">
      <td>{quantity}</td>

      <td className="w-64 whitespace-normal">
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={product.urlPhoto} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <h6 className="font-bold line-clamp-2">{product.name}</h6>
            <p className="text-sm text-gray-500 line-clamp-3">
              {product.description}
            </p>
          </div>
        </div>
      </td>

      <td>{currencyFormat(unitPrice)}</td>
      <td>{currencyFormat(totalPrice)}</td>
    </tr>
  );
};
