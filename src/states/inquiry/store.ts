import { create } from 'zustand';
import { InquiryStore } from './interface';
import { inquiryDefaultValue } from './utils';
import { getClipboard } from '@utils/handlePaste';

const useInquiryStore = create<InquiryStore>()((set) => ({
  formData: inquiryDefaultValue,

  handleInput: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  clearFormData: () => {
    set(() => ({ formData: inquiryDefaultValue }));
    set(() => ({ result: null }));
  },

  handlePaste: (field) => getClipboard().then((text) => set((state) => ({
    formData: {
      ...state.formData,
      [field]: text,
    },
  }))),

  result: null,
  setResult: (result) =>
    set(() => ({
      result,
    })),
}));

export default useInquiryStore;