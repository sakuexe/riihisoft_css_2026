// libraries
import "../lib/prismjs/prism.js";
import "../lib/prismjs/prism-css.min.js";
import "../lib/lucide/lucide.js";
// web components
import "./footer.js";
import "./code-slides.js";

/** @type {HTMLTextAreaElement | null} */
const cssEditor = document.querySelector("#css-editor");
/** @type {HTMLStyleElement | null} */
const styleBlock = document.querySelector("aside style");


function updateStyle() {
  if (!cssEditor) {
    throw new Error("could not find `#css-editor`");
  }
  if (!styleBlock) {
    throw new Error("could not find `aside style`");
  }

  styleBlock.textContent = cssEditor.value;
}

cssEditor?.addEventListener("input", updateStyle);
updateStyle();

/** @type {HTMLButtonElement | null} */
const cssEditorToggle = document.querySelector(".example-page button.toggle");
/** @type {HTMLDivElement | null} */
const editorWindow = document.querySelector(".example-page + aside:has(#css-editor)");

cssEditorToggle?.addEventListener("click", (_) => {
  if (!editorWindow) {
    throw new Error("could not find `.example-page + aside:has(#css-editor)`");
  }

  editorWindow.ariaExpanded = editorWindow.ariaExpanded === "true"
    ? "false"
    : "true"
})
