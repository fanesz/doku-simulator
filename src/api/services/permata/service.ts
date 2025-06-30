import API from "../..";
import { PermataInquiryRequest, PermataPaymentRequest } from "./interfaces";

export default class PermataService {
  private api: API = new API();

  async inquiry(endpoint: string, data: PermataInquiryRequest) {
    this.api.setHeaders({
      "x-warp-api-key": "Jsm7Ih0yY0MUbZw2uugr",
      "x-warp-session-token": "172qyo-ihcx4tmbubgclj14ztanxf",
    })
    const res = await this.api.POST(endpoint.slice(0, -2) + "/inquiry", data);
    return res;
  }

  async payment(endpoint: string, data: PermataPaymentRequest) {
    const res = await this.api.POST(endpoint.slice(0, -2) + "/notify", data);
    return res;
  }
}
