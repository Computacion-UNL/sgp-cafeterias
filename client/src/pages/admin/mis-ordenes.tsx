import { Roles } from "@cafetho/shared/build/types";
import { Dashboard, OrderTable, Toolbar } from "@components";
import { HeartIcon } from "@heroicons/react/solid";
import { useAuthContext } from "@lib";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const MyOrders: NextPageWithLayout = () => {
  const { currentUser } = useAuthContext();

  return (
    <>
      <Head>
        <title>Mis órdenes</title>
      </Head>

      <Toolbar
        title="Mis órdenes"
        leading="Lista de mis órdenes realizadas."
        button={{
          href: "/",
          icon: <HeartIcon />,
          title: "Nueva orden",
        }}
      />

      <OrderTable user={currentUser!.id} />
    </>
  );
};

MyOrders.getLayout = (page: React.ReactElement) => (
  <Dashboard>{page}</Dashboard>
);

MyOrders.auth = { roles: Object.values(Roles) };

export default MyOrders;
