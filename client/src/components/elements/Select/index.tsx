import React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import clx from "classnames";

export type SelectProps<T> = UseControllerProps<T> & {
  label: React.ReactNode;
  altLabel?: React.ReactNode;
  data: { id: string; name: string }[];
  helperText?: React.ReactNode;
};
export type SelectComponent = <T>(props: SelectProps<T>) => React.ReactElement;
export const Select: SelectComponent = (props) => {
  const { label, altLabel, data, helperText } = props;

  const {
    field: { value, ...field },
    fieldState: { error },
  } = useController(props);

  const selectClass = clx("select select-bordered w-full", {
    "select-error": !!error,
  });

  return (
    <>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">{label}</span>
          {altLabel && <span className="label-text-alt">{altLabel}</span>}
        </label>
        <select className={selectClass} {...field} value={value as any}>
          <option disabled value="">
            Selecciona
          </option>
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <label className="label">
          {helperText && !error && (
            <span className="label-text-alt">{helperText}</span>
          )}
          {error && (
            <span className="label-text-alt text-error">{error.message}</span>
          )}
        </label>
      </div>
    </>
  );
};
