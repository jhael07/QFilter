import dts from "rollup-plugin-dts";
import { defineConfig } from "rollup";
import path, { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import postcss from "rollup-plugin-postcss";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  input: resolve(__dirname, "src/index.ts"),
  output: [{ file: "dist/index.d.ts", format: "es" }],
  external: ["react", "react-dom", "react/jsx-runtime"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    postcss({ extract: false, inject: false }), // extracts CSS to separate file
    dts({
      respectExternal: true, // skips CSS & non-TS imports
    }),
  ],
});
