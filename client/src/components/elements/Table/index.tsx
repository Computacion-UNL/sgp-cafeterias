import React, { FC, Fragment, PropsWithChildren } from "react";

export interface TableProps {
  headers: string[];
  noContent?: string;
  loading?: boolean;
  limit?: number;
  totalDocs?: number;
}
export const Table: FC<PropsWithChildren<TableProps>> = (props) => {
  const { headers, children, limit, loading, noContent, totalDocs } = props;

  return (
    <div className="overflow-x-auto">
      <table className="table table-normal w-full">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <TableBodySkeleton colSpan={headers.length} limit={limit!} />
          ) : (
            children
          )}

          {!loading && totalDocs === 0 && (
            <TableNoContent colSpan={headers.length} noContent={noContent!} />
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.defaultProps = {
  limit: 10,
  loading: false,
  noContent: "No se ha encontrado ningún registro",
};

export interface TableBodySkeletonProps {
  limit: number;
  colSpan: number;
}
export const TableBodySkeleton = (props: TableBodySkeletonProps) => {
  const { limit, colSpan } = props;

  return (
    <Fragment>
      {Array.from(Array(limit).keys()).map((item) => (
        <tr key={item}>
          <td colSpan={colSpan}>
            <div className="animate-pulse flex space-x-4 items-center">
              <div className="rounded-full bg-slate-200 h-10 w-10" />
              <div className="flex-1 space-y-6 py-1">
                <div className="h-7 bg-slate-200 rounded" />
              </div>
            </div>
          </td>
        </tr>
      ))}
    </Fragment>
  );
};

export interface TableNoContentProps {
  noContent: string;
  colSpan: number;
}
export const TableNoContent = (props: TableNoContentProps) => {
  const { colSpan, noContent } = props;

  return (
    <tr className="hover">
      <td colSpan={colSpan}>
        <div className="flex items-center justify-center p-10">
          <p className="text-neutral">{noContent}</p>
        </div>
      </td>
    </tr>
  );
};
