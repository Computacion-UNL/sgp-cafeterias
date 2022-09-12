import { UserModel } from "./User";

declare namespace AuthModel {
  /**
   * Payload values
   */

  export type SigninValues = {
    email: string;
    password: string;
  };

  export type SignupValues = {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    rol: string;
    dni: string;
  };

  export type RecoveryPasswordValues = {
    email: string;
  };

  export type ChangePasswordValues = {
    password: string;
  };

  export type UpdatePasswordValues = {
    password: string;
  };

  /**
   * Responses
   */
  export interface SigninResponse extends UserModel.Response {}

  export interface SignupResponse extends UserModel.Response {}

  export interface RecoveryPasswordResponse {}

  export interface ChangePasswordResponse {}

  export interface CurrentUserResponse {
    currentUser: CurrentUser | null;
  }
  export interface CurrentUser extends UserModel.Response {
    iat?: number;
  }
}

export { AuthModel };
