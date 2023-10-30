import resolve from "@rollup/plugin-node-resolve";
import vue from "rollup-plugin-vue";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import replace from "@rollup/plugin-replace";
import { terser } from 'rollup-plugin-terser';

export default {
  input: "./src/index.js",
  output: {
    file: "./lib/index.js",
    format: "cjs",
    global: {
      vue: "Vue",
    },
    name: "func",
    sourcemap: false,
  },
  onwarn: function (warning) {
    if (warning.code === "THIS_IS_UNDEFINED") {
      return;
    }
    console.error(warning.message);
  },
  plugins: [
    resolve(),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
    }),
    babel({
      exclude: "**/node_modules/**",
    }),
    image(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      __buildDate__: () => JSON.stringify(new Date()),
      __buildVersion: 15,
    }),
    terser()
  ],
  external: ["lodash"],
};
