import { defineConfig } from "vite"
import { resolve } from "node:path"
import { readdirSync } from "node:fs"

const htmlInputs = Object.fromEntries(
  readdirSync(resolve(__dirname, "src"))
    .filter((file) => file.endsWith(".html"))
    .map((file) => [file.replace(/\.html$/, ""), resolve(__dirname, "src", file)])
)

export default defineConfig(() => ({
  root: "src",
  base: "/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: htmlInputs,
    },
  },
}))
