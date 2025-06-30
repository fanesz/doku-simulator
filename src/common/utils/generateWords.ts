import { dokuConfig } from "@config/doku";
import { PermataPaymentRequest } from "@services/permata/interfaces";
import CryptoJS from "crypto-js";

export const generateInquiryWords = (paymentCode: string): string => {
  const concatenatedString = `${dokuConfig.MALL_ID}${dokuConfig.SHARED_KEY}${paymentCode}`;
  return CryptoJS.SHA1(concatenatedString).toString();
};

export const generatePaymentWords = (params: Partial<PermataPaymentRequest>): string => {
  const concatenatedString = `${params.AMOUNT}${dokuConfig.MALL_ID}${dokuConfig.SHARED_KEY}${params.TRANSIDMERCHANT}${params.RESULTMSG}${params.VERIFYSTATUS}`;
  return CryptoJS.SHA1(concatenatedString).toString();
};