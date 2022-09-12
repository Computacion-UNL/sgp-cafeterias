import { currencyFormat, orderListState } from "@lib";
import { ProductModel } from "@types";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

export const ProductCard = (props: ProductModel.Response) => {
  const { name, price, urlPhoto, description, id } = props;
  const setOrderList = useSetRecoilState(orderListState);

  const addProduct = () => {
    setOrderList((prev) => {
      const itemIndex = prev.items.findIndex(
        (item) => item.product.id === props.id
      );
      if (itemIndex !== -1) {
        const items = [...prev.items];
        let item = items[itemIndex];
        item = {
          ...item,
          quantity: item.quantity + 1,
          totalPrice: (item.quantity + 1) * item.unitPrice,
        };
        items[itemIndex] = item;
        return { ...prev, items };
      }
      return {
        ...prev,
        items: [
          ...prev.items,
          {
            product: props,
            quantity: 1,
            totalPrice: props.price,
            unitPrice: props.price,
          },
        ],
      };
    });

    toast.info("Producto agregado a la orden", { toastId: id });
  };

  return (
    <div className="w-full card lg:card-side bg-base-100 shadow-xl">
      <img
        className="object-cover w-full h-96 rounded-t-lg lg:h-auto lg:w-40 lg:rounded-none lg:rounded-l-lg"
        src={urlPhoto}
        alt={name}
      />

      <div className="card-body">
        <h2 className="card-title line-clamp-2">{name}</h2>

        {description ? <p className="line-clamp-3">{description}</p> : <p></p>}

        <p>{currencyFormat(price)}</p>

        <div className="card-actions justify-end">
          <button
            className="btn btn-primary w-full lg:w-auto"
            onClick={addProduct}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};
