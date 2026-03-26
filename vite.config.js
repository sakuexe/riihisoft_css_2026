import { defineConfig } from "vite"

export default defineConfig(() => {
  return {
    root: "src",
    base: "/",
    build: {
      outDir: "../dist",
      emptyOutDir: true,
    }
  }
})
