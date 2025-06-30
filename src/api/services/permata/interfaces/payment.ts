export interface PermataPaymentRequest {
  PAYMENTDATETIME: string;
  PURCHASECURRENCY: string;
  LIABILITY: string;
  PAYMENTCHANNEL: string;
  AMOUNT: string;
  PAYMENTCODE: string;
  MCN: string;
  WORDS: string;
  RESULTMSG: string;
  VERIFYID: string;
  TRANSIDMERCHANT: string;
  BANK: string;
  STATUSTYPE: string;
  APPROVALCODE: string;
  EDUSTATUS: string;
  THREEDSECURESTATUS?: string;
  VERIFYSCORE?: string;
  CURRENCY?: string;
  RESPONSECODE?: string;
  VERIFYSTATUS?: string;
  SESSIONID?: string;
}