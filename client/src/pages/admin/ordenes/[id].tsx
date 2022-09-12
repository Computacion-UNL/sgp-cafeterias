import { Roles } from "@cafetho/shared/build/types";
import {
  Dashboard,
  OrderDetail,
  ProductOrderTable,
  Toolbar,
} from "@components";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { getPaginationRequest, GetRequest, useAuthContext } from "@lib";
import { FallbackModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { SWRConfig } from "swr";

const Order: NextPageWithLayout<FallbackModel.Values> = ({ fallback }) => {
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const returnUrl =
    (router.query.returnUrl as string) ||
    (currentUser!.rol.name === Roles.client
      ? "/admin/mis-ordenes"
      : "/admin/ordenes");

  return (
    <>
      <Head>
        <title>Orden</title>
      </Head>

      <Toolbar
        title="Orden"
        leading="Detalle de orden"
        button={{
          href: returnUrl,
          icon: <ArrowLeftIcon />,
          title: "Regresar",
        }}
      />
      <SWRConfig value={{ fallback, revalidateOnFocus: false }}>
        <OrderDetail updatedStatus />
        <ProductOrderTable />
      </SWRConfig>
    </>
  );
};

Order.getLayout = (page: React.ReactElement) => <Dashboard>{page}</Dashboard>;

Order.getInitialProps = async (ctx) => {
  const { id, ...rest } = ctx.query;
  ctx.query = rest;

  const orderRequest: GetRequest = {
    url: `/api/orders/${id}`,
  };

  const productOrderRequest = getPaginationRequest(`/api/orders/item-order`, {
    ctx,
    initialParams: { order: id },
    paginationParams: { sort: { createdAt: "desc" } },
  });

  const [order, orderItems] = await Promise.all([
    ctx.client.request(orderRequest),
    ctx.client.request(productOrderRequest),
  ]);
  return {
    fallback: {
      [JSON.stringify(orderRequest)]: { data: order.data },
      [JSON.stringify(productOrderRequest)]: { data: orderItems.data },
    },
  };
};

Order.auth = { roles: Object.values(Roles) };

export default Order;
