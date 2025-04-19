import axios, { AxiosRequestConfig } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {

      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (axiosError: any) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };
