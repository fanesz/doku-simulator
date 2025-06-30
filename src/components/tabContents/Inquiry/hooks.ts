import PermataService from "@services/permata/service";
import useEndpointStore from "@states/selectedEndpoint/store";
import { PermataInquiryRequest } from "@services/permata/interfaces/inquiry";
import useInquiryStore from "@states/inquiry/store";
import { InquiryFormData } from "@states/inquiry/interface";

interface UseInquiryReturn {
  formData: InquiryFormData;
  handleInputChange: (field: keyof InquiryFormData, value: string) => void;
  handleSubmit: () => void;
  handleClear: () => void;
  handlePasteInput: (field: keyof InquiryFormData) => Promise<void>;
}

const useInquiry = (): UseInquiryReturn => {
  const { value } = useEndpointStore();
  const permataService = new PermataService();
  const {
    formData,
    handleInput,
    clearFormData,
    handlePaste,
    setResult,
  } = useInquiryStore();

  const handleInputChange = (field: keyof InquiryFormData, value: string) => {
    handleInput(field, value);
  };

  const handleClear = () => {
    clearFormData();
  };

  const handlePasteInput = async (field: keyof InquiryFormData) => {
    handlePaste(field);
  };

  const handleSubmit = () => {
    if (!formData.virtualAccountNumber) {
      console.log("Virtual Account Number is required");
      return;
    }

    setResult(null);

    const payload: PermataInquiryRequest = {
      MALLID: "8918",
      CHAINMERCHANT: "0",
      PAYMENTCHANNEL: "36",
      PAYMENTCODE: formData.virtualAccountNumber,
      STATUSTYPE: "I",
      WORDS: "b25872a8920615d4f723f28a402bdc6b387b8e94",
      OCOID: "3006250103327442336",
    };
    permataService.inquiry(value, payload).then((res) => {
      useInquiryStore.getState().setResult(res);
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

export default useInquiry;
