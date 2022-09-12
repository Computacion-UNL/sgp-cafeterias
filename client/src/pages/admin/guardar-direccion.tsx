import { Roles } from "@cafetho/shared/build/types";
import { Dashboard, SaveAddressForm, Toolbar } from "@components";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const SaveAddress: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Guardar dirección</title>
      </Head>

      <Toolbar
        title="Nueva Dirección"
        leading="Registro de una nueva dirección."
        button={{
          href: "/admin/mis-direcciones",
          icon: <ArrowLeftIcon />,
          title: "Regresar",
        }}
      />

      <div className="card shadow-xl mx-auto max-w-3xl">
        <div className="card-body">
          <SaveAddressForm />
        </div>
      </div>
    </>
  );
};

SaveAddress.getLayout = (page: React.ReactElement) => (
  <Dashboard>{page}</Dashboard>
);

SaveAddress.auth = {
  roles: Object.values(Roles),
};

export default SaveAddress;
