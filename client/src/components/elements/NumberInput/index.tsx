import classNames from "classnames";
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import ReactNumberFormat, { NumberFormatProps } from "react-number-format";

export type NumberInputProps<TFormValues> = UseControllerProps<TFormValues> &
  Omit<NumberFormatProps, "name" | "defaultValue"> & {
    label: React.ReactNode;
    altLabel?: React.ReactNode;
    helperText?: React.ReactNode;
  };

export type NumberInputComponent = <TFormValues>(
  props: NumberInputProps<TFormValues>
) => React.ReactElement;

export const NumberInput: NumberInputComponent = (props) => {
  const {
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
    label,
    altLabel,
    helperText,
    className,
    ...rest
  } = props;

  const {
    field: { value, onChange, ref, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  const inputClass = classNames(
    "input input-bordered w-full",
    { "input-error": !!error },
    className
  );

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
        {altLabel && <span className="label-text-alt">{altLabel}</span>}
      </label>

      <ReactNumberFormat
        {...field}
        thousandSeparator={true}
        value={value as any}
        onValueChange={(values) => {
          onChange(values.floatValue);
        }}
        className={inputClass}
        {...rest}
      />

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
