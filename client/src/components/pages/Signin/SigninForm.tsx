import { Button, NextLink, TextInput } from "@components/elements";
import {
  emailRegExp,
  handleFormError,
  useAuthContext,
  useCurrentPermissions,
  useRequest,
} from "@lib";
import { AuthService } from "@lib/services";
import { AuthModel } from "@types";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export const SigninForm = () => {
  const router = useRouter();
  const { mutate } = useCurrentPermissions();
  const { updateCurrentUser } = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError,
  } = useForm<AuthModel.SigninValues>({ mode: "onChange" });
  const { doRequest, loading } = useRequest({
    request: AuthService.signin,
    onSuccess: async (res) => {
      updateCurrentUser(res.data);
      await mutate();
      const returnUrl = (router.query.returnUrl as string) || "/";
      router.push(returnUrl);
    },
    onError: (err) => handleFormError(err, setError),
  });

  const onSubmit = (values: AuthModel.SigninValues) => {
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

      <div className="flex items-center justify-end">
        <div className="text-sm">
          <NextLink href="/recuperar-clave">
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              ¿Olvidó su clave?
            </a>
          </NextLink>
        </div>
      </div>

      <div className="form-control mt-3">
        <Button disabled={!isValid} loading={loading}>
          Ingresar
        </Button>
      </div>
    </form>
  );
};
