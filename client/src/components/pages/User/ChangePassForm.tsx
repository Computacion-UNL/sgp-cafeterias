import { Button, TextInput } from "@components/elements";
import { handleFormError, useAuthContext, useRequest } from "@lib";
import { AuthService } from "@lib/services";
import { AuthModel } from "@types";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const ChangePassForm = () => {
  const { currentUser } = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError,
  } = useForm<AuthModel.ChangePasswordValues>({
    mode: "onChange",
  });
  const { doRequest, loading } = useRequest({
    request: AuthService.changePass,
    onSuccess: async () => {
      toast.success("¡Guardado con éxito!");
    },
    onError: (err) => handleFormError(err, setError),
  });

  const onSubmit = (values: AuthModel.ChangePasswordValues) => {
    doRequest(values, currentUser!.id);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="-mx-3 md:flex mb-2">
        <div className="md:w-full px-3">
          <TextInput
            label="Nueva Clave"
            name="password"
            type="password"
            control={control}
            placeholder="********"
            defaultValue=""
            rules={{
              required: "El campo es requerido",
              minLength: { value: 6, message: "Ingrese al menos 6 caracteres" },
            }}
          />
        </div>
      </div>

      <div className="form-control mt-6">
        <Button disabled={!isValid} loading={loading}>
          Guardar
        </Button>
      </div>
    </form>
  );
};
