import { AsyncPaginate } from "@components";
import { EntityService, receiptCustomerState } from "@lib";
import { useRecoilState } from "recoil";

export const UserSearch = () => {
  const [receiptCustomer, setReceiptCustomer] =
    useRecoilState(receiptCustomerState);

  return (
    <div className="card shadow-md mt-4">
      <div className="card-body">
        <div className="-mx-3 md:flex mb-2">
          <div className="md:w-full px-3">
            <AsyncPaginate
              label="Buscar Usuario"
              placeholder="Buscar por Cédula/RUC o nombres"
              id="category"
              request={EntityService.search}
              value={receiptCustomer}
              onChange={setReceiptCustomer}
              getOptionLabel={(option) =>
                option.lastname
                  ? `${option.firstname} ${option.lastname} (${option.dni})`
                  : `${option.firstname} (${option.dni})`
              }
              getOptionValue={(option) => option.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
