import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import macrosPlugin from "vite-plugin-babel-macros";

import path from "path";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    root: "./src",
    base: "",
    plugins: [reactRefresh(), macrosPlugin()],
    build: {
      target: "es2020",
    },
    resolve: {
      alias: {
        "@assets": path.resolve(__dirname, "src/assets"),
        "@components": path.resolve(__dirname, "src/components"),
        "@common": path.resolve(__dirname, "src/common"),
        "@constants": path.resolve(__dirname, "src/constants"),
        "@routes": path.resolve(__dirname, "src/routes"),
        "@shared": path.resolve(__dirname, "src/shared"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@types": path.resolve(__dirname, "src/types"),
        "@state": path.resolve(__dirname, "src/state"),
        "@services": path.resolve(__dirname, "src/services"),
        "@stores": path.resolve(__dirname, "src/stores"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@static": path.resolve(__dirname, "src/static"),
      },
    },
  });
};
