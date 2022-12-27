// import { resolve } from 'path';
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
// eslint-disable-next-line import/namespace
import { nodeResolve } from "@rollup/plugin-node-resolve";
import addCliEntry from "./build-plugins/add-cli-entry.js";

const treeshake = {
  moduleSideEffects: false,
  propertyReadSideEffects: false,
  unknownGlobalSideEffects: false,
};

// const moduleAliases = {
// 	entries: {
// 		'package.json': resolve('package.json')
// 	},
// 	resolve: ['.js', '.json', '.md']
// };

export default {
  input: "src/main.js",
  output: {
    chunkFileNames: "[name].js",
    dir: "dist",
    entryFileNames: "[name].js",
    format: "cjs",
    generatedCode: "es2015",
    // sourcemap: true
  },
  plugins: [
    nodeResolve(),
    json(),
    commonjs({
      ignoreTryCatch: false,
      include: "node_modules/**",
    }),
    addCliEntry(),
  ],
  strictDeprecations: true,
  treeshake,
};
