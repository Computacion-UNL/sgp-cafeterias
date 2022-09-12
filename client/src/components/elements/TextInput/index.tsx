import React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import clx from "classnames";

export type TextInputProps<T> = UseControllerProps<T> & {
  label: React.ReactNode;
  altLabel?: React.ReactNode;
  placeholder: string;
  type?: string;
  helperText?: React.ReactNode;
  multiline?: boolean;
  disabled?: boolean;
};

export type TextInputComponent = <T>(
  props: TextInputProps<T>
) => React.ReactElement;

export const TextInput: TextInputComponent = (props) => {
  const {
    label,
    altLabel,
    placeholder,
    helperText,
    type,
    multiline = false,
    disabled = false,
  } = props;
  const {
    field: { value, ...field },
    fieldState: { error },
  } = useController(props);

  const inputClass = clx("w-full", {
    "input input-bordered": !multiline,
    "textarea textarea-bordered": multiline,
    "input-error": !!error && !multiline,
    "textarea-error": !!error && multiline,
  });

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
        {altLabel && <span className="label-text-alt">{altLabel}</span>}
      </label>

      {multiline ? (
        <textarea
          {...field}
          value={value as any}
          placeholder={placeholder}
          className={inputClass}
        />
      ) : (
        <input
          {...field}
          value={value as any}
          type={type || "text"}
          placeholder={placeholder}
          className={inputClass}
          disabled={disabled}
        />
      )}
      <label className="label">
        {helperText && !error && (
          <span className="label-text-alt">{helperText}</span>
        )}
        {error && (
          <span className="label-text-alt text-error">{error.message}</span>
        )}
      </label>
    </div>
  );
};
