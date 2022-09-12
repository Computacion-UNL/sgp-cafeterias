import { Button, TextInput } from "@components/elements";
import { handleFormError, onlyLettersRegExp, useRequest, useUsers } from "@lib";
import { UserService } from "@lib/services";
import { IFormBase, UserModel } from "@types";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const UpdateUserForm = (
  props: IFormBase.Dialog<UserModel.EntityResponse>
) => {
  const { firstname, lastname, handleClose, id } = props;

  const { mutate } = useUsers();
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError,
  } = useForm<UserModel.UpdateValues>({
    mode: "onChange",
    defaultValues: { firstname, lastname },
  });
  const { doRequest, loading } = useRequest({
    request: UserService.update,
    onSuccess: async () => {
      await mutate();
      toast.success("¡Guardado con éxito!");
      handleClose();
    },
    onError: (err) => {
      handleFormError(err, setError);
    },
  });

  const onSubmit = (values: UserModel.UpdateValues) => {
    doRequest(values, id);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="-mx-3 md:flex mb-2">
        <div className="md:w-full px-3">
          <TextInput
            label="Nombre - denominación"
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
      </div>

      <div className="-mx-3 md:flex mb-2">
        <div className="md:w-full px-3">
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

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="btn btn-primary btn-outline mr-2"
          onClick={handleClose}
        >
          Cancelar
        </button>

        <Button disabled={!isValid} loading={loading}>
          Guardar
        </Button>
      </div>
    </form>
  );
};
