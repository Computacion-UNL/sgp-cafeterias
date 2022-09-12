import { Table } from "@components/elements";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import {
  currencyFormat,
  OrderItem,
  orderItemsState,
  orderListState,
} from "@lib";
import ReactNumberFormat from "react-number-format";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const ProductList = () => {
  const orderItems = useRecoilValue(orderItemsState);

  return (
    <div className="w-full lg:w-3/4 overflow-x-auto bg-white px-10 py-10">
      <Table
        headers={[
          "Detalles de producto",
          "Cantidad",
          "Precio Unitario",
          "Precio Total",
        ]}
        totalDocs={orderItems.length}
        noContent="No se ha agregado ningún producto a la orden"
      >
        {orderItems.map((orderItem) => (
          <ItemList key={orderItem.product.id} {...orderItem} />
        ))}
      </Table>
    </div>
  );
};

const ItemList = (props: OrderItem) => {
  const setOrderList = useSetRecoilState(orderListState);

  const removeProduct = () => {
    setOrderList((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.product.id !== props.product.id),
    }));
  };

  const minusProduct = () => {
    setOrderList((prev) => {
      const itemIndex = prev.items.findIndex(
        (item) => item.product.id === props.product.id
      );
      const items = [...prev.items];
      let item = items[itemIndex];
      if (item.quantity === 1) {
        return { ...prev };
      }
      item = {
        ...item,
        quantity: item.quantity - 1,
        totalPrice: (item.quantity - 1) * item.unitPrice,
      };
      items[itemIndex] = item;
      return { ...prev, items };
    });
  };

  const plusProduct = () => {
    setOrderList((prev) => {
      const itemIndex = prev.items.findIndex(
        (item) => item.product.id === props.product.id
      );
      const items = [...prev.items];
      let item = items[itemIndex];
      item = {
        ...item,
        quantity: item.quantity + 1,
        totalPrice: (item.quantity + 1) * item.unitPrice,
      };
      items[itemIndex] = item;
      return { ...prev, items };
    });
  };

  return (
    <tr className="hover">
      <td className="w-52 whitespace-normal">
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={props.product.urlPhoto} alt={props.product.name} />
            </div>
          </div>

          <div className="w-52 flex flex-col gap-3">
            <div>
              <h6 className="font-bold line-clamp-2">{props.product.name}</h6>
              <p className="text-sm text-gray-500 line-clamp-3">
                {props.product.description}
              </p>
            </div>

            <a
              onClick={removeProduct}
              className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
            >
              Eliminar
            </a>
          </div>
        </div>
      </td>

      <td>
        <div className="flex justify-center">
          <MinusIcon
            className="fill-current text-gray-600 w-5 cursor-pointer"
            onClick={minusProduct}
          />

          <ReactNumberFormat
            thousandSeparator={true}
            allowNegative={false}
            decimalScale={0}
            value={props.quantity}
            isAllowed={(values) => {
              const { floatValue } = values;
              if (floatValue) return floatValue > 0;
              return false;
            }}
            onValueChange={(values) => {
              const { floatValue } = values;
              if (floatValue) {
                setOrderList((prev) => {
                  const itemIndex = prev.items.findIndex(
                    (item) => item.product.id === props.product.id
                  );
                  const items = [...prev.items];
                  let item = items[itemIndex];
                  item = {
                    ...item,
                    quantity: floatValue,
                    totalPrice: floatValue * item.unitPrice,
                  };
                  items[itemIndex] = item;
                  return { ...prev, items };
                });
              }
            }}
            className="mx-2 border text-center w-8"
          />

          <PlusIcon
            className="fill-current text-gray-600 w-5 cursor-pointer select-none"
            onClick={plusProduct}
          />
        </div>
      </td>

      <td className="text-center">
        <span className="font-semibold text-sm">
          {currencyFormat(props.unitPrice)}
        </span>
      </td>

      <td className="text-center">
        <span className="font-semibold text-sm">
          {currencyFormat(props.totalPrice)}
        </span>
      </td>
    </tr>
  );
};
