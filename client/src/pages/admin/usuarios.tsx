import { Roles } from "@cafetho/shared/build/types";
import { Dashboard, Toolbar, UserTable } from "@components";
import { UserAddIcon } from "@heroicons/react/outline";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const AllUsers: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Usuarios</title>
      </Head>

      <Toolbar
        title="Usuarios"
        leading="Lista de usuarios registrados."
        button={{
          href: "/admin/guardar-usuario",
          icon: <UserAddIcon />,
          title: "Registrar usuario",
        }}
      />

      <UserTable />
    </>
  );
};

AllUsers.getLayout = (page: React.ReactElement) => (
  <Dashboard>{page}</Dashboard>
);

AllUsers.auth = { roles: [Roles.admin] };

export default AllUsers;
