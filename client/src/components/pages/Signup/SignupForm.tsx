import { validateDNI } from "@cafetho/shared/build/helpers/validation";
import { Button, TextInput } from "@components/elements";
import {
  emailRegExp,
  handleFormError,
  onlyLettersRegExp,
  useRequest,
} from "@lib";
import { AuthService } from "@lib/services";
import { AuthModel } from "@types";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const SignupForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError,
  } = useForm<AuthModel.SignupValues>({ mode: "onChange" });
  const { doRequest, loading } = useRequest({
    request: AuthService.signup,
    onSuccess: () => {
      toast.success("¡Registro exitoso!");
      const returnUrl = "/ingresar";
      router.push(returnUrl);
    },
    onError: (err) => handleFormError(err, setError),
  });

  const onSubmit = (values: AuthModel.SignupValues) => {
    doRequest(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              validateDNI(value || "") || "El número ingresado no es válido",
          },
        }}
      />
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
      <TextInput
        label="Clave"
        name="password"
        type="password"
        control={control}
        placeholder="Clave123**"
        defaultValue=""
        rules={{
          required: "El campo es requerido",
          minLength: { value: 6, message: "Ingrese al menos 6 caracteres" },
        }}
      />
      <div className="form-control mt-6">
        <Button disabled={!isValid} loading={loading}>
          Registarme
        </Button>
      </div>
    </form>
  );
};
