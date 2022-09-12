import { Dashboard, OrderSumary, ProductList, Toolbar } from "@components";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const MyOrder: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Mi orden</title>
      </Head>

      <Toolbar title="Mi orden" leading="Detalles de orden" />

      <div className="flex flex-col lg:flex-row shadow-md my-10">
        <ProductList />
        <OrderSumary />
      </div>
    </>
  );
};

MyOrder.getLayout = (page: React.ReactElement) => <Dashboard>{page}</Dashboard>;

export default MyOrder;
