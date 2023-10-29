import resolve from "@rollup/plugin-node-resolve";
import vue from "rollup-plugin-vue";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import serve from "rollup-plugin-serve";

console.log(process.env)

export default {
	input: './test/main.js',
	output: {
		file: './dist/index.js',
		format: 'cjs',
		global: {
			vue: "Vue"
		}
	},
	plugins: [
		resolve(),
		vue({
			css: true,
			compileTemplate: true,
		}),
		babel({
			exclude: "**/node_modules/**"
		}),
		commonjs(),
		image(),
		serve({
			host: "localhost",
			open: true,
			port: 8080,
			openPage: "/",
			contentBase: ["dist", "static"]
		})
	],
	external: ['lodash']
};