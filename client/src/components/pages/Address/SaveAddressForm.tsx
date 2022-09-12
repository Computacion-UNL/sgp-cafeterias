import { validateDNI } from "@cafetho/shared/build/helpers/validation";
import { Button, TextInput } from "@components";
import {
  AddressService,
  emailRegExp,
  handleFormError,
  onlyLettersRegExp,
  useAuthContext,
  useRequest,
} from "@lib";
import { AddressModel } from "@types";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const SaveAddressForm = () => {
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError,
  } = useForm<AddressModel.NewValues>({
    mode: "onChange",
  });
  const { doRequest, loading } = useRequest({
    request: AddressService.save,
    onSuccess: () => {
      toast.success("¡Registro exitoso!");
      const returnUrl =
        (router.query.returnUrl as string) || "/admin/mis-direcciones";
      router.push(returnUrl);
    },
    onError: (err) => {
      handleFormError(err, setError);
    },
  });
  const onSubmit = (values: AddressModel.NewValues) => {
    values.user = currentUser!.id;
    doRequest(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="-mx-3 md:flex mb-2">
        <div className="md:w-1/2 px-3 mb-2 md:mb-0">
          <TextInput
            label="Nombre o denominación"
            name="firstname"
            control={control}
            placeholder="Benjamín"
            defaultValue=""
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
          />
        </div>

        <div className="md:w-1/2 px-3">
          <TextInput
            label="Apellido (opcional)"
            name="lastname"
            control={control}
            placeholder="Carrión"
            defaultValue=""
            rules={{
              pattern: {
                value: onlyLettersRegExp,
                message: "Escriba solamente letras",
              },
              minLength: {
                value: 3,
                message: "Escriba al menos 3 caracteres",
              },
            }}
          />
        </div>
      </div>

      <div className="-mx-3 md:flex mb-2">
        <div className="md:w-1/2 px-3 mb-2 md:mb-0">
          <TextInput
            label="Cédula o RUC"
            name="dni"
            control={control}
            placeholder="9999999999"
            defaultValue=""
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
                  validateDNI(value || "") ||
                  "El número ingresado no es válido",
              },
            }}
          />
        </div>

        <div className="md:w-1/2 px-3">
          <TextInput
            label="Correo electrónico"
            name="email"
            control={control}
            placeholder="user@correo.ec"
            defaultValue=""
            rules={{
              required: "El campo es requerido",
              pattern: {
                value: emailRegExp,
                message: "El correo ingresado no es válido",
              },
            }}
          />
        </div>
      </div>

      <div className="-mx-3 md:flex mb-2">
        <div className="md:w-full px-3">
          <TextInput
            label="Calle principal"
            name="mainStreet"
            control={control}
            placeholder="Av. Universitaria"
            defaultValue=""
            rules={{
              required: "El campo es requerido",
              minLength: {
                value: 3,
                message: "Escriba al menos 3 caracteres",
              },
            }}
          />
        </div>
      </div>

      <div className="-mx-3 md:flex mb-2">
        <div className="md:w-1/2 px-3 mb-2 md:mb-0">
          <TextInput
            label="Calle secundaria (opcional)"
            name="secondaryStreet"
            control={control}
            placeholder="Av. Universitaria"
            defaultValue=""
            rules={{
              minLength: {
                value: 3,
                message: "Escriba al menos 3 caracteres",
              },
            }}
          />
        </div>

        <div className="md:w-1/2 px-3">
          <TextInput
            label="Teléfono"
            name="phone"
            control={control}
            placeholder="099**99999"
            defaultValue=""
            rules={{
              required: "El campo es requerido",
              minLength: {
                value: 9,
                message: "Escriba al menos 9 caracteres",
              },
              maxLength: {
                value: 10,
                message: "Escriba no más de 10 caracteres",
              },
            }}
          />
        </div>
      </div>

      <div className="form-control mt-6">
        <Button disabled={!isValid} loading={loading}>
          Registrar
        </Button>
      </div>
    </form>
  );
};
