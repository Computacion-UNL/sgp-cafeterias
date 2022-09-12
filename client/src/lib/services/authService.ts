import { httpClient } from "@lib/helpers";
import { AuthModel } from "@types";

export const AuthService = {
  signin: (values: AuthModel.SigninValues) =>
    httpClient.post("/api/users/signin", values),
  signup: (values: AuthModel.SignupValues) =>
    httpClient.post("/api/users/signup", values),
  signout: () => httpClient.post("/api/users/logout"),
  recoveryPassword: (values: AuthModel.RecoveryPasswordValues) =>
    httpClient.post("/api/users/password/recovery", values),
  changePass: (values: AuthModel.ChangePasswordValues, id: string) =>
    httpClient.put(`/api/users/change-pass/${id}`, values),
  updatePassword: (values: AuthModel.UpdatePasswordValues, token: string) =>
    httpClient.post(`/api/users/password/update/${token}`, values),
};
