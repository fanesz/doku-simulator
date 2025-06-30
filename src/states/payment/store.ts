import { create } from 'zustand';
import { PaymentStore } from './interface';
import { paymentDefaultValue } from './utils';
import { getClipboard } from '@utils/handlePaste';

const usePaymentStore = create<PaymentStore>()((set) => ({
  formData: paymentDefaultValue,

  handleInput: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  clearFormData: () => {
    set(() => ({ formData: paymentDefaultValue }));
    set(() => ({ result: null }));
  },

  handlePaste: async (field) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: getClipboard(),
      },
    }));
  },

  result: null,
  setResult: (result) =>
    set(() => ({
      result,
    })),
}));

export default usePaymentStore;