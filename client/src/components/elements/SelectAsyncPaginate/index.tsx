import { PaginationModel } from "@types";
import { AxiosResponse } from "axios";
import { ReactElement } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { GroupBase } from "react-select";
import { AsyncPaginate, AsyncPaginateProps } from "react-select-async-paginate";

export type SelectAsyncPaginateProps<
  TFormValues,
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional extends PaginationModel.Values,
  IsMulti extends boolean
> = Pick<
  AsyncPaginateProps<OptionType, Group, Additional, IsMulti>,
  | "getOptionLabel"
  | "getOptionValue"
  | "placeholder"
  | "debounceTimeout"
  | "isClearable"
  | "defaultInputValue"
  | "defaultOptions"
> &
  UseControllerProps<TFormValues> & {
    request: (
      props: PaginationModel.SearchValues
    ) => Promise<AxiosResponse<PaginationModel.Response<OptionType>, any>>;
    loadingMessage?: string;
    noOptionsMessage?: string;
    helperText?: string;
    label: React.ReactNode;
  };

type SelectAsyncPaginateComponent = <
  TFormValues,
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional extends PaginationModel.Values,
  IsMulti extends boolean = false
>(
  props: SelectAsyncPaginateProps<
    TFormValues,
    OptionType,
    Group,
    Additional,
    IsMulti
  >
) => ReactElement;

export const SelectAsyncPaginate: SelectAsyncPaginateComponent = (props) => {
  const {
    name,
    label,
    control,
    defaultValue,
    rules,
    shouldUnregister,
    request,
    loadingMessage,
    noOptionsMessage,
    helperText,
    ...rest
  } = props;

  const {
    field: { ref, value, ...fieldProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>

      <AsyncPaginate
        {...fieldProps}
        selectRef={ref}
        placeholder="Buscar"
        debounceTimeout={400}
        defaultValue={value as any}
        loadingMessage={() => loadingMessage || "Buscando..."}
        noOptionsMessage={() => noOptionsMessage || "No existen resultados"}
        isClearable
        menuPortalTarget={
          typeof window === "undefined" ? undefined : document.body
        }
        id={name}
        instanceId={name}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          control: (styles) => ({
            ...styles,
            cursor: "pointer",
            borderColor: error ? "red" : styles.borderColor,
            "&:hover": {
              borderColor: error ? "red" : styles[":hover"]?.borderColor,
            },
          }),
          input: (base) => ({ ...base, paddingTop: 9, paddingBottom: 9 }),
          option: (styles, state) => ({
            ...styles,
            cursor: "pointer",
          }),
        }}
        loadOptions={async (search, options, additional) => {
          const { data } = await request({
            page: additional!.page,
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

      {!!error && <div id={`${name}-error`}>{error.message}</div>}

      {!!helperText && !error && <div id={`${name}-helper`}>{helperText}</div>}
    </div>
  );
};
