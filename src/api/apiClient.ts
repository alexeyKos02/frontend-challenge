import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const apiClient: AxiosInstance = axios.create();

apiClient.interceptors.request.use(
  (config) => {
    const baseApiUrl = "https://api.thecatapi.com/v1";
    const apiKey =
      "live_rC9ZEH5kiELqBg2epvnKxkbRnN9EKPND91L8mfKHPjjLENrNvA6aQHd5nRv0uC7a";
    config.baseURL = baseApiUrl;
    config.params = {
      ...config.params,
      api_key: apiKey,
    };

    console.info("API Base URL:", baseApiUrl);
    console.info("API Key:", apiKey);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

type RequestParams = Record<string, unknown>;
type RequestBody = Record<string, unknown>;

export const request = async <T>(
  method: "get" | "post" | "put",
  url: string,
  params?: RequestParams,
  data?: RequestBody,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await apiClient.request<T>({
    method,
    url,
    params,
    data,
    ...config,
  });
  return response;
};
