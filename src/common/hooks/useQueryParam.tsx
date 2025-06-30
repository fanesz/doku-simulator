import { useState, useEffect } from "react";

export const useQueryParam = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return defaultValue;
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key) || defaultValue;
  });

  const setQueryParam = (newValue: string) => {
    setValue(newValue);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set(key, newValue);
      window.history.replaceState({}, '', url.toString());
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const currentValue = urlParams.get(key) || defaultValue;
        setValue(currentValue);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [key, defaultValue]);

  return [value, setQueryParam] as const;
};