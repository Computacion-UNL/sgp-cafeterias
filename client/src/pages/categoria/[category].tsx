import { Dashboard, ProductScroll, Toolbar } from "@components";
import { getPaginationRequest } from "@lib";
import { FallbackModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";
import { SWRConfig } from "swr";

const Home: NextPageWithLayout<FallbackModel.Values> = ({ fallback }) => {
  return (
    <>
      <Head>
        <title>Cafetho</title>
      </Head>

      <Toolbar title="Menú" leading="Lista de productos" />

      <SWRConfig value={{ fallback, revalidateOnFocus: false }}>
        <ProductScroll />
      </SWRConfig>
    </>
  );
};

Home.getLayout = (page: React.ReactElement) => <Dashboard>{page}</Dashboard>;

Home.getInitialProps = async (ctx) => {
  const { category, ...rest } = ctx.query;
  ctx.query = rest;

  const productRequest = getPaginationRequest("/api/products", {
    ctx,
    paginationParams: { sort: { createdAt: "desc" }, limit: 20 },
    initialParams: { status: true, category: category },
    searchKeys: ["name"],
  });
  const products = await ctx.client.request(productRequest);

  return {
    fallback: { [JSON.stringify(productRequest)]: { data: products.data } },
  };
};
export default Home;
