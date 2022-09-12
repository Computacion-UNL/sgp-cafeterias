import { Authorization } from "@components";
import { AuthContextProvider, buildClient, QueryParamProvider } from "@lib";
import { App, AuthModel } from "@types";
import { AppContext } from "next/app";
import Head from "next/head";
import { Fragment, ReactElement } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";

const contextClass = {
  success: "bg-success",
  error: "bg-error",
  info: "bg-info",
  warning: "bg-warning",
  default: "bg-accent",
  dark: "bg-neutral text-neutral-content",
};

function MyApp(props: App.Props) {
  const { Component, pageProps, currentUser } = props;

  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return (
    <Fragment>
      <Head>
        <title>Cafeterias</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <QueryParamProvider>
        <RecoilRoot>
          <AuthContextProvider currentUser={currentUser}>
            {Component.auth ? (
              <Authorization roles={Component.auth.roles}>
                {getLayout(<Component {...pageProps} />)}
              </Authorization>
            ) : (
              getLayout(<Component {...pageProps} />)
            )}

            <ToastContainer
              toastClassName={(props) =>
                contextClass[props?.type || "default"] +
                " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
              }
              bodyClassName={() => "flex text-sm font-white font-med block p-3"}
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              limit={2}
            />
          </AuthContextProvider>
        </RecoilRoot>
      </QueryParamProvider>
    </Fragment>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get<AuthModel.CurrentUserResponse>(
    "/api/users/currentuser"
  );

  let pageProps = {};
  if (appContext.Component.getInitialProps)
    pageProps = await appContext.Component.getInitialProps({
      ...appContext.ctx,
      client,
      currentUser: data.currentUser,
    });

  return {
    pageProps,
    ...data,
  };
};

export default MyApp;
