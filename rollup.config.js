import resolve from "@rollup/plugin-node-resolve";
import vue from "rollup-plugin-vue";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import serve from "rollup-plugin-serve";
import replace from "@rollup/plugin-replace";

const plugins = [];
if (process.env.NODE_ENV == "development") {
  plugins.push(
    serve({
      host: "localhost",
      open: true,
      port: 8080,
      openPage: "/",
      contentBase: ["dist", "static"],
    })
  );
} else {
}

export default {
  input: "./test/main.js",
  output: {
    file: "./dist/index.js",
    format: "cjs",
    global: {
      vue: "Vue",
    },
    name: "func",
    sourcemap: true,
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
    ...plugins,
  ],
  external: ["lodash"],
};
