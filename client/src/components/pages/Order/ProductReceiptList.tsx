import { Table } from "@components";
import { TrashIcon } from "@heroicons/react/outline";
import {
  currencyFormat,
  productReceiptListState,
  ReceiptItem,
  receiptItemsState,
} from "@lib";
import classNames from "classnames";
import { memo, useEffect } from "react";
import NumberFormat from "react-number-format";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const ProductReceiptList = () => {
  const receiptItems = useRecoilValue(receiptItemsState);
  const setProductReceiptList = useSetRecoilState(productReceiptListState);

  useEffect(() => {
    const newTotalPrice = receiptItems.reduce((totalPrice, receiptItem) => {
      totalPrice += receiptItem.totalPrice;
      return totalPrice;
    }, 0);
    setProductReceiptList((prev) => ({ ...prev, amount: newTotalPrice }));
  }, [receiptItems, setProductReceiptList]);

  return (
    <div className="shadow-md px-2 py-4 mt-4 w-full xl:w-2/4 order-first xl:order-last">
      <h6 className="font-bold">Lista de productos</h6>
      <div className="pb-2 text-xs opacity-70 mb-2">
        Productos añadidos para el comprobante de pago
      </div>

      <Table
        headers={[
          "Cantidad",
          "Producto",
          "Precio Unitario",
          "Precio total",
          "",
        ]}
        noContent="No se ha añadido ningun item al comprobante"
        totalDocs={receiptItems.length}
      >
        {receiptItems.map((receiptItem) => (
          <ProductOrderTableRow key={receiptItem.product.id} {...receiptItem} />
        ))}
      </Table>
    </div>
  );
};

const ProductOrderTableRow = memo((props: ReceiptItem) => {
  const { product, quantity, totalPrice, unitPrice } = props;

  const setProductReceiptList = useSetRecoilState(productReceiptListState);

  const onRemoveProductReceipt = () => {
    setProductReceiptList((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.product.id !== product.id),
    }));
  };

  return (
    <tr className={classNames("hover")}>
      <td>
        <NumberFormat
          thousandSeparator={true}
          allowNegative={false}
          decimalScale={0}
          value={quantity}
          className="mx-2 border text-center w-12"
          disabled
        />
      </td>

      <td className="w-64 whitespace-normal">
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={product.urlPhoto} alt={product.name} />
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

      <td>
        <button
          className="btn btn-error btn-square btn-sm"
          onClick={onRemoveProductReceipt}
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </td>
    </tr>
  );
});

ProductOrderTableRow.displayName = "ProductOrderTableRow";
