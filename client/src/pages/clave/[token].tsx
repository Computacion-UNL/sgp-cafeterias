import { ChangePasswordForm, DefaultLayout, NextLink } from "@components";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import { ReactElement } from "react";

const ChangePassword: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Cambiar Clave</title>
      </Head>

      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Cambiar Clave</h1>

        <p className="py-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          voluptatibus!
        </p>

        <NextLink href={"/ingresar"} passHref>
          <a className="btn btn-outline btn-primary mr-2">Ingresar</a>
        </NextLink>

        <NextLink href={"/registrar"} passHref>
          <a className="btn btn-outline btn-primary">Crear cuenta</a>
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

          <ChangePasswordForm />
        </div>
      </div>
    </>
  );
};

ChangePassword.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default ChangePassword;
