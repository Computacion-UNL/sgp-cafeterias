import { Button, TextInput } from "@components/elements";
import { AuthService, toastErrors, useRequest } from "@lib";
import { AuthModel } from "@types";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const ChangePasswordForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<AuthModel.UpdatePasswordValues>({ mode: "onChange" });
  const { doRequest, loading } = useRequest({
    request: AuthService.updatePassword,
    onSuccess: () => {
      toast.success(`Su contraseña ha sido actualizada con éxito`, {
        autoClose: false,
      });
      const returnUrl = (router.query.returnUrl as string) || "/ingresar";
      router.push(returnUrl);
    },
    onError: (err) => toastErrors(err),
  });

  const onSubmit = (values: AuthModel.UpdatePasswordValues) => {
    const { token } = router.query;
    doRequest(values, token as string);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Nueva clave"
        type="password"
        name="password"
        control={control}
        placeholder="**********"
        defaultValue=""
        rules={{
          required: "El campo es requerido",
          minLength: { value: 6, message: "Ingrese al menos 6 caracteres" },
        }}
      />

      <div className="form-control mt-6">
        <Button disabled={!isValid} loading={loading}>
          Cambiar clave
        </Button>
      </div>
    </form>
  );
};
