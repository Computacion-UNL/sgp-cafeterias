import { Permissions } from "@cafetho/shared/build/types";
import {
  CheckCircleIcon,
  CollectionIcon,
  EyeIcon,
  FireIcon,
  HeartIcon,
  TicketIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { LinkProps } from "next/link";
import React from "react";

export interface DashboardItem {
  href: LinkProps["href"];
  icon?: React.ReactNode;
  title: string;
  permission?: Permissions;
}

export const dashboardItems: DashboardItem[] = [
  {
    href: "/",
    icon: <EyeIcon className="w-6 h-6 stroke-current" />,
    title: "Menú",
  },
  {
    href: "/admin/usuarios",
    icon: <UsersIcon className="w-6 h-6 stroke-current" />,
    title: "Usuarios",
    permission: Permissions["read:users"],
  },
  {
    href: "/admin/productos",
    icon: <FireIcon className="w-6 h-6 stroke-current" />,
    title: "Productos",
    permission: Permissions["read:products"],
  },
  {
    href: "/admin/categorias",
    icon: <CollectionIcon className="w-6 h-6 stroke-current" />,
    title: "Categorias",
    permission: Permissions["read:category"],
  },
  {
    href: "/admin/ordenes",
    icon: <TicketIcon className="w-6 h-6 stroke-current" />,
    title: "Órdenes",
    permission: Permissions["read:orders"],
  },
  {
    href: "/admin/mis-ordenes",
    icon: <HeartIcon className="w-6 h-6 stroke-current" />,
    title: "Mis órdenes",
  },
  {
    href: "/admin/comprobantes",
    icon: <CheckCircleIcon className="w-6 h-6 stroke-current" />,
    title: "Comprobantes de pago",
    permission: Permissions["read:receipts"],
  },
];
