import { validateDNI } from "@cafetho/shared/build/helpers/validation";
import { PayType } from "@cafetho/shared/build/types";
import {
  Button,
  Checkbox,
  DialogForm,
  NumberInput,
  Select,
  TextInput,
  UpdateAddressForm,
} from "@components";
import {
  AddressService,
  emailRegExp,
  handleFormError,
  onlyLettersRegExp,
  productReceiptListState,
  receiptAmountState,
  receiptCustomerState,
  receiptItemsState,
  ReceiptService,
  toastErrors,
  useCountProductReceipt,
  useOrder,
  useRequest,
} from "@lib";
import { ReceiptModel } from "@types";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

export const OrderReceiptForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [saveAddress, setSaveAddress] = useState(true);
  const receiptItems = useRecoilValue(receiptItemsState);
  const receiptAmount = useRecoilValue(receiptAmountState);
  const resetProductReceiptList = useResetRecoilState(productReceiptListState);
  const resetReceiptCustomer = useResetRecoilState(receiptCustomerState);
  const [receiptCustomer, setReceiptCustomer] =
    useRecoilState(receiptCustomerState);
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setValue,
    setError,
    reset,
  } = useForm<ReceiptModel.NewValues>({ mode: "onChange" });
  const { mutate } = useCountProductReceipt(id as string);
  const { mutate: mutateOrder } = useOrder(id as string);
  const { doRequest, loading } = useRequest({
    request: ReceiptService.save,
    onSuccess: async () => {
      await mutate();
      await mutateOrder();
      toast.success("¡Comprobante registrado con exito!");
      resetProductReceiptList();
      resetReceiptCustomer();
      reset();
    },
    onError: (err) => handleFormError(err, setError),
  });

  const { doRequest: doSaveAddressRequest, loading: loadingSaveAddress } =
    useRequest({
      request: AddressService.save,
      onSuccess: async () => {
        toast.info("Dirección registrada con exito!");
      },
      onError: (err) => toastErrors(err),
    });
  const touchFields = useWatch({
    control,
    name: ["email", "phone", "address"],
  });
  const disableFields = useMemo(() => !!receiptCustomer, [receiptCustomer]);
  const invalidFields = useMemo(
    () =>
      touchFields.some((touchField) => !touchField || touchField.length === 0),
    [touchFields]
  );

  useEffect(() => {
    setValue(
      "fullName",
      receiptCustomer
        ? receiptCustomer.lastname
          ? `${receiptCustomer.firstname} ${receiptCustomer.lastname}`
          : receiptCustomer.firstname
        : "CONSUMIDOR FINAL"
    );
    setValue("dni", receiptCustomer ? receiptCustomer.dni : "9999999999");
    setValue(
      "email",
      receiptCustomer?.address ? receiptCustomer.address.email : ""
    );
    setValue(
      "phone",
      receiptCustomer?.address ? receiptCustomer.address.phone : ""
    );
    setValue(
      "address",
      receiptCustomer?.address
        ? receiptCustomer.address.secondaryStreet
          ? `${receiptCustomer.address.mainStreet} & ${receiptCustomer.address.secondaryStreet}`
          : receiptCustomer.address.mainStreet
        : ""
    );
  }, [receiptCustomer, setValue]);

  useEffect(() => {
    setValue("amount", receiptAmount);
  }, [receiptAmount, setValue]);

  const onSubmit = (values: ReceiptModel.NewValues) => {
    values.order = id as string;
    values.items = receiptItems.map((receiptItem) => ({
      ...receiptItem,
      product: receiptItem.product.id,
    }));

    doRequest(values);

    if (saveAddress && !invalidFields && !disableFields)
      doSaveAddressRequest({
        dni: values.dni,
        email: values.email!,
        firstname: values.fullName,
        mainStreet: values.address!,
        phone: values.phone!,
      });
  };

  return (
    <div className="card shadow-xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h6 className="font-bold">Datos del comprobante</h6>
          <div className="pb-2 text-xs opacity-70">
            Información general del comprobante
          </div>

          {receiptCustomer && (
            <div className="my-2 flex gap-2 items-center">
              <div className="badge badge-accent">
                {receiptCustomer.lastname
                  ? `${receiptCustomer.firstname} ${receiptCustomer.lastname} (${receiptCustomer.dni})`
                  : `${receiptCustomer.firstname} (${receiptCustomer.dni})`}
              </div>

              <DialogForm
                buttonComponent={Button}
                buttonProps={{
                  children: "Actualizar dirección",
                  type: "button",
                  className: "btn-sm",
                }}
                title="Modificar dirección"
                subtitle="Modificar información de la dirección"
              >
                {(handleClose) => (
                  <UpdateAddressForm
                    handleClose={handleClose}
                    onSuccess={(res) => {
                      setReceiptCustomer(res.data);
                    }}
                    {...receiptCustomer}
                  />
                )}
              </DialogForm>
            </div>
          )}

          <div className="-mx-3 md:flex mb-2">
            <div className="md:w-full px-3">
              <TextInput
                label="Nombre completo"
                name="fullName"
                control={control}
                placeholder="Benjamín"
                defaultValue="CONSUMIDOR FINAL"
                rules={{
                  required: "El campo es requerido",
                  pattern: {
                    value: onlyLettersRegExp,
                    message: "Escriba solamente letras",
                  },
                  minLength: {
                    value: 3,
                    message: "Escriba al menos 3 caracteres",
                  },
                }}
                disabled={disableFields}
              />
            </div>
          </div>

          <div className="-mx-3 md:flex mb-2">
            <div className="md:w-full px-3">
              <TextInput
                label="Cédula o RUC"
                name="dni"
                control={control}
                placeholder="9999999999"
                defaultValue="9999999999"
                rules={{
                  required: "El campo es requerido",
                  minLength: {
                    value: 10,
                    message: "Escriba al menos 10 dígitos",
                  },
                  maxLength: {
                    value: 13,
                    message: "Escriba no más de 13 dígitos",
                  },
                  validate: {
                    validDNI: (value) =>
                      value === "9999999999" ||
                      validateDNI((value as string) || "") ||
                      "El número ingresado no es válido",
                  },
                }}
                disabled={disableFields}
              />
            </div>
          </div>

          <div className="-mx-3 md:flex mb-2">
            <div className="md:w-full px-3">
              <TextInput
                label="Correo electrónico"
                name="email"
                control={control}
                placeholder="user@correo.ec"
                defaultValue=""
                rules={{
                  pattern: {
                    value: emailRegExp,
                    message: "El correo ingresado no es válido",
                  },
                }}
                disabled={disableFields}
              />
            </div>
          </div>

          <div className="-mx-3 md:flex mb-2">
            <div className="md:w-full px-3">
              <TextInput
                label="Teléfono"
                name="phone"
                control={control}
                placeholder="099**99999"
                defaultValue=""
                rules={{
                  minLength: {
                    value: 9,
                    message: "Escriba al menos 9 caracteres",
                  },
                  maxLength: {
                    value: 10,
                    message: "Escriba no más de 10 caracteres",
                  },
                }}
                disabled={disableFields}
              />
            </div>
          </div>

          <div className="-mx-3 md:flex mb-2">
            <div className="md:w-full px-3">
              <TextInput
                label="Dirección"
                name="address"
                control={control}
                placeholder="Av. Universitaria"
                defaultValue=""
                rules={{
                  minLength: {
                    value: 3,
                    message: "Escriba al menos 3 caracteres",
                  },
                }}
                disabled={disableFields}
              />
            </div>
          </div>

          {!disableFields && (
            <Checkbox
              label="Guardar como nueva dirección"
              className="checkbox-primary"
              checked={saveAddress}
              onChange={() => {
                setSaveAddress(!saveAddress);
              }}
              disabled={invalidFields}
            />
          )}

          <h6 className="font-bold">Pago</h6>
          <div className="pb-2 text-xs opacity-70">
            Información de pago para el comprobante
          </div>

          <div className="-mx-3 md:flex mb-2">
            <div className="md:w-full px-3">
              <NumberInput
                label="Monto a pagar ($)"
                name="amount"
                control={control}
                defaultValue={0}
                prefix="$"
                decimalScale={2}
                allowNegative={false}
                rules={{ required: "El campo es requerido" }}
                readOnly
              />
            </div>
          </div>

          <div className="-mx-3 md:flex mb-2">
            <div className="md:w-full px-3">
              <Select
                label="Tipo de pago"
                name="type"
                control={control}
                data={Object.values(PayType).map((type) => ({
                  id: type,
                  name: type,
                }))}
                defaultValue={PayType.cash}
                rules={{ required: "El campo es requerido" }}
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <Button
              disabled={!isValid || loading || receiptItems.length === 0}
              loading={loading}
            >
              Registrar Comprobante
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
