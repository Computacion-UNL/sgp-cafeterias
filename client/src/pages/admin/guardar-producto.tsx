import { Roles } from "@cafetho/shared/build/types";
import { Dashboard, SaveProductForm, Toolbar } from "@components";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const SaveProduct: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Guardar Producto</title>
      </Head>

      <Toolbar
        title="Guardar Producto"
        leading="Registro de un nuevo producto."
        button={{
          href: "/admin/productos",
          icon: <ArrowLeftIcon />,
          title: "Regresar",
        }}
      />

      <div className="card shadow-xl mx-auto max-w-3xl">
        <div className="card-body">
          <SaveProductForm />
        </div>
      </div>
    </>
  );
};

SaveProduct.getLayout = (page: React.ReactElement) => (
  <Dashboard>{page}</Dashboard>
);

SaveProduct.auth = { roles: [Roles.admin, Roles.waiter] };

export default SaveProduct;
