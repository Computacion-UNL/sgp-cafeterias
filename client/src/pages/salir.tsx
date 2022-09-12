import { DefaultLayout } from "@components";
import {
  AuthService,
  toastErrors,
  useCurrentPermissions,
  useRequest,
} from "@lib";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

const Logout: NextPageWithLayout = () => {
  const router = useRouter();
  const { mutate } = useCurrentPermissions();
  const { doRequest } = useRequest({
    request: AuthService.signout,
    onSuccess: async (res) => {
      await mutate();
      router.push("/");
    },
    onError: (err) => toastErrors(err),
  });

  useEffect(() => {
    doRequest();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Head>
        <title>Cafetho</title>
      </Head>

      <div className="my-6">
        <progress className="progress max-w-5xl" />

        <div className="prose mt-2">
          <h4 className="text-primary font-bold">Cerrando sesión</h4>
          <p>Esperamos verte pronto</p>
        </div>
      </div>
    </>
  );
};

Logout.getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default Logout;
