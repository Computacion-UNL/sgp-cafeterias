import { DataPaginationReturn } from "@lib/hooks";
import { PaginationModel } from "@types";
import { AxiosRequestConfig } from "axios";
import { NextPageContext } from "next";
import { removeEmpty } from "./utils";

type GetPaginationRequest = Omit<AxiosRequestConfig, "params"> & {
  params?: PaginationModel.Values;
};

interface GetRequestParams<T> {
  dataPagination?: DataPaginationReturn<T>;
  ctx?: NextPageContext;
  searchKeys?: (keyof T)[];
  initialParams?: PaginationModel.Values["query"];
  paginationParams?: Partial<PaginationModel.Values>;
}

export const getPaginationRequest = <T>(
  url: string,
  params: GetRequestParams<T>
): GetPaginationRequest => {
  const { ctx, dataPagination, searchKeys, initialParams, paginationParams } =
    params;

  if (ctx) {
    const { limit, page, search, returnUrl, ...rest } = ctx.query;

    const serverRequest: GetPaginationRequest = {
      url,
      params: {
        ...paginationParams,
        limit: paginationParams?.limit || convertParamToNumber(limit, 10),
        page: paginationParams?.page || convertParamToNumber(page, 0) + 1,
        query: {
          ...initialParams,
          ...removeEmpty(rest),
          ...getSearchQuery(search, searchKeys),
        },
      },
    };

    return serverRequest;
  }

  if (dataPagination) {
    const { search } = dataPagination;

    const request: GetPaginationRequest = {
      url,
      params: {
        ...paginationParams,
        limit: dataPagination.pagination.limit,
        page: dataPagination.pagination.page + 1,
        query: {
          ...initialParams,
          ...removeEmpty(dataPagination.filter.filters),
          ...getSearchQuery(search, searchKeys),
        },
      },
    };
    return request;
  }

  if (paginationParams) {
    const { query, limit, page } = paginationParams;

    const request: GetPaginationRequest = {
      url,
      params: {
        limit: limit ?? 10,
        page: page ?? 1,
        query: {
          ...initialParams,
          ...getSearchQuery(query?.search, searchKeys),
        },
      },
    };
    return request;
  }

  return {};
};

const convertParamToNumber = (
  queryParam: string | string[] | undefined,
  defaultValue: number
): number => {
  if (queryParam) {
    const queryParamNumber =
      typeof queryParam === "string" ? parseInt(queryParam) : defaultValue;

    return Number.isNaN(queryParamNumber) ? defaultValue : queryParamNumber;
  }

  return defaultValue;
};

export const getSearchQuery = (
  searchText: string | string[] | null | undefined,
  searchKeys: (keyof any)[] | undefined
) => {
  if (typeof searchText === "string" && searchText.length && searchKeys) {
    const searchQuery = searchKeys.map((searchKey) => ({
      [searchKey]: { $regex: searchText.toLowerCase(), $options: "i" },
    }));

    return { $or: searchQuery };
  }

  return {};
};
