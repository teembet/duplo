import * as path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import vitePluginImp from "vite-plugin-imp";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

// import manifest from './manifest.json';
import { version } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "_");
  process.env._APP_VERSION = version;
  process.env._APP_PWA_CACHE = env._APP_PWA_CACHE;
  const isPwaEnabled = env._APP_PWA_CACHE === "enabled";

  console.log({ isPwaEnabled });

  return {
    server: {
      port: mode === "production" ? 5173 : 8000,
    },
    build: {
      rollupOptions: {
        output: {
          generatedCode: {
            constBindings: true,
            arrowFunctions: true,
            objectShorthand: true,
          },

          validate: true,
        },
      },
      target: "es2018",
    },
    esbuild: {
      minifyWhitespace: true,
      minifySyntax: true,
      minifyIdentifiers: true,
    },
    envPrefix: "_",
    define: {
      "process.env": {
        _APP_VERSION: process.env._APP_VERSION,
        _APP_PWA_CACHE: process.env._APP_PWA_CACHE,
      },
    },
    plugins: [
      react({
        exclude: /node-modules/,
      }),
      svgr({
        svgrOptions: {
          icon: true,
        },
      }),
      VitePWA({
        // manifest,
        injectRegister: null,
        registerType: "prompt",
        includeAssets: [
          "favicon.svg",
          "favicon.ico",
          "robots.txt",
          "apple-touch-icon.png",
        ],
        // This enables or disables PWA functionality
        ...(!isPwaEnabled && { selfDestroying: true }),
      }),
      vitePluginImp({
        libList: [
          {
            libName: "@mui/material",
            libDirectory: "",
            camel2DashComponentName: false,
          },
          {
            libName: "@mui/lab",
            libDirectory: "",
            camel2DashComponentName: false,
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
