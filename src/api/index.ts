/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

type Headers = {
  Accept: string;
  "Content-type": string;
  "x-warp-api-key"?: string;
  "x-warp-session-token"?: string;
};

export default class API {
  headers: Headers = {
    Accept: "application/json",
    "Content-type": "application/json",
  };
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      headers: this.headers as unknown as AxiosHeaders,
      httpsAgent: false,
    } as AxiosRequestConfig);
  }

  setHeaders(headers: Partial<Headers>): void {
    this.headers = {
      ...this.headers,
      ...headers,
    };
  }

  async POST<T>(path: string, data: any): Promise<AxiosResponse<T>> {
    try {
      const res = await this.api.post(path, data);
      return res;
    } catch (err: AxiosError | any) {
      return err;
    }
  }
}
