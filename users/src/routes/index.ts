import { Express } from "express";
import { allAddressRouter } from "./allAddress";
import { allEntityRouter } from "./allEntity";
import { allRolesRouter } from "./allRoles";
import { allUserRouter } from "./allUser";
import { changePasswordRouter } from "./changePassword";
import { changeStatusUserRouter } from "./changeStatusUser";
import { currentPermissionsRouter } from "./current-permissions";
import { currentUserRouter } from "./currentUser";
import { logoutRouter } from "./logout";
import { recoveryPasswordRouter } from "./recoveryPassword";
import { saveRouter } from "./saveAddress";
import { saveUserRouter } from "./saveUser";
import { signinRouter } from "./signin";
import { signupRouter } from "./signup";
import { updateRouter } from "./updateAddress";
import { updatePasswordRouter } from "./updatePassword";
import { updateUserRouter } from "./updateUser";

const usersURI = "/api/users";
const addressURI = "/api/users/address";
const rolesURI = "/api/users/roles";
export const routes = (app: Express) => {
  //User routes
  app.use(usersURI, allUserRouter);
  app.use(usersURI, allEntityRouter);
  app.use(usersURI, signupRouter);
  app.use(usersURI, signinRouter);
  app.use(usersURI, currentUserRouter);
  app.use(usersURI, logoutRouter);
  app.use(usersURI, saveUserRouter);
  app.use(usersURI, updateUserRouter);
  app.use(usersURI, changeStatusUserRouter);
  app.use(usersURI, changePasswordRouter);
  app.use(usersURI, currentPermissionsRouter);
  app.use(usersURI, recoveryPasswordRouter);
  app.use(usersURI, updatePasswordRouter);

  //Address routes
  app.use(addressURI, allAddressRouter);
  app.use(addressURI, saveRouter);
  app.use(addressURI, updateRouter);

  //Roles routes
  app.use(rolesURI, allRolesRouter);
};
