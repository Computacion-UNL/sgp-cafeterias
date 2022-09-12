import {
  Button,
  DropzoneField,
  NumberInput,
  SelectAsyncPaginate,
  TextInput,
} from "@components/elements";
import { handleFormError, sanitazeObjectIds, useRequest } from "@lib";
import { CategoryService, ProductService } from "@lib/services";
import { ProductModel } from "@types";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const SaveProductForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setError,
  } = useForm<ProductModel.NewValues>({
    mode: "onChange",
  });
  const { doRequest, loading } = useRequest({
    request: ProductService.save,
    onSuccess: () => {
      toast.success("¡Registro exitoso!");
      const returnUrl =
        (router.query.returnUrl as string) || "/admin/productos";
      router.push(returnUrl);
    },
    onError: (err) => {
      handleFormError(err, setError);
    },
  });

  const onSubmit = (values: ProductModel.NewValues) => {
    doRequest(sanitazeObjectIds(values, ["category"]));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="-mx-3 md:flex mb-2">
        <div className="md:w-full px-3">
          <TextInput
            label="Nombre - denominación"
            name="name"
            control={control}
            placeholder="Malteada de chocolate"
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
            multiline
            label="Descripción"
            name="description"
            control={control}
            placeholder="Descripción breve del producto"
            defaultValue=""
            rules={{
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
          <NumberInput
            label="Precio del producto ($)"
            placeholder="$3.50"
            name="price"
            control={control}
            defaultValue={0}
            prefix="$"
            decimalScale={2}
            allowNegative={false}
            rules={{ required: "El campo es requerido" }}
          />
        </div>

        <div className="md:w-1/2 px-3">
          <SelectAsyncPaginate
            label="Categoría"
            control={control}
            name="category"
            request={CategoryService.search}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            placeholder="Selecciona"
            rules={{ required: "El campo es requerido" }}
          />
        </div>
      </div>

      <div className="-mx-3 md:flex mb-2">
        <div className="md:w-full px-3">
          <DropzoneField
            control={control}
            name="photo"
            accept={{ "image/*": [] }}
            helperText=".jpg/.png"
            maxSize={1048576}
            multiple={false}
            rules={{ required: "El campo es requerido" }}
          />
        </div>
      </div>

      <div className="form-control mt-6">
        <Button disabled={!isValid || loading} loading={loading}>
          Registrar
        </Button>
      </div>
    </form>
  );
};
