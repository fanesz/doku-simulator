import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EndpointStore } from './interface';
import { ENDPOINT_SELECTOR_LOCAL_STORAGE_KEY } from '@consts/index';

const useEndpointStore = create<EndpointStore>()(
  persist(
    (set) => ({
      value: '',
      setValue: (value: string) => set({ value }),
    }),
    {
      name: ENDPOINT_SELECTOR_LOCAL_STORAGE_KEY,
    }
  )
);

export default useEndpointStore;