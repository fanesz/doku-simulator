import { PaymentFormData } from "@states/payment/interface";
import useEndpointStore from "@states/selectedEndpoint/store";
import PermataService from "@services/permata/service";
import usePaymentStore from "@states/payment/store";
import { PermataPaymentRequest } from "@services/permata/interfaces";
import moment from "moment";

interface UsePaymentReturn {
  formData: PaymentFormData;
  handleInputChange: (field: keyof PaymentFormData, value: string) => void;
  handleSubmit: () => void;
  handleClear: () => void;
  handlePasteInput: (field: keyof PaymentFormData) => Promise<void>;
}

const usePayment = (): UsePaymentReturn => {
  const { value } = useEndpointStore();
  const permataService = new PermataService();
  const {
    formData,
    handleInput,
    clearFormData,
    handlePaste,
    setResult,
  } = usePaymentStore();

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    handleInput(field, value);
  };

  const handleClear = () => {
    clearFormData();
  };

  const handlePasteInput = async (field: keyof PaymentFormData) => {
    handlePaste(field);
  };

  const handleSubmit = () => {
    if (!formData.virtualAccountNumber) {
      console.log("Virtual Account Number is required");
      return;
    }

    setResult(null);

    const payload: PermataPaymentRequest = {
      PAYMENTDATETIME: moment(formData.date).format("YYYYMMDDHHmmss"),
      PURCHASECURRENCY: formData.currency || "360",
      LIABILITY: "",
      PAYMENTCHANNEL: formData.channelCode || "36",
      AMOUNT: formData.amount || "0",
      PAYMENTCODE: formData.virtualAccountNumber,
      MCN: formData.virtualAccountNumber,
      WORDS: "542da90edc6752a4a9f2ac570d38c49314a95b88",
      RESULTMSG: "SUCCESS",
      VERIFYID: "",
      TRANSIDMERCHANT: "mkJl6FWKOGI1",
      BANK: "PERMATA",
      STATUSTYPE: "P",
      APPROVALCODE: "123123",
      EDUSTATUS: "NA",
      THREEDSECURESTATUS: "",
      VERIFYSCORE: "-1",
      CURRENCY: formData.currency || "360",
      RESPONSECODE: "0000",
      VERIFYSTATUS: "NA",
      SESSIONID: "tIzk3szs0wb02aVvCR52",
    };
    permataService.payment(value, payload).then((res) => {
      usePaymentStore.getState().setResult(res);
    });
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    handleClear,
    handlePasteInput,
  };
};

export default usePayment;
