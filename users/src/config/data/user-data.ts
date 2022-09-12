import { Roles } from "@cafetho/shared";
import { Entity, EntityModel, RolModel, User, UserModel } from "../../models";

const entityData: Partial<Entity> = {
  dni: "9999999999",
  firstname: "Administrador",
  lastname: "Principal",
  principal: true,
};

const userData: Partial<User> = {
  email: "admin@localhost.com",
  password: "Password-123",
  status: true,
};

export const insertUser = async () => {
  console.log("Inserting admin");
  const user = await UserModel.findOne({ email: userData.email });

  if (!user) {
    const adminRole = await RolModel.findOne({ name: Roles.admin });
    if (!adminRole) throw new Error("Role not found");

    const newUser = new UserModel({ ...userData, rol: adminRole.id });
    const entity = new EntityModel({ ...entityData, user: newUser.id });
    newUser.set({ entity: entity.id });
    await entity.save();
    await newUser.save();
  }
};
