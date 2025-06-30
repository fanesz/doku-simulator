import { InquiryFormData } from "@states/inquiry/interface";

export const inputFields = [
  {
    key: "instCode" as keyof InquiryFormData,
    label: "INST CODE",
    placeholder: "3 Digit Number (optional)",
  },
  {
    key: "virtualAccountNumber" as keyof InquiryFormData,
    label: "VIRTUAL ACCOUNT NUMBER*",
    placeholder: "Max 16 Digit Number",
  },
  {
    key: "traceNumber" as keyof InquiryFormData,
    label: "TRACE NUMBER",
    placeholder: "6 Digit Number (optional)",
  },
  {
    key: "date" as keyof InquiryFormData,
    label: "Date",
    placeholder: "MMddHHmmss (optional, default: current date)",
  },
];

export const defaultValue: InquiryFormData = {
  instCode: "",
  virtualAccountNumber: "",
  traceNumber: "",
  date: "",
}