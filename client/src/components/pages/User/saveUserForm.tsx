import { validateDNI } from "@cafetho/shared/build/helpers/validation";
import { Button, Select, TextInput } from "@components/elements";
import {
  emailRegExp,
  handleFormError,
  onlyLettersRegExp,
  useRequest,
  useRoles,
} from "@lib";
import { UserService } from "@lib/services";
import { UserModel } from "@types";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const SaveUserForm = () => {
  const { data: roles } = useRoles();

  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError,
  } = useForm<UserModel.NewValues>({ mode: "onChange" });
  const { doRequest, loading } = useRequest({
    request: UserService.save,
    onSuccess: () => {
      toast.success("¡Registro exitoso!");
      const returnUrl = (router.query.returnUrl as string) || "/admin/usuarios";
      router.push(returnUrl);
    },
    onError: (err) => handleFormError(err, setError),
  });

  const onSubmit = (values: UserModel.NewValues) => {
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
            label="Apellido"
            name="lastname"
            control={control}
            placeholder="Carrión"
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
        <div className="md:w-1/2 px-3 mb-2 md:mb-0">
          <TextInput
            label="Clave"
            name="password"
            control={control}
            placeholder="Clave123**"
            defaultValue=""
            rules={{
              required: "El campo es requerido",
              minLength: { value: 6, message: "Ingrese al menos 6 caracteres" },
            }}
          />
        </div>

        <div className="md:w-1/2 px-3">
          <Select
            label="Rol"
            name="rol"
            control={control}
            data={roles!.map((rol) => ({ id: rol.id, name: rol.name }))}
            defaultValue=""
            rules={{ required: "El campo es requerido" }}
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
