import API from "../..";
import { PermataInquiryRequest, PermataPaymentRequest } from "./interfaces";

export default class PermataService {
  private api: API = new API();

  async inquiry(endpoint: string, data: PermataInquiryRequest) {
    const modifiedEndpoint = endpoint.endsWith("/*") ? endpoint.slice(0, -2) + "/inquiry" : endpoint;
    const res = await this.api.POST(modifiedEndpoint, data);
    return res;
  }

  async payment(endpoint: string, data: PermataPaymentRequest) {
    const modifiedEndpoint = endpoint.endsWith("/*") ? endpoint.slice(0, -2) + "/notify" : endpoint;
    const res = await this.api.POST(modifiedEndpoint, data);
    return res;
  }
}
