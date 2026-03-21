import hljs from "../lib/highlight/highlight.min.js";
import css from "../lib/highlight/languages/css.min.js";
import javascript from "../lib/highlight/languages/javascript.min.js";
import xml from "../lib/highlight/languages/xml.min.js";

hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

/**
 * @extends HTMLElement
 */
class RiihisoftCodeBlock extends HTMLElement {
  static get observedAttributes() {
    return ["language"];
  }

  static themeSheetPromise = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  async render() {
    if (!this.shadowRoot) return;

    const language = this.getAttribute("language") ?? "plaintext";
    const source = this.querySelector(":scope > *");
    const rawCode = source?.textContent?.trim() ?? this.textContent?.trim() ?? "";

    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = isDark
      ? "/lib/highlight/styles/rose-pine.min.css"
      : "/lib/highlight/styles/rose-pine-dawn.min.css";

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${theme}">

      <style>
        :host {
          flex: 0 0 80%;
          scroll-snap-align: center;
          margin-inline: auto;
          container-type: scroll-state;
          container-name: slide;
          font-family: monospace;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .code-block {
          transform: scale(0.90);
          opacity: 0.5;
          transition: transform 750ms ease, opacity 750ms ease;
          transform-origin: center center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        pre {
          margin: 0;
          padding-inline: var(--spacing-xl);
          padding-block: var(--spacing-md);
          width: min(80vw, 1000px);
          overflow-x: auto;
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius);
          background-color: var(--color-bg);
        }

        @container slide scroll-state(snapped: x) {
          .code-block {
            transform: scale(1);
            opacity: 1;
            z-index: 1;
          }
        }

        code.hljs {
          font-size: 1.25rem;
          display: block;
          background-color: transparent;
        }

        .hljs-comment, .hljs-meta, code.hljs {
          color: oklch(from var(--color-text) l c h / 0.7);
        }

        .hljs-deletion, .hljs-doctag, .hljs-regexp, .hljs-selector-attr, .hljs-selector-class, .hljs-selector-id, .hljs-selector-pseudo, .hljs-tag, .hljs-template-tag, .hljs-variable.language_ {
          color: oklch(from var(--color-brand) l c calc(h + 60));
        }

        .hljs-attr, .hljs-char.escape_, .hljs-keyword, .hljs-name, .hljs-operator {
          color: oklch(from var(--color-brand) l c calc(h - 60));
        }

        .hljs-attribute, .hljs-built_in {
          color: oklch(from var(--color-brand) l c calc(h + 120));
        }

        .hljs-link, .hljs-literal, .hljs-number, .hljs-params, .hljs-template-variable, .hljs-type, .hljs-variable {
          color: oklch(from var(--color-text) l c h);
        }

        .hljs-addition, .hljs-bullet, .hljs-quote, .hljs-string, .hljs-symbol {
          color: oklch(from var(--color-brand) calc(l * 1.25) c calc(h - 120));
        }
      </style>

      <div class="code-block">
        <pre><code></code></pre>
      </div>
    `;

    const codeEl = this.shadowRoot.querySelector("code");
    if (!codeEl) return;

    codeEl.className = `language-${language}`;
    codeEl.textContent = rawCode;

    try {
      hljs.highlightElement(codeEl);
    } catch (error) {
      console.warn("Highlighting failed:", error);
    }
  }
}

customElements.define("rs-code-block", RiihisoftCodeBlock);
