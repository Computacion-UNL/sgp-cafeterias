import { Button, TextInput } from "@components/elements";
import { handleFormError, useRequest, useSidebarCategories } from "@lib";
import { CategoryService } from "@lib/services";
import { CategoryModel } from "@types";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const SaveCategoryForm = () => {
  const router = useRouter();
  const { mutate } = useSidebarCategories();
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError,
  } = useForm<CategoryModel.NewValues>({
    mode: "onChange",
  });
  const { doRequest, loading } = useRequest({
    request: CategoryService.save,
    onSuccess: () => {
      mutate();
      toast.success("¡Registro exitoso!");
      const returnUrl =
        (router.query.returnUrl as string) || "/admin/categorias";
      router.push(returnUrl);
    },
    onError: (err) => handleFormError(err, setError),
  });

  const onSubmit = (values: CategoryModel.NewValues) => {
    doRequest(values);
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

      <div className="form-control mt-6">
        <Button disabled={!isValid} loading={loading}>
          Registrar
        </Button>
      </div>
    </form>
  );
};
