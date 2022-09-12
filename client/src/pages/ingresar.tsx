import { DefaultLayout, NextLink, SigninForm } from "@components";
import { GetServerSideProps, NextPageWithLayout } from "next";
import Head from "next/head";
import React from "react";

const Signin: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Iniciar sesión</title>
      </Head>

      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Iniciar Sesión</h1>

        <p className="py-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          voluptatibus!
        </p>

        <NextLink href={"/registrar"} passHref>
          <button className="btn btn-outline btn-primary mr-2">
            Crear cuenta
          </button>
        </NextLink>

        <NextLink href={"/recuperar-clave"} passHref>
          <button className="btn btn-outline btn-primary">
            Recuperar Clave
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

          <SigninForm />
        </div>
      </div>
    </>
  );
};

Signin.getLayout = (page: React.ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = req.cookies.session;

  const { returnUrl = "/" } = query;
  if (session) {
    console.log("session", session);
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

export default Signin;
