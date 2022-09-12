import { ErrorModel } from "@types";
import axios, { AxiosError, AxiosResponse } from "axios";

const httpClient = axios.create({ baseURL: "/" });

const responseHandler = (response: AxiosResponse) => {
  return response;
};

const errorHandler = async (error: AxiosError<ErrorModel.Response>) => {
  if (error.response) {
    const { data } = error.response;
    if (typeof data === "string") {
      return Promise.reject({
        errors: [
          {
            message:
              "Ha ocurrido un error inesperado. Por favor vuelva a intentarlo.",
          },
        ],
      } as ErrorModel.Response);
    }
    return Promise.reject(data);
  } else if (error.request) {
    return Promise.reject({
      errors: [
        {
          message:
            "No se ha podido establecer comunicación con el servidor, por favor, vuelva a intentarlo.",
        },
      ],
    } as ErrorModel.Response);
  }

  return Promise.reject({
    errors: [
      {
        message:
          "Ha ocurrido un error inesperado. Por favor vuelva a intentarlo.",
      },
    ],
  } as ErrorModel.Response);
};

httpClient.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export { httpClient };
