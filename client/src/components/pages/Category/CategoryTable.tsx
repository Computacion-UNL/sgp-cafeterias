import { Button, DataTable, DialogForm } from "@components/elements";
import { toastErrors, useRequest } from "@lib";
import { useCategories, useSidebarCategories } from "@lib/api/category";
import { CategoryService } from "@lib/services";
import { CategoryModel } from "@types";
import { toast } from "react-toastify";
import { UpdateCategoryForm } from "./UpdateCategoryForm";

export const CategoryTable = () => {
  const { data: categories, loading, pagination } = useCategories();
  const { limit, onPageChange, page } = pagination;

  return (
    <DataTable
      headers={["Nombre", "Descripción (Opcional)", "Estado", ""]}
      search={{ placeholder: "Buscar categorías" }}
      loading={loading}
      totalDocs={categories?.totalDocs}
      limit={limit}
      onPageChange={onPageChange}
      page={page}
    >
      {categories?.docs.map((categories) => (
        <CategoryTableRow key={categories.id} {...categories} />
      ))}
    </DataTable>
  );
};

const CategoryTableRow = (props: CategoryModel.Response) => {
  const { name, description, status, id } = props;

  const { mutate: mutateSidebarCategories } = useSidebarCategories();
  const { mutate } = useCategories();
  const { doRequest, loading } = useRequest({
    request: CategoryService.changeStatus,
    onSuccess: async () => {
      mutateSidebarCategories();
      await mutate();
      toast.success("Acción exitosa!", { toastId: id });
    },
    onError: (err) => toastErrors(err),
  });

  return (
    <tr className="hover">
      <td>{name}</td>

      <td>{description || " - "}</td>

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
          title="Modificar categoría"
          subtitle="Modificar información registrada"
        >
          {(handleClose) => (
            <UpdateCategoryForm handleClose={handleClose} {...props} />
          )}
        </DialogForm>
      </td>
    </tr>
  );
};
