import { Button, DataTable, DialogForm } from "@components/elements";
import { useAddresses, useAuthContext } from "@lib";
import { EntityModel } from "@types";
import { UpdateAddressForm } from "./UpdateAddressForm";

export const AddressTable = () => {
  const { currentUser } = useAuthContext();
  const {
    data: addresses,
    loading,
    pagination,
  } = useAddresses(currentUser!.id);
  const { limit, onPageChange, page } = pagination;

  return (
    <DataTable
      headers={[
        "Nombres",
        "Cédula/RUC",
        "Correo",
        "Teléfono",
        "Dirección",
        "Acciones",
      ]}
      search={{ placeholder: "Buscar dirección" }}
      loading={loading}
      totalDocs={addresses?.totalDocs}
      limit={limit}
      onPageChange={onPageChange}
      page={page}
    >
      {addresses?.docs.map((address) => (
        <AddressTableRow key={address.id} {...address} />
      ))}
    </DataTable>
  );
};

const AddressTableRow = (props: EntityModel.Response) => {
  const { dni, firstname, principal, address, lastname } = props;

  return (
    <tr className="hover">
      <td>
        <p>
          {firstname} {lastname}
        </p>

        {principal && (
          <div className="badge badge-primary">Dirección Principal</div>
        )}
      </td>

      <td>{dni}</td>

      <td>{address?.email || "No definido"}</td>

      <td>{address?.phone || "No definido"}</td>

      {address ? (
        <td className="w-80 whitespace-normal">
          <p className="font-bold line-clamp-2">{address?.mainStreet}</p>
          <p className="text-xs text-neutral line-clamp-2">
            {address?.secondaryStreet}
          </p>
        </td>
      ) : (
        <td>No definido</td>
      )}

      <td>
        <DialogForm
          buttonComponent={Button}
          buttonProps={{ children: "Modificar", className: "btn-sm" }}
          title="Modificar dirección"
          subtitle="Modificar información de la dirección"
        >
          {(handleClose) => (
            <UpdateAddressForm handleClose={handleClose} {...props} />
          )}
        </DialogForm>
      </td>
    </tr>
  );
};
