import { useState, useEffect } from "react";

interface HookReturn {
  windowWidth: number;
  windowHeight: number;
  underXs: boolean;
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  "2xl": boolean;
  "3xl": boolean;
}
const useWindowSize = (): HookReturn => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const windowWidth = windowSize[0];
  const windowHeight = windowSize[1];

  return {
    windowWidth,
    windowHeight,
    underXs: windowWidth < 320,
    xs: windowWidth >= 450,
    sm: windowWidth >= 640,
    md: windowWidth >= 768,
    lg: windowWidth >= 1024,
    xl: windowWidth >= 1280,
    "2xl": windowWidth >= 1536,
    "3xl": windowWidth >= 1792,
  };
};

export default useWindowSize;
