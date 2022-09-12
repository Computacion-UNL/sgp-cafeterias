import { Roles } from "@cafetho/shared/build/types";
import { Toolbar } from "@components/elements";
import { Dashboard } from "@components/layouts/Dashboard";
import { SaveCategoryForm } from "@components/pages";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const SaveCategory: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Guardar categoria</title>
      </Head>

      <Toolbar
        title="Nueva Categoría"
        leading="Registro de una nueva categoría."
        button={{
          href: "/admin/categorias",
          icon: <ArrowLeftIcon />,
          title: "Regresar",
        }}
      />

      <div className="card shadow-xl mx-auto max-w-3xl">
        <div className="card-body">
          <SaveCategoryForm />
        </div>
      </div>
    </>
  );
};

SaveCategory.getLayout = (page: React.ReactElement) => (
  <Dashboard>{page}</Dashboard>
);

SaveCategory.auth = {
  roles: [Roles.admin, Roles.waiter],
};

export default SaveCategory;
