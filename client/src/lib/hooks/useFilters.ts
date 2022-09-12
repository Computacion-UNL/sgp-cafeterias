import { FilterModel } from "@types";
import { useMemo } from "react";
import {
  createEnumParam,
  DecodedValueMap,
  QueryParamConfigMap,
  SetQuery,
  useQueryParams,
  withDefault,
} from "use-query-params";

export type UseFiltersProps<T> = Partial<Record<keyof T, FilterModel.Options>>;

export interface FiltersReturn<T> {
  filters: DecodedValueMap<QueryParamConfigMap>;
  setFilters: SetQuery<QueryParamConfigMap>;
  filterInputs: ({
    name: string;
  } & Partial<Record<keyof T, FilterModel.Options>>[keyof T])[];
}

export const useFilters = <T>(
  properties?: UseFiltersProps<T>
): FiltersReturn<T> => {
  const paramConfigMap = useMemo<QueryParamConfigMap>(() => {
    if (!properties) return {};
    const propertyKeys = Object.keys(properties);

    if (propertyKeys.length > 0) {
      const params = propertyKeys.reduce<QueryParamConfigMap>((result, key) => {
        const options = properties[key as keyof T];
        if (options)
          result[key] = withDefault(
            createEnumParam(options.items.map((option) => option.value)),
            ""
          );
        return result;
      }, {});

      return params;
    }

    return {};
  }, [properties]);

  const filterInputs = useMemo(() => {
    if (!properties) return [];
    const propertyKeys = Object.keys(properties);
    return propertyKeys.length > 0
      ? propertyKeys.map((key) => ({
          name: key,
          ...properties[key as keyof T],
        }))
      : [];
  }, [properties]);

  const [filters, setFilters] = useQueryParams(paramConfigMap);

  return {
    filters,
    setFilters,
    filterInputs,
  };
};
