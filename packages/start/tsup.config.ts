import { defineConfig, type Options } from "tsup";
import { dependencies, devDependencies, peerDependencies } from "./package.json";

const baseConfig: Options = {
  format: ["esm"],
  external: [...Object.keys(peerDependencies), ...Object.keys(devDependencies)],
  noExternal: Object.keys(dependencies),
  dts: true,
  treeshake: true,
  clean: true,
};

// noinspection JSUnusedGlobalSymbols
export default defineConfig([
  {
    ...baseConfig,
    entry: {
      index: "src/react/index.ts",
    },
    target: "es2022",
  },
  {
    ...baseConfig,
    entry: {
      server: "src/server/index.ts",
    },
    platform: "node",
    target: "node20",
  },
  {
    ...baseConfig,
    entry: {
      vite: "src/vite/index.ts",
    },
    platform: "node",
    target: "node20",
  },
]);
