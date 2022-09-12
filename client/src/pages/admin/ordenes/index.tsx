import { Roles } from "@cafetho/shared/build/types";
import { Dashboard, OrderTable, Toolbar } from "@components";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const AllOrders: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Órdenes</title>
      </Head>

      <Toolbar title="Órdenes" leading="Lista de órdenes registradas." />

      <OrderTable />
    </>
  );
};

AllOrders.getLayout = (page: React.ReactElement) => (
  <Dashboard>{page}</Dashboard>
);

AllOrders.auth = {
  roles: [Roles.admin, Roles.chef, Roles.waiter],
};

export default AllOrders;
