import { AuthModel } from "@types/models";
import { NextPageWithLayout } from "next";
import { AppProps } from "next/app";

declare namespace App {
  export type Props = AppProps & {
    Component: NextPageWithLayout;
    currentUser: AuthModel.CurrentUserResponse["currentUser"];
  };
}

export { App };
