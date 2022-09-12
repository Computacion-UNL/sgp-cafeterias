import { Roles } from "@cafetho/shared/build/types";
import { Toolbar } from "@components/elements";
import { Dashboard } from "@components/layouts/Dashboard";
import { CategoryTable } from "@components/pages";
import { PlusIcon } from "@heroicons/react/outline";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const AllCategories: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Categorias</title>
      </Head>
      <Toolbar
        title="Categorías"
        leading="Categorías registradas"
        button={{
          href: "/admin/guardar-categoria",
          icon: <PlusIcon />,
          title: "Registrar Categoría",
        }}
      />

      <CategoryTable />
    </>
  );
};

AllCategories.getLayout = (page: React.ReactElement) => (
  <Dashboard>{page}</Dashboard>
);

AllCategories.auth = {
  roles: [Roles.admin, Roles.waiter],
};

export default AllCategories;
