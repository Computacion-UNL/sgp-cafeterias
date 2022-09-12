import { permissionData } from "@cafetho/shared";
import { PrivilegeModel, RolModel } from "../../models";

export const insertPrivileges = async () => {
  console.log("Inserting privileges");
  const permissionsToInsert = permissionData.map(async (permission) => {
    const roles = await RolModel.find({
      name: { $in: permission.roles },
    }).distinct("_id");
    return PrivilegeModel.findOneAndUpdate(
      { name: permission.name },
      { ...permission, roles },
      { upsert: true }
    );
  });
  await Promise.all(permissionsToInsert);
};
