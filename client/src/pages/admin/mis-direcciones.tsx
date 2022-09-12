import { Roles } from "@cafetho/shared/build/types";
import { AddressTable, Dashboard, Toolbar } from "@components";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const AllAddress: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Mis direcciones</title>
      </Head>

      <Toolbar
        title="Mis direcciones"
        leading="Lista de mis direcciones registradas."
        button={{
          href: "/admin/guardar-direccion",
          icon: <LocationMarkerIcon />,
          title: "Registrar dirección",
        }}
      />

      <AddressTable />
    </>
  );
};

AllAddress.getLayout = (page: React.ReactElement) => (
  <Dashboard>{page}</Dashboard>
);

AllAddress.auth = {
  roles: Object.values(Roles),
};

export default AllAddress;
