import axios from "axios";
import { GetServerSidePropsContext, NextPageContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { httpClient } from ".";

const buildClient = (
  ctx: NextPageContext | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  if (typeof window === "undefined") {
    // We are on the server
    // Request should be made to ingress-nginx
    // "http://SERVICENAME.NAMESPACE.svc,cluster.local"
    // TODO: Change BaseURL for production
    const instance = axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: ctx.req?.headers as any,
    });

    return instance;
  } else {
    // We are on the client
    return httpClient;
  }
};

export { buildClient };
