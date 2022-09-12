import { Permissions, Roles } from "../types";

const userPermissions = [
  //USERS SERVICE
  {
    name: Permissions["read:entities"],
    status: true,
    roles: Object.values(Roles),
  },
  { name: Permissions["read:users"], status: true, roles: [Roles.admin] },
  {
    name: Permissions["changeStatus:users"],
    status: true,
    roles: [Roles.admin],
  },
  {
    name: Permissions["save:address"],
    status: true,
    roles: Object.values(Roles),
  },
  { name: Permissions["save:users"], status: true, roles: [Roles.admin] },
  {
    name: Permissions["update:address"],
    status: true,
    roles: Object.values(Roles),
  },
  {
    name: Permissions["update:users"],
    status: true,
    roles: Object.values(Roles),
  },

  //PRODUCTS SERVICE
  {
    name: Permissions["changeStatus:category"],
    status: true,
    roles: [Roles.admin, Roles.waiter],
  },
  {
    name: Permissions["changeStatus:products"],
    status: true,
    roles: [Roles.admin, Roles.waiter],
  },
  {
    name: Permissions["save:category"],
    status: true,
    roles: [Roles.admin, Roles.waiter],
  },
  {
    name: Permissions["save:products"],
    status: true,
    roles: [Roles.admin, Roles.waiter],
  },
  {
    name: Permissions["update:category"],
    status: true,
    roles: [Roles.admin, Roles.waiter],
  },
  {
    name: Permissions["update:products"],
    status: true,
    roles: [Roles.admin, Roles.waiter],
  },
  {
    name: Permissions["read:category"],
    status: true,
    roles: [Roles.admin, Roles.waiter],
  },
  {
    name: Permissions["read:products"],
    status: true,
    roles: [Roles.admin, Roles.waiter],
  },

  //PRODUCTS SERVICE
  {
    name: Permissions["read:orders"],
    status: true,
    roles: [Roles.admin, Roles.waiter, Roles.chef],
  },
  {
    name: Permissions["read:receipts"],
    status: true,
    roles: [Roles.admin, Roles.waiter],
  },
  {
    name: Permissions["count:productsReceipts"],
    status: true,
    roles: [Roles.admin, Roles.waiter],
  },
  {
    name: Permissions["read:receipt"],
    status: true,
    roles: [Roles.admin, Roles.waiter],
  },
  {
    name: Permissions["save:order"],
    status: true,
    roles: Object.values(Roles),
  },
  {
    name: Permissions["save:receipt"],
    status: true,
    roles: [Roles.admin, Roles.waiter],
  },
  {
    name: Permissions["update:order"],
    status: true,
    roles: [Roles.chef, Roles.waiter],
  },
];

export const permissionData = [...userPermissions];
