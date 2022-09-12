import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  className?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const { label, className, ...rest } = props;

  const checkboxClass = classNames("checkbox", className);

  if (!label)
    return <input type="checkbox" className={checkboxClass} {...rest} />;

  return (
    <div className="form-control flex-row items-center mb-4">
      <label className="label cursor-pointer">
        <input type="checkbox" className={checkboxClass} {...rest} />
        <span className="label-text ml-2">{label}</span>
      </label>
    </div>
  );
};
