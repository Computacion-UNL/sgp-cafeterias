import { Button, DataTable, DialogForm } from "@components/elements";
import { currencyFormat, toastErrors, useRequest } from "@lib";
import { useProducts } from "@lib/api";
import { ProductService } from "@lib/services";
import { ProductModel } from "@types";
import { toast } from "react-toastify";
import { UpdateProductForm } from "./UpdateProductForm";

export const ProductTable = () => {
  const { data: products, loading, pagination } = useProducts();
  const { limit, onPageChange, page } = pagination;

  return (
    <DataTable
      headers={["Nombre", "Precio", "Categoría", "Estado", "Acciones"]}
      search={{ placeholder: "Buscar productos" }}
      loading={loading}
      totalDocs={products?.totalDocs}
      limit={limit}
      onPageChange={onPageChange}
      page={page}
    >
      {products?.docs.map((products) => (
        <ProductTableRow key={products.id} {...products} />
      ))}
    </DataTable>
  );
};

const ProductTableRow = (props: ProductModel.Response) => {
  const { name, price, category, status, urlPhoto, id, description } = props;

  const { mutate } = useProducts();
  const { doRequest, loading } = useRequest({
    request: ProductService.changeStatus,
    onSuccess: async () => {
      await mutate();
      toast.success("Acción exitosa!", { toastId: id });
    },
    onError: (err) => toastErrors(err),
  });

  return (
    <tr className="hover">
      <td className="w-52 whitespace-normal">
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={urlPhoto} alt={name} />
            </div>
          </div>

          <div className="w-52">
            <h6 className="font-bold line-clamp-2">{name}</h6>
            <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
          </div>
        </div>
      </td>

      <td>{currencyFormat(price)}</td>

      <td>{category.name}</td>

      <td>
        {status ? (
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              className="toggle toggle-accent"
              checked={status}
              onChange={() => {
                doRequest(id);
              }}
              disabled={loading}
            />
          </label>
        ) : (
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className=" toggle toggle-accent"
                checked={status}
                onChange={() => {
                  doRequest(id);
                }}
                disabled={loading}
              />
            </label>
          </div>
        )}
      </td>

      <td>
        <DialogForm
          buttonComponent={Button}
          buttonProps={{ children: "Editar" }}
          title="Modificar producto"
          subtitle="Modificar información registrada"
        >
          {(handleClose) => (
            <UpdateProductForm handleClose={handleClose} {...props} />
          )}
        </DialogForm>
      </td>
    </tr>
  );
};
