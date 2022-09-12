import { Button, DataTable, DialogForm } from "@components/elements";
import { toastErrors, useRequest, useUsers } from "@lib";
import { UserService } from "@lib/services";
import { UserModel } from "@types";
import { toast } from "react-toastify";
import { UpdateUserForm } from "./UpdateUserForm";

export const UserTable = () => {
  const { data: users, loading, pagination } = useUsers();
  const { limit, onPageChange, page } = pagination;

  return (
    <DataTable
      headers={["Nombre", "Correo", "Cédula", "Rol", "Estado", "Acciones"]}
      search={{ placeholder: "Buscar usuarios" }}
      loading={loading}
      totalDocs={users?.totalDocs}
      limit={limit}
      onPageChange={onPageChange}
      page={page}
    >
      {users?.docs.map((user) => (
        <UserTableRow key={user.id} {...user} />
      ))}
    </DataTable>
  );
};

const UserTableRow = (props: UserModel.Response) => {
  const { entity, email, rol, status, id } = props;

  const { mutate } = useUsers();
  const { doRequest, loading } = useRequest({
    request: UserService.changeStatus,
    onSuccess: async () => {
      await mutate();
      toast.success("Acción exitosa!");
    },
    onError: (err) => {
      toastErrors(err);
    },
  });

  return (
    <tr className="hover">
      <td>
        {entity.firstname} {entity.lastname}{" "}
      </td>

      <td>{email}</td>

      <td>{entity.dni}</td>

      <td>{rol.name}</td>

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
          buttonProps={{ children: "Cambiar Nombre" }}
          title="Modificar producto"
          subtitle="Modificar información registrada"
        >
          {(handleClose) => (
            <UpdateUserForm handleClose={handleClose} {...props.entity} />
          )}
        </DialogForm>
      </td>
    </tr>
  );
};
