import { Button, TextInput } from "@components/elements";
import {
  handleFormError,
  useCategories,
  useRequest,
  useSidebarCategories,
} from "@lib";
import { CategoryService } from "@lib/services";
import { CategoryModel, IFormBase } from "@types";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const UpdateCategoryForm = (
  props: IFormBase.Dialog<CategoryModel.Response>
) => {
  const { name, description, handleClose, id } = props;

  const { mutate: mutateSidebarCategories } = useSidebarCategories();
  const { mutate } = useCategories();
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError,
  } = useForm<CategoryModel.UpdateValues>({
    mode: "onChange",
    defaultValues: { name, description },
  });
  const { doRequest, loading } = useRequest({
    request: CategoryService.update,
    onSuccess: async () => {
      mutateSidebarCategories();
      await mutate();
      toast.success("¡Guardado con éxito!");
      handleClose();
    },
    onError: (err) => {
      handleFormError(err, setError);
    },
  });

  const onSubmit = (values: CategoryModel.UpdateValues) => {
    doRequest(values, id);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="-mx-3 md:flex mb-2">
        <div className="md:w-full px-3">
          <TextInput
            label="Nombre - denominación"
            name="name"
            control={control}
            placeholder="Bebidad frías"
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
        <div className="md:w-full px-3">
          <TextInput
            label="Descripción (opcional)"
            name="description"
            control={control}
            placeholder="Contiene bebidas como malteadas y tés fríos"
            defaultValue=""
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
