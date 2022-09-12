import { Roles } from "@cafetho/shared/build/types";
import { Dashboard, ProductTable, Toolbar } from "@components";
import { PlusIcon } from "@heroicons/react/outline";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const AllProducts: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Productos</title>
      </Head>

      <Toolbar
        title="Productos"
        leading="Lista de productos registrados."
        button={{
          href: "/admin/guardar-producto",
          icon: <PlusIcon />,
          title: "Registrar producto",
        }}
      />

      <ProductTable />
    </>
  );
};

AllProducts.getLayout = (page: React.ReactElement) => (
  <Dashboard>{page}</Dashboard>
);

AllProducts.auth = { roles: [Roles.admin, Roles.waiter] };

export default AllProducts;
