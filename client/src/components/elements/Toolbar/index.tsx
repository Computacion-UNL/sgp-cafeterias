import { LinkProps } from "next/link";
import { ReactNode } from "react";
import { NextLink } from "../NextLink";

export interface ToolbarProps {
  title: ReactNode;
  leading: ReactNode;
  button?: {
    icon: ReactNode;
    title: ReactNode;
    href: LinkProps["href"];
  };
}

export const Toolbar = (props: ToolbarProps) => {
  const { leading, title, button } = props;

  return (
    <div className="block md:flex items-center justify-between mb-7">
      <div className="prose mb-4 md:mb-auto">
        <h1>{title}</h1>
        <p>{leading}</p>
      </div>

      {button && (
        <NextLink href={button.href} passHref>
          <button className="btn btn-outline btn-primary gap-2">
            <div className="h-6 w-6">{button.icon}</div>
            {button.title}
          </button>
        </NextLink>
      )}
    </div>
  );
};
