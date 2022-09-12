import { SWRConfiguration } from "swr";
import { FilterModel } from "./Filter";

declare namespace PaginationModel {
  /**
   * Query values
   */
  export interface Values {
    limit: number;
    page: number;
    query?: FilterModel.Items;
    pagination?: boolean;
    sort?: { [key: string]: "asc" | "desc" | "ascending" | "descending" };
  }

  export type SearchValues = Partial<PaginationModel.Values> & {
    search?: string;
  };

  /**
   * Pagination base response
   */
  export interface Response<M = any> {
    docs: M[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  }
}

export { PaginationModel };
