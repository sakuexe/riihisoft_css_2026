import { defineConfig } from "vite"

export default defineConfig(({ command }) => {
  return {
    root: "src",
    base: command === "serve" ? "/" : "/riihisoft_css_2026/",
    build: {
      outDir: "../dist",
      emptyOutDir: true,
    }
  }
})
