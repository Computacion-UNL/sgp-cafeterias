import clx from "classnames";
import { PropsWithChildren } from "react";

export type ButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  defaultClass?: boolean;
};
export const Button = (props: PropsWithChildren<ButtonProps>) => {
  const {
    loading = false,
    children,
    disabled = false,
    className,
    defaultClass = false,
    ...rest
  } = props;

  const buttonClass = clx(
    { loading: loading, "btn btn-primary": !defaultClass },
    className
  );

  return (
    <button className={buttonClass} type="submit" disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
