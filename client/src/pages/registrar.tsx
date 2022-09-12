import { DefaultLayout, NextLink, SignupForm } from "@components";
import { GetServerSideProps, NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const Signup: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Registrar cuenta</title>
      </Head>

      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Crear una cuenta</h1>

        <p className="py-6">
          Forma parte de nuestra familia, registra tu cuenta y agiliza tus
          pedidos.
        </p>

        <NextLink href={"/ingresar"} passHref>
          <button className="btn btn-outline btn-primary">
            Iniciar sesión
          </button>
        </NextLink>
      </div>

      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <NextLink href="/">
            <img
              className="mx-auto h-12 w-auto cursor-pointer mb-4"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
          </NextLink>

          <SignupForm />
        </div>
      </div>
    </>
  );
};

Signup.getLayout = (page: React.ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = req.cookies.session;

  const { returnUrl = "/" } = query;
  if (session) {
    return {
      redirect: {
        destination: returnUrl.toString(),
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Signup;
