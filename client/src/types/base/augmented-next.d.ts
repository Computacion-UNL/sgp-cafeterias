import { Roles } from "@cafetho/shared";
import { AxiosInstance } from "axios";
import "next";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { AuthModel } from "../models";

declare module "next" {
  export interface NextPageContext {
    client: AxiosInstance;
    currentUser: AuthModel.CurrentUserResponse["currentUser"];
  }

  export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
    auth?: {
      roles: Roles[];
    };
  };
}
