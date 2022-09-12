import { StringParam, useQueryParam } from "use-query-params";
import { useFilters, UseFiltersProps, usePagination } from ".";
import { FiltersReturn } from "./useFilters";
import { PaginationReturn, UsePaginationProps } from "./usePagination";

export type UseDataPaginationProps<T> = {
  filterParams?: UseFiltersProps<T>;
  searchFields?: string[];
  paginationProps?: UsePaginationProps;
};

export interface DataPaginationReturn<T> {
  pagination: PaginationReturn;
  filter: FiltersReturn<T>;
  search: string | null | undefined;
}

export const useDataPagination = <T extends {}>(
  props?: UseDataPaginationProps<T>
): DataPaginationReturn<T> => {
  const pagination = usePagination(props?.paginationProps);
  const filter = useFilters<T>(props?.filterParams);
  const [search, setSearch] = useQueryParam("search", StringParam);

  return { pagination, filter, search };
};
