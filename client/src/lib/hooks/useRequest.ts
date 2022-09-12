import { ErrorModel } from "@types";
import { useState } from "react";

interface Props<Response, Properties extends any[], Values> {
  request: (...args: Properties) => Promise<Response>;
  onSuccess?: (response: Response) => void;
  onError?: (err: ErrorModel.Response<Values>) => void;
}

export const useRequest = <
  Response,
  Properties extends any[],
  Values = Properties[0]
>(
  props: Props<Response, Properties, Values>
) => {
  const [error, setError] = useState<ErrorModel.Response<Values>>();
  const [response, setResponse] = useState<Response>();
  const [loading, setLoading] = useState(false);

  const doRequest = async (...args: Parameters<typeof props.request>) => {
    try {
      setLoading(true);
      setError(undefined);
      setResponse(undefined);
      const resp = await props.request(...args);
      setLoading(false);
      setResponse(resp);
      if (props.onSuccess) props.onSuccess(resp);
    } catch (err) {
      setLoading(false);
      setError(err as ErrorModel.Response<Values>);
      if (props.onError) props.onError(err as ErrorModel.Response<Values>);
    }
  };

  return { doRequest, error, response, loading };
};
