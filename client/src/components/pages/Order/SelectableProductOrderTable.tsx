import { DataTable } from "@components/elements";
import {
  currencyFormat,
  productReceiptListState,
  useCountProductReceipt,
  useOrderItems,
} from "@lib";
import { ProductOrderModel } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import { memo, useEffect, useMemo, useState } from "react";
import NumberFormat from "react-number-format";
import { useRecoilState } from "recoil";

export const SelectableProductOrderTable = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: productsOrder,
    loading,
    pagination,
  } = useOrderItems(id as string);
  const { data: countProductReceipt } = useCountProductReceipt(id as string);
  const { limit, onPageChange, page } = pagination;

  return (
    <DataTable
      headers={["Cantidad", "Producto", "Precio Unitario", "Precio total", ""]}
      loading={loading}
      totalDocs={productsOrder?.totalDocs}
      limit={limit}
      onPageChange={onPageChange}
      page={page}
    >
      {productsOrder?.docs.map((productOrder) => (
        <ProductOrderTableRow
          key={productOrder.id}
          {...productOrder}
          receiptQuantity={
            countProductReceipt!.find(
              (productReceipt) =>
                productReceipt.product === productOrder.product.id
            )?.quantity
          }
        />
      ))}
    </DataTable>
  );
};

const ProductOrderTableRow = memo(
  (props: ProductOrderModel.Response & { receiptQuantity?: number }) => {
    const { product, unitPrice, receiptQuantity } = props;
    const [productReceiptList, setProductReceiptList] = useRecoilState(
      productReceiptListState
    );

    const [quantity, setQuantity] = useState(
      receiptQuantity ? props.quantity - receiptQuantity : props.quantity
    );
    const [totalPrice, setTotalPrice] = useState(props.totalPrice);

    const quantityAdded = useMemo(
      () =>
        productReceiptList.items.find((item) => item.product.id === product.id)
          ?.quantity || 0,
      [productReceiptList, product.id]
    );
    const max = useMemo(
      () =>
        (receiptQuantity ? props.quantity - receiptQuantity : props.quantity) -
        quantityAdded,
      [props.quantity, receiptQuantity, quantityAdded]
    );

    useEffect(() => {
      setQuantity(max);
    }, [max]);

    const onAddProductReceipt = () => {
      setProductReceiptList((prev) => {
        const itemIndex = prev.items.findIndex(
          (item) => item.product.id === product.id
        );
        if (itemIndex !== -1) {
          const items = [...prev.items];
          let item = items[itemIndex];
          item = {
            ...item,
            quantity: item.quantity + quantity,
            totalPrice: (item.quantity + quantity) * item.unitPrice,
          };
          items[itemIndex] = item;
          return { ...prev, items };
        }
        return {
          ...prev,
          items: [
            ...prev.items,
            {
              product,
              quantity,
              totalPrice,
              unitPrice,
            },
          ],
        };
      });
    };

    return (
      <tr className={classNames("hover", { "opacity-50": max === 0 })}>
        <td>
          <NumberFormat
            thousandSeparator={true}
            allowNegative={false}
            decimalScale={0}
            value={quantity}
            isAllowed={(values) => {
              const { floatValue } = values;
              if (floatValue) return floatValue > 0 && floatValue <= max;
              return false;
            }}
            onValueChange={(values) => {
              const { floatValue } = values;
              if (floatValue) {
                setQuantity(floatValue);
                setTotalPrice(floatValue * unitPrice);
              }
            }}
            className="mx-2 border text-center w-12"
            disabled={max === 0}
          />
          <span className="text-xs block text-neutral">
            Cant. Max: <strong>{max}</strong>
          </span>
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
            className="btn btn-primary btn-sm"
            disabled={max === 0}
            onClick={onAddProductReceipt}
          >
            Añadir al comprobante
          </button>
        </td>
      </tr>
    );
  }
);

ProductOrderTableRow.displayName = "ProductOrderTableRow";
