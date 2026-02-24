import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  clean: true,
  external: ["react"],
  dts: false   // ⬅️ اینو false کن
});