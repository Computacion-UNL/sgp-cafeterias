import { MenuIcon } from "@heroicons/react/outline";
import {
  getInitials,
  hasPermission,
  useAuthContext,
  useSidebarCategories,
} from "@lib";
import classNames from "classnames";
import { useRouter } from "next/router";
import { PropsWithChildren, useMemo } from "react";
import ScrollBar from "react-perfect-scrollbar";
import { NextLink, OrderListDropdown } from "..";
import { DashboardItem, dashboardItems } from "./items";

export const Dashboard = (props: PropsWithChildren) => {
  return (
    <div className="drawer drawer-mobile">
      <input id="cafetho-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <DashboardNav id="cafetho-drawer" />
        <main className="flex-grow p-5">{props.children}</main>
      </div>

      <DashboardSidebar id="cafetho-drawer" />
    </div>
  );
};

export const DashboardNav = (props: { id: string }) => {
  const { id } = props;

  const { currentUser } = useAuthContext();

  return (
    <div className="w-full navbar bg-base-100">
      <div className="flex-none lg:hidden">
        <label htmlFor={id} className="btn btn-square btn-ghost">
          <MenuIcon className="inline-block w-6 h-6 stroke-current"></MenuIcon>
        </label>
      </div>
      <div className="flex-1">
        <NextLink href="/">
          <a className="btn btn-ghost normal-case text-xl">Cafeterías Loja</a>
        </NextLink>
      </div>

      <div className="flex-none">
        <OrderListDropdown />

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar placeholder"
            title={
              currentUser
                ? currentUser.entity.lastname
                  ? `${currentUser.entity.firstname} ${currentUser.entity.lastname}`
                  : currentUser.entity.firstname
                : "Usuario no identificado"
            }
          >
            <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
              <span>
                {getInitials(
                  currentUser
                    ? currentUser.entity.lastname
                      ? `${currentUser.entity.firstname} ${currentUser.entity.lastname}`
                      : currentUser.entity.firstname
                    : "UI"
                )}
              </span>
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <div className="flex flex-col px-4 py-1">
              <span className="opacity-80 text-sm">
                {currentUser
                  ? currentUser.entity.lastname
                    ? `${currentUser.entity.firstname} ${currentUser.entity.lastname}`
                    : currentUser.entity.firstname
                  : "Usuario no identificado"}
              </span>

              {currentUser && (
                <span className="font-bold text-xs opacity-70">
                  {currentUser.rol.name}
                </span>
              )}
            </div>

            <li></li>

            <li>
              <NextLink href="/admin/mis-ordenes">
                <a>Mis ordenes</a>
              </NextLink>
            </li>

            <li>
              <NextLink href="/admin/mis-direcciones">
                <a>Mis direcciones</a>
              </NextLink>
            </li>
            <li>
              <NextLink href="/admin/cambiar-clave">
                <a>Cambiar clave</a>
              </NextLink>
            </li>
            <li>
              {currentUser ? (
                <NextLink href="/salir">
                  <a>Salir</a>
                </NextLink>
              ) : (
                <NextLink href="/ingresar">
                  <a>Ingresar</a>
                </NextLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const DashboardSidebar = (props: { id: string }) => {
  const { id } = props;

  const { permissions } = useAuthContext();

  return (
    <div className="drawer-side ">
      <label htmlFor={id} className="drawer-overlay"></label>
      <aside className="w-60 bg-base-200 overflow-hidden">
        <ScrollBar>
          <div className="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 flex shadow-sm">
            <NextLink href="/">
              <a
                aria-current="page"
                aria-label="Principal"
                className="flex-0 btn btn-ghost px-2"
              >
                <div className="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
                  <span className="lowercase">Cafetho</span>
                  <span className="text-base-content uppercase">LOH</span>
                </div>
              </a>
            </NextLink>
          </div>

          <ul className="menu menu-compact flex flex-col p-0 px-4">
            {dashboardItems.map((item) =>
              hasPermission(permissions, item.permission) ? (
                <SidebarItem key={item.title} {...item} />
              ) : null
            )}
          </ul>

          <CategoryMenu />

          <div className="from-base-200 pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t to-transparent" />
        </ScrollBar>
      </aside>
    </div>
  );
};

export const CategoryMenu = () => {
  const { data: categories, loading } = useSidebarCategories();

  return (
    <ul className="menu menu-compact flex flex-col p-0 px-4">
      <li></li>

      <li className="menu-title">
        <span>Categorías</span>
      </li>

      {loading &&
        Array.from(Array(10).keys()).map((item) => (
          <li key={item}>
            <div className="animate-pulse flex items-center">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-7 bg-slate-200 rounded" />
              </div>
            </div>
          </li>
        ))}

      {!loading &&
        categories?.docs.map((category) => (
          <SidebarItem
            key={category.id}
            href={`/categoria/${category.id}`}
            title={category.name}
          />
        ))}
    </ul>
  );
};

export const SidebarItem = (props: DashboardItem) => {
  const { href, icon, title } = props;

  const router = useRouter();
  const active = useMemo(
    () => (href ? router.pathname === href || router.asPath === href : false),
    [href, router.asPath, router.pathname]
  );

  return (
    <li>
      <NextLink href={href}>
        <a className={classNames("flex gap-4", { active })}>
          {icon && <span className="flex-none">{icon}</span>}
          <span className="flex-1">{title}</span>
        </a>
      </NextLink>
    </li>
  );
};
