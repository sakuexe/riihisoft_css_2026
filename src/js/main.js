// web components
import "./footer.js";
import "./nav.js";
import "./code-slides.js";
import "./code-block.js";

/** @type {HTMLTextAreaElement | null} */
const cssEditor = document.querySelector("#css-editor");
/** @type {HTMLStyleElement | null} */
const styleBlock = document.querySelector("aside style");

function updateStyle() {
  if (!cssEditor) {
    console.debug("could not find `#css-editor`");
  }
  if (!styleBlock) {
    console.debug("could not find `aside style`");
  }
  if (!cssEditor || !styleBlock) return;

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

document.addEventListener('DOMContentLoaded', () => {
  let sakuStyle = "color: oklch(0.65 0.16 300); font-size: 1rem; font-weight: 600; padding: 0.2em 0;"
  console.log('%c🖥️ Training materials by Saku Karttunen', sakuStyle);
  console.log('Website: https://sakukarttunen.com \nGithub: https://github.com/sakuexe \n© 2026');
});

