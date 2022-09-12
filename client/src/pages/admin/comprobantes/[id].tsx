import { Roles } from "@cafetho/shared/build/types";
import { Dashboard, Toolbar } from "@components";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { NextPageWithLayout } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import { SWRConfig } from "swr";

const ReceiptDetail = dynamic(
  () => import("@components/pages/Receipt/ReceiptDetail"),
  { ssr: false }
);

const Receipt: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Detalles del comprobante de pago</title>
      </Head>

      <Toolbar
        title="Comprobante de pago"
        leading="Detalles del comprobante de pago"
        button={{
          href: "/admin/comprobantes",
          icon: <ArrowLeftIcon />,
          title: "Regresar",
        }}
      />

      <SWRConfig value={{ revalidateOnFocus: false }}>
        <ReceiptDetail />
      </SWRConfig>
    </>
  );
};

Receipt.getLayout = (page: React.ReactElement) => <Dashboard>{page}</Dashboard>;

Receipt.auth = {
  roles: [Roles.admin, Roles.waiter],
};

export default Receipt;
