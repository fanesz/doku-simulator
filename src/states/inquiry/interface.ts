import { AxiosResponse } from "axios";

export interface InquiryFormData {
  instCode: string;
  virtualAccountNumber: string;
  traceNumber: string;
  date: string;
}

export interface InquiryStore {
  formData: InquiryFormData;
  handleInput: (field: keyof InquiryFormData, value: string) => void;
  clearFormData: () => void;
  handlePaste: (field: keyof InquiryFormData) => Promise<void>;
  result: AxiosResponse | null;
  setResult: (result: AxiosResponse) => void;
}