import { Roles } from "@cafetho/shared/build/types";
import { Dashboard, SaveUserForm, Toolbar } from "@components";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { GetRequest } from "@lib";
import { FallbackModel } from "@types";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";
import { SWRConfig } from "swr";

const SaveUser: NextPageWithLayout<FallbackModel.Values> = ({ fallback }) => {
  return (
    <>
      <Head>
        <title>Guardar Usuario</title>
      </Head>

      <Toolbar
        title="Nueva Cuenta de Usuario"
        leading="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, earum."
        button={{
          href: "/admin/usuarios",
          icon: <ArrowLeftIcon />,
          title: "Regresar",
        }}
      />

      <SWRConfig value={{ fallback, revalidateOnFocus: false }}>
        <div className="card shadow-xl mx-auto max-w-3xl">
          <div className="card-body">
            <SaveUserForm />
          </div>
        </div>
      </SWRConfig>
    </>
  );
};

SaveUser.getLayout = (page: React.ReactElement) => (
  <Dashboard>{page}</Dashboard>
);

SaveUser.getInitialProps = async (ctx) => {
  const request: GetRequest = { url: "/api/users/roles" };

  const { data } = await ctx.client.request(request);

  return {
    fallback: { [JSON.stringify(request)]: { data } },
  };
};

SaveUser.auth = { roles: [Roles.admin] };

export default SaveUser;
