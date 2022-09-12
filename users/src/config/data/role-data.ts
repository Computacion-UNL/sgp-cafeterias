import { Roles } from "@cafetho/shared";
import { RolModel } from "../../models";

const roleData = [
  {
    name: Roles.admin,
    status: true,
  },
  {
    name: Roles.chef,
    status: true,
  },
  {
    name: Roles.client,
    status: true,
  },
  {
    name: Roles.waiter,
    status: true,
  },
];

export const insertRoles = async () => {
  console.log("inserting roles");
  const rolesToInsert = roleData.map((rol) =>
    RolModel.findOneAndUpdate({ name: rol.name }, rol, { upsert: true })
  );
  await Promise.all(rolesToInsert);
};
