import { AxiosResponse } from "axios";

export interface PaymentFormData {
  instCode: string;
  virtualAccountNumber: string;
  traceNumber: string;
  date: string;
  amount: string;
  currency: string;
  channelCode: string;
}

export interface PaymentStore {
  formData: PaymentFormData;
  handleInput: (field: keyof PaymentFormData, value: string) => void;
  clearFormData: () => void;
  handlePaste: (field: keyof PaymentFormData) => Promise<void>;
  result: AxiosResponse | null;
  setResult: (result: AxiosResponse | null) => void;
}