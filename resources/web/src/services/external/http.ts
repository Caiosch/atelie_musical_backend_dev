import { createStandaloneToast, TabList } from "@chakra-ui/react";
import axios, { AxiosInstance, AxiosResponse } from "axios";

const toast = createStandaloneToast({
  defaultOptions: {
    position: "bottom-right",
    isClosable: true,
  },
});

const statusCodeErrors = {
  422: {
    title: "Dados incorretos",
    description: "Preencha o formulário e tente novamente...",
  },
  500: {
    title: "Erro de Servidor",
    description: "Aguarde alguns instantes e tente novamente...",
  },
  400: {
    title: "Erro de Requisição",
    description: "Corrija os dados e tente novamente...",
  },
};

export class HttpClient {
  private client: AxiosInstance;
  constructor(private baseUrl?: string) {
    this.client = axios.create({
      baseURL: baseUrl,
    });
  }

  public async send<T = any>(
    url: string,
    props?: Omit<HttpClient.SendProps, "url">
  ) {
    console.log({
      url,
      ...props,
    });
    const { method = "get", body, qs } = props || {};
    return this.client
      .request({
        url,
        method,
        data: body,
        params: qs,
      })
      .then((res) => {
        this.onSuccess(res);
        // Intercept response
        return this.toResponse<T>(res);
      })
      .catch((error) => {
        this.onError(error);
        // Intercept error
        return Promise.reject(error);
      });
  }

  public onSuccess(res: AxiosResponse<any>) {
    const statusRenderMessage = [200, 201];

    if (
      statusRenderMessage.includes(res.status) &&
      res.config.method &&
      ["post", "put"].includes(res.config.method) &&
      res.data.title &&
      res.data.message
    ) {
      toast.toast({
        title: `${res.data.title}`,
        description: `${res.data.message}`,
        status: "success",
      });
    }
  }

  public onError(error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const data: any = error.response.data || {};
        const statusError =
          // @ts-ignore
          statusCodeErrors?.[error.response.status] || undefined;

        toast.toast({
          title: `${data.title || statusError?.title || "Erro"}`,
          description: `${
            data.message ||
            statusError?.message ||
            "Tente novamente mais tarde..."
          }`,
          status: "error",
        });
      }
    } else {
      toast.toast({
        title: `Erro de Cliente & Servidor`,
        description: `${error?.message || "Tente novamente mais tarde..."}`,
      });
    }
  }

  public setToken(token: string) {
    // @ts-ignore
    this.client.defaults.headers.Authorization = `Bearer ${token}`;
  }

  private toResponse<T>(res: AxiosResponse): HttpClient.Response<T> {
    return {
      statusCode: res.status,
      body: res.data,
      headers: res.headers,
    };
  }
}

export namespace HttpClient {
  export interface SendProps {
    url: string;
    method?: string;
    body?: any;
    qs?: any;
  }

  export interface Response<B = any> {
    statusCode: number;
    body: B;
    headers?: Record<string, string>;
  }
}
