import { SearchIcon } from "@heroicons/react/outline";
import { usePaginationRange } from "@lib";
import classNames from "classnames";
import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { NumberParam, StringParam, useQueryParams } from "use-query-params";
import { Table, TableProps } from "../Table";

export type DataTableProps = TableProps &
  DataTablePaginationProps & {
    search?: DataTableSearchProps;
  };
export const DataTable = (props: PropsWithChildren<DataTableProps>) => {
  const {
    headers,
    limit,
    loading,
    noContent,
    totalDocs,
    children,
    search,
    onPageChange,
    page,
  } = props;

  return (
    <div className="shadow-md px-2 py-4">
      {search && <DataTableSearch {...search} />}

      <Table
        headers={headers}
        limit={limit}
        loading={loading}
        noContent={noContent}
        totalDocs={totalDocs}
      >
        {children}
      </Table>

      <DataTablePagination
        loading={loading}
        totalDocs={totalDocs}
        limit={limit}
        onPageChange={onPageChange}
        page={page}
      />
    </div>
  );
};

export interface DataTablePaginationProps {
  loading: boolean;
  totalDocs?: number;
  limit: number;
  page: number;
  onPageChange: (newPage: number) => void;
}
export const DataTablePagination: FC<DataTablePaginationProps> = (props) => {
  const { loading, totalDocs, limit, page, onPageChange } = props;

  const [total, setTotal] = useState(
    Number.isNaN(totalDocs) || typeof totalDocs === "undefined" ? 0 : totalDocs
  );
  const paginationRange = usePaginationRange({
    currentPage: page,
    pageSize: limit,
    siblingCount: 0,
    totalCount: total,
  });

  useEffect(() => {
    if (!Number.isNaN(totalDocs) && totalDocs !== undefined)
      setTotal(totalDocs);
  }, [totalDocs]);

  const onNext = () => {
    onPageChange(page + 1);
  };

  const onPrevious = () => {
    onPageChange(page - 1);
  };

  let lastPage = paginationRange?.[paginationRange?.length - 1];

  let startInterval = limit * page + 1;
  let endInterval = limit * (page + 1);

  return (
    <nav
      className="flex justify-between items-center flex-col-reverse gap-3 sm:gap-0 sm:flex-row pt-4"
      aria-label="Navegación por la tabla"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Mostrando{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {startInterval}-{endInterval > total ? total : endInterval}
        </span>{" "}
        de{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {total}
        </span>
      </span>

      <div className="btn-group">
        <button
          className={classNames("btn btn-outline border-gray-300 btn-sm", {
            "btn-disabled": page === 0 || loading,
          })}
          onClick={onPrevious}
        >
          «
        </button>

        {paginationRange!.map((pageNumber, key) => {
          if (typeof pageNumber === "string") {
            return (
              <button
                className="btn btn-outline border-gray-300 btn-sm btn-disabled"
                key={key}
              >
                &#8230;
              </button>
            );
          }

          return (
            <button
              className={classNames("btn btn-outline border-gray-300 btn-sm", {
                "btn-active": pageNumber - 1 === page,
                "btn-disabled": loading,
              })}
              onClick={() => onPageChange(pageNumber - 1)}
              key={key}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className={classNames("btn btn-outline border-gray-300 btn-sm", {
            "btn-disabled":
              loading ||
              !lastPage ||
              (typeof lastPage === "number" && page === lastPage - 1),
          })}
          onClick={onNext}
        >
          »
        </button>
      </div>
    </nav>
  );
};

export interface DataTableSearchProps {
  placeholder?: string;
}
export const DataTableSearch: FC<DataTableSearchProps> = (props) => {
  const { placeholder } = props;

  const [searchParams, setSearchParams] = useQueryParams({
    search: StringParam,
    page: NumberParam,
  });
  const [searchText, setSearchText] = React.useState<string>(
    searchParams.search || ""
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="pb-4 bg-white dark:bg-gray-900">
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <SearchIcon
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
          />
        </div>

        <input
          type="text"
          className="block p-2 pl-10 w-full md:w-80 text-sm input input-bordered"
          placeholder={placeholder}
          onChange={handleChange}
          onKeyUp={(e) => {
            if (e.key === "Enter")
              setSearchParams({
                page: 0,
                search: searchText.trim(),
              });
          }}
          value={searchText}
        />
      </div>
    </div>
  );
};

DataTableSearch.defaultProps = {
  placeholder: "Buscar",
};
