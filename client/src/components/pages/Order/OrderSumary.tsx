import { Roles } from "@cafetho/shared/build/types";
import { Button, TextInput } from "@components";
import {
  currencyFormat,
  nonWhitespacesRegExp,
  orderItemsState,
  orderListState,
  OrderService,
  orderTotalValueState,
  toastErrors,
  useAuthContext,
  useRequest,
} from "@lib";
import { OrderModel } from "@types";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilValue, useResetRecoilState } from "recoil";

export const OrderSumary = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ table: OrderModel.NewValues["table"] }>({ mode: "onChange" });
  const { currentUser } = useAuthContext();
  const orderItems = useRecoilValue(orderItemsState);
  const orderTotalValue = useRecoilValue(orderTotalValueState);
  const resetOrderList = useResetRecoilState(orderListState);
  const { doRequest, loading } = useRequest({
    request: OrderService.save,
    onSuccess: () => {
      toast.success("¡Orden realizada con éxito!", { autoClose: false });
      resetOrderList();
      const returnUrl = (router.query.returnUrl as string) || "/";
      router.push(returnUrl);
    },
    onError: (err) => toastErrors(err),
  });

  const onSubmit = (values: { table: OrderModel.NewValues["table"] }) => {
    if (currentUser)
      doRequest({
        totalValue: orderTotalValue,
        items: orderItems.map((item) => ({
          ...item,
          product: item.product.id,
        })),
        user: currentUser.id,
        table: values.table,
      });
    else {
      toast.warning("Inicia sesión para realizar esta orden");
      router.push({
        pathname: "/ingresar",
        query: { returnUrl: router.asPath },
      });
    }
  };

  return (
    <form
      id="summary"
      className="w-full mx-auto lg:w-1/4 px-8 py-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-semibold text-2xl border-b pb-8">Resumen de orden</h1>

      {currentUser?.rol.name === Roles.waiter && (
        <div className="border-b py-5">
          <TextInput
            control={control}
            name="table"
            label="Número de mesa"
            placeholder="Número de mesa"
            defaultValue=""
            rules={{
              pattern: {
                message: "No se permiten espacios en blanco",
                value: nonWhitespacesRegExp,
              },
            }}
          />
        </div>
      )}

      <div className="flex justify-between mt-10 mb-5">
        <span className="font-semibold text-sm uppercase">
          Items {orderItems.length}
        </span>
        <span className="font-semibold text-sm">
          {currencyFormat(orderTotalValue)}
        </span>
      </div>

      <div className="border-t mt-8">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Costo total</span>
          <span>{currencyFormat(orderTotalValue)}</span>
        </div>

        <Button
          className="w-full"
          disabled={orderItems.length === 0 || !isValid}
          loading={loading}
        >
          Realizar orden
        </Button>
      </div>
    </form>
  );
};
