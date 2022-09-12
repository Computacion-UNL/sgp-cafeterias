import { Button, TextInput } from "@components/elements";
import { emailRegExp, handleFormError, useRequest } from "@lib";
import { AuthService } from "@lib/services";
import { AuthModel } from "@types";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const RecoveryPasswordForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError,
  } = useForm<AuthModel.RecoveryPasswordValues>({ mode: "onChange" });
  const { doRequest, loading } = useRequest({
    request: AuthService.recoveryPassword,
    onSuccess: async () => {
      toast.info(
        "Se ha enviado a su correo un enlace para el cambio de su clave.",
        { autoClose: false }
      );
    },
    onError: (err) => handleFormError(err, setError),
  });

  const onSubmit = (values: AuthModel.RecoveryPasswordValues) => {
    doRequest(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <div className="form-control mt-6">
        <Button disabled={!isValid} loading={loading}>
          Continuar
        </Button>
      </div>
    </form>
  );
};
