import { PaymentFormData } from "@states/payment/interface";
import useEndpointStore from "@states/selectedEndpoint/store";
import PermataService from "@services/permata/service";
import usePaymentStore from "@states/payment/store";
import { PermataPaymentRequest } from "@services/permata/interfaces";
import moment from "moment";
import { generatePaymentWords } from "@utils/generateWords";

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

    const wordsPayload = {
      AMOUNT: formData.amount || "0",
      TRANSIDMERCHANT: formData.transactionId,
      RESULTMSG: "SUCCESS",
      VERIFYSTATUS: "NA",
    }

    const payload: PermataPaymentRequest = {
      PAYMENTDATETIME: formData.date ? formData.date : moment().format("YYYYMMDDHHmmss"),
      PURCHASECURRENCY: formData.currency || "360",
      LIABILITY: "",
      PAYMENTCHANNEL: formData.channelCode || "36",
      PAYMENTCODE: formData.virtualAccountNumber,
      MCN: formData.virtualAccountNumber,
      WORDS: generatePaymentWords(wordsPayload),
      VERIFYID: "",
      BANK: "Permata",
      STATUSTYPE: "P",
      APPROVALCODE: "123123",
      EDUSTATUS: "NA",
      THREEDSECURESTATUS: "",
      VERIFYSCORE: "-1",
      CURRENCY: formData.currency || "360",
      RESPONSECODE: "0000",
      SESSIONID: "tIzk3szs0wb02aVvCR52",
      ...wordsPayload,
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
