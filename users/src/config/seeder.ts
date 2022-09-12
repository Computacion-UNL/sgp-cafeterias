import { insertPrivileges } from "./data/privileges-data";
import { insertRoles } from "./data/role-data";
import { insertUser } from "./data/user-data";

export const seeder = async () => {
  try {
    await insertRoles();
    await insertPrivileges();
    await insertUser();
  } catch (error) {
    console.error(error);
  }
};
