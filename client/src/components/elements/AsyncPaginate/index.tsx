import { PaginationModel } from "@types";
import { AxiosResponse } from "axios";
import React from "react";
import { GroupBase } from "react-select";
import {
  AsyncPaginate as ReactSelectAsyncPaginate,
  AsyncPaginateProps as AsyncProps,
} from "react-select-async-paginate";

export type AsyncPaginateProps<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional extends PaginationModel.Values,
  IsMulti extends boolean
> = Pick<
  AsyncProps<OptionType, Group, Additional, IsMulti>,
  | "getOptionLabel"
  | "getOptionValue"
  | "placeholder"
  | "debounceTimeout"
  | "isClearable"
  | "defaultInputValue"
  | "defaultOptions"
  | "defaultValue"
  | "onChange"
  | "value"
  | "additional"
> & {
  request: (
    props: PaginationModel.SearchValues
  ) => Promise<AxiosResponse<PaginationModel.Response<OptionType>, any>>;
  loadingMessage?: string;
  noOptionsMessage?: string;
  helperText?: string;
  id: string;
  label: React.ReactNode;
};

export type IAsyncPaginateComponent = <
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional extends PaginationModel.Values,
  IsMulti extends boolean = false
>(
  props: AsyncPaginateProps<OptionType, Group, Additional, IsMulti>
) => React.ReactElement;

export const AsyncPaginate: IAsyncPaginateComponent = (props) => {
  const {
    request,
    loadingMessage,
    noOptionsMessage,
    helperText,
    id,
    label,
    ...rest
  } = props;

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>

      <ReactSelectAsyncPaginate
        placeholder="Buscar"
        debounceTimeout={400}
        loadingMessage={() => loadingMessage || "Buscando..."}
        noOptionsMessage={() => noOptionsMessage || "No existen resultados"}
        isClearable
        menuPortalTarget={
          typeof window === "undefined" ? undefined : document.body
        }
        id={id}
        instanceId={id}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          input: (base) => ({ ...base, paddingTop: 9, paddingBottom: 9 }),
          option: (styles, state) => ({
            ...styles,
            cursor: "pointer",
          }),
          control: (styles) => ({
            ...styles,
            cursor: "pointer",
          }),
        }}
        loadOptions={async (search, options, additional) => {
          const { data } = await request({
            page: additional!.page,
            limit: additional!.limit,
            search,
          });

          return {
            options: data.docs,
            hasMore: data.hasNextPage,
            additional: {
              page: additional!.page + 1,
              limit: additional!.limit,
            },
          };
        }}
        additional={{ page: 1, limit: 10 }}
        {...rest}
      />

      {helperText && (
        <label className="label">
          <span className="label-text-alt">{helperText}</span>
        </label>
      )}
    </div>
  );
};
