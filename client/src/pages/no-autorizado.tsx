import { DefaultLayout, NextLink } from "@components";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const NotAuthorized: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>No autorizado</title>
      </Head>

      <div className="hero bg-white">
        <div className="hero-content flex-col text-center px-40 py-20 rounded-md shadow-xl">
          <h1 className="font-bold text-primary text-9xl">401</h1>

          <h6 className="mb-2 text-2xl font-bold text-neutral-focus md:text-3xl">
            <span className="text-error">¡Oops!</span> No autorizado
          </h6>

          <p className="mb-8 text-neutral md:text-lg">
            No posees los permisos necesarios para acceder a esta página.
          </p>

          <NextLink href="/">
            <a className="btn btn-primary">Ir a la página principal</a>
          </NextLink>
        </div>
      </div>
    </>
  );
};

NotAuthorized.getLayout = (page: React.ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default NotAuthorized;
