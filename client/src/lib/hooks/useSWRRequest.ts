import { httpClient } from "@lib/helpers";
import { ErrorModel } from "@types";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import useSWR, { SWRConfiguration, SWRResponse } from "swr";

export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    "isValidating" | "error" | "mutate"
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
  loading: boolean;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    "fallbackData"
  > {
  fallbackData?: Data;
}

export const useSWRRequest = <Data = unknown, Error = ErrorModel.Response>(
  request: GetRequest,
  { fallbackData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> => {
  const {
    data: response,
    error,
    isValidating,
    mutate,
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    request && JSON.stringify(request),
    /**
     * NOTE: Typescript thinks `request` can be `null` here, but the fetcher
     * function is actually only called by `useSWR` when it isn't.
     */
    // eslint-disable-next-line
    () => httpClient.request<Data>(request!),
    {
      ...config,
      ...(fallbackData && {
        fallbackData: {
          status: 200,
          statusText: "InitialData",
          // eslint-disable-next-line
          config: request!,
          headers: {},
          data: fallbackData,
        },
      }),
    }
  );

  return {
    data: response && response.data,
    response,
    loading: !error && !response,
    error,
    isValidating,
    mutate,
  };
};

export interface SWRParams<Data> {
  config?: Config<Data, ErrorModel.Response>;
  request?: GetRequest;
}
