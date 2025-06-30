import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // "@root": path.resolve(__dirname, "./src"),
      "@commonComponents": path.resolve(__dirname, "./src/common/components"),
      "@consts": path.resolve(__dirname, "./src/common/consts"),
      "@hooks": path.resolve(__dirname, "./src/common/hooks"),
      "@enums": path.resolve(__dirname, "./src/common/enums"),
      "@utils": path.resolve(__dirname, "./src/common/utils"),
      "@types": path.resolve(__dirname, "./src/common/types/index.ts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@services": path.resolve(__dirname, "./src/api/services"),
      "@states": path.resolve(__dirname, "./src/states"),
    },
  },
});
