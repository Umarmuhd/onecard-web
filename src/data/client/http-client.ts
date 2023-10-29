import { ConfigValue } from "@/config";
import invariant from "tiny-invariant";
import axios from "axios";

invariant(
  ConfigValue.REST_API_URL,
  "REST_API_URL is not defined, please define it in your config file"
);
// TODO: Due to windows timeout was set to 15000
const Axios = axios.create({
  baseURL: ConfigValue.REST_API_URL,
  timeout: 150000000,
  headers: {
    "Content-Type": "application/json",
  },
});
// Change request data/error here
Axios.interceptors.request.use(
  async (config) => {
    // const session = await getSession();

    // const token = session?.access_token;
    const token = "";

    config.headers.Authorization = `Bearer ${token ? token : ""}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      // (error.response && error.response.status === 403) ||
      (error.response && error.response.data.message === "ERROR.NOT_AUTHORIZED")
    ) {
      // signOut({ callbackUrl: Routes.auth.login });
    }
    return Promise.reject(error);
  }
);

// function formatBooleanSearchParam(key: string, value: boolean) {
//   return value ? `${key}:1` : `${key}:`;
// }

// interface SearchParamOptions {
//   categories: string;
//   code: string;
//   type: string;
//   name: string;
//   shop_id: string;
//   is_approved: boolean;
//   tracking_number: string;
// }

export class HttpClient {
  static async get<T>(url: string, params?: unknown) {
    const response = await Axios.get<T>(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const response = await Axios.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await Axios.put<T>(url, data);
    return response.data;
  }

  static async delete<T>(url: string) {
    const response = await Axios.delete<T>(url);
    return response.data;
  }

  // static formatSearchParams(params: Partial<SearchParamOptions>) {
  //   return Object.entries(params)
  //     .filter(([, value]) => Boolean(value))
  //     .map(([k, v]) =>
  //       ["type", "categories", "tags", "author", "manufacturer"].includes(k)
  //         ? `${k}.slug:${v}`
  //         : ["is_approved"].includes(k)
  //         ? formatBooleanSearchParam(k, v as boolean)
  //         : `${k}:${v}`
  //     )
  //     .join(";");
  // }
}

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data.message;
  }
  return (error as Error).message;
}

export function getFieldErrors(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data.errors;
  }
  return null;
}
