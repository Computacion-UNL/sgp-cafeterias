import React, { useCallback } from "react";
import { NumberParam, useQueryParams, withDefault } from "use-query-params";

export interface UsePaginationProps {
  initialPage?: number;
  initialLimit?: number;
}

export interface PaginationReturn {
  limit: number;
  page: number;
  onLimitChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onPageChange: (newPage: number) => void;
}

export const usePagination = (props?: UsePaginationProps): PaginationReturn => {
  const [pagination, setPagination] = useQueryParams({
    page: withDefault(NumberParam, props?.initialPage || 0),
    limit: withDefault(NumberParam, props?.initialLimit || 10),
  });
  const { page, limit } = pagination;

  const onLimitChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newLimit = parseInt(event.target.value, 10);
      setPagination({
        limit: newLimit,
        page: 0,
      });
    },
    [setPagination]
  );

  const onPageChange = useCallback(
    (newPage: number) => {
      setPagination({ page: newPage });
    },
    [setPagination]
  );

  return {
    limit,
    page,
    onLimitChange,
    onPageChange,
  };
};
