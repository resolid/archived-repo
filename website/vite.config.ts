import resolidNode from "@resolid/start-node";
import resolid from "@resolid/start/vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { URL, fileURLToPath } from "node:url";
import { defineConfig, splitVendorChunkPlugin, type AliasOptions, type UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => {
  const isBuild = command == "build";
  const __dirname = fileURLToPath(new URL(".", import.meta.url));

  const config: UserConfig = {
    plugins: [
      resolid({
        adapter: resolidNode(),
      }),
      react(),
      splitVendorChunkPlugin(),
      !isBuild && tsconfigPaths(),
    ].filter(Boolean),
    build: {
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (warning.code === "MODULE_LEVEL_DIRECTIVE" && warning.message.includes("use client")) {
            return;
          }
          defaultHandler(warning);
        },
        output: {
          manualChunks(id) {
            if (
              id.includes("/node_modules/react/") ||
              id.includes("/node_modules/react-dom/") ||
              id.includes("/node_modules/react-is/") ||
              id.includes("/node_modules/scheduler/") ||
              id.includes("/node_modules/prop-types/")
            ) {
              return "react";
            }

            if (id.includes("/node_modules/")) {
              return "vendor";
            }

            if (id.includes("/node_modules/@resolid/") || id.includes("/packages/")) {
              return "resolid";
            }
          },
        },
      },
    },
    resolve: {
      alias: [isBuild && { find: "~", replacement: resolve(__dirname, "./app") }].filter(Boolean) as AliasOptions,
    },
  };

  return config;
});
