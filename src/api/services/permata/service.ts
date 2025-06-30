import API from "../..";
import { PermataInquiryRequest, PermataPaymentRequest } from "./interfaces";

export default class PermataService {
  private api: API = new API();

  async inquiry(endpoint: string, data: PermataInquiryRequest) {
    const res = await this.api.POST(endpoint.slice(0, -2) + "/inquiry", data);
    return res;
  }

  async payment(endpoint: string, data: PermataPaymentRequest) {
    const res = await this.api.POST(endpoint.slice(0, -2) + "/notify", data);
    return res;
  }
}
