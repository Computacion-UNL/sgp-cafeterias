import React, { FC, PropsWithChildren } from "react";
import Link, { LinkProps } from "next/link";

export const NextLink = (props: PropsWithChildren<LinkProps>) => {
  const { children, ...rest } = props;

  return (
    <Link {...rest}>
      {typeof children === "string" ? <a>{children}</a> : children}
    </Link>
  );
};
