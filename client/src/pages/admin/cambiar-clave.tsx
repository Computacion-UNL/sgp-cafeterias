import { Roles } from "@cafetho/shared/build/types";
import { Toolbar } from "@components/elements";
import { Dashboard } from "@components/layouts/Dashboard";
import { ChangePassForm } from "@components/pages";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const ChangePassword: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Cambiar clave</title>
      </Head>

      <Toolbar title="Cambiar clave" leading="Cambiar clave de usuario" />

      <div className="card shadow-xl mx-auto max-w-3xl">
        <div className="card-body">
          <ChangePassForm />
        </div>
      </div>
    </>
  );
};

ChangePassword.getLayout = (page: React.ReactElement) => (
  <Dashboard>{page}</Dashboard>
);

ChangePassword.auth = {
  roles: Object.values(Roles),
};

export default ChangePassword;
