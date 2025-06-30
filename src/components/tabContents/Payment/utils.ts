import { PaymentFormData } from "@states/payment/interface";

export const inputFields = [
  {
    key: "instCode" as keyof PaymentFormData,
    label: "INST CODE",
    placeholder: "3 Digit Number (optional)",
  },
  {
    key: "virtualAccountNumber" as keyof PaymentFormData,
    label: "VIRTUAL ACCOUNT NUMBER*",
    placeholder: "Max 16 Digit Number",
  },
  {
    key: "traceNumber" as keyof PaymentFormData,
    label: "TRACE NUMBER",
    placeholder: "6 Digit Number (optional)",
  },
  {
    key: "date" as keyof PaymentFormData,
    label: "Date",
    placeholder: "MMddHHmmss (optional, default: current date)",
  },
  {
    key: "amount" as keyof PaymentFormData,
    label: "Amount*",
    placeholder: "amount",
  },
  {
    key: "currency" as keyof PaymentFormData,
    label: "CURRENCY",
    placeholder: "3 Digit (optional, default: 360)",
  },
  {
    key: "channelCode" as keyof PaymentFormData,
    label: "CHANNEL CODE",
    placeholder: "2 Digit (optional, default: 36)",
  },
];

