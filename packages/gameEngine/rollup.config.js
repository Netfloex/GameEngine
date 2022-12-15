import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve"

import { join } from "path"
import { defineConfig } from "rollup"
import external from "rollup-plugin-peer-deps-external"
import { terser } from "rollup-plugin-terser"
import typescript from "rollup-plugin-typescript2"

const dev = process.env.ROLLUP_WATCH === "true"

export default defineConfig({
	input: join(process.cwd(), "src", "index.ts"),
	output: {
		dir: "dist",
		format: "cjs",
		generatedCode: "es5",
		plugins: dev ? [] : [terser()],
	},
	plugins: dev
		? [external(), typescript()]
		: [
				external(),
				typescript(),
				commonjs(),
				nodeResolve({ preferBuiltins: true }),
		  ],
})
