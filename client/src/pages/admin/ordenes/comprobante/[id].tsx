import { Roles } from "@cafetho/shared/build/types";
import {
  Dashboard,
  OrderDetail,
  OrderReceiptForm,
  ProductReceiptList,
  SelectableProductOrderTable,
  Toolbar,
  UserSearch,
} from "@components";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import {
  getPaginationRequest,
  GetRequest,
  productReceiptListState,
  receiptCustomerState,
} from "@lib";
import { FallbackModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import { SWRConfig } from "swr";

const OrderReceipt: NextPageWithLayout<FallbackModel.Values> = ({
  fallback,
}) => {
  const resetProductReceiptList = useResetRecoilState(productReceiptListState);
  const resetReceiptCustomer = useResetRecoilState(receiptCustomerState);

  useEffect(() => {
    return () => {
      resetProductReceiptList();
      resetReceiptCustomer();
    };
  }, [resetProductReceiptList, resetReceiptCustomer]);

  return (
    <>
      <Head>
        <title>Generar Comprobante</title>
      </Head>

      <Toolbar
        title="Generar Comprobante"
        leading="Generación de comprobante para una orden registrada"
        button={{
          href: "/admin/ordenes",
          icon: <ArrowLeftIcon />,
          title: "Regresar",
        }}
      />

      <SWRConfig value={{ fallback, revalidateOnFocus: false }}>
        <OrderDetail />
        <SelectableProductOrderTable />

        <div className="flex flex-col xl:flex-row gap-4 xl:items-start">
          <div className="mx-auto w-full lg:w-3/4 lg:mx-auto xl:w-2/4">
            <UserSearch />
            <OrderReceiptForm />
          </div>
          <ProductReceiptList />
        </div>
      </SWRConfig>
    </>
  );
};

OrderReceipt.getLayout = (page: React.ReactElement) => (
  <Dashboard>{page}</Dashboard>
);

OrderReceipt.getInitialProps = async (ctx) => {
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

  const countProductReceiptRequest: GetRequest = {
    url: `/api/orders/product-receipt/${id}`,
  };

  const [order, orderItems, countProductReceipt] = await Promise.all([
    ctx.client.request(orderRequest),
    ctx.client.request(productOrderRequest),
    ctx.client.request(countProductReceiptRequest),
  ]);

  return {
    fallback: {
      [JSON.stringify(orderRequest)]: { data: order.data },
      [JSON.stringify(productOrderRequest)]: { data: orderItems.data },
      [JSON.stringify(countProductReceiptRequest)]: {
        data: countProductReceipt.data,
      },
    },
  };
};

OrderReceipt.auth = { roles: [Roles.admin, Roles.waiter] };

export default OrderReceipt;
