import { Roles } from "@cafetho/shared/build/types";
import { Dashboard, ReceiptTable, Toolbar } from "@components";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const AllReceipts: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Comprobantes de pago</title>
      </Head>

      <Toolbar
        title="Comprobantes de pago"
        leading="Lista de comprobantes de pago registrados."
      />

      <ReceiptTable />
    </>
  );
};

AllReceipts.getLayout = (page: React.ReactElement) => (
  <Dashboard>{page}</Dashboard>
);

AllReceipts.auth = {
  roles: [Roles.admin, Roles.waiter],
};

export default AllReceipts;
