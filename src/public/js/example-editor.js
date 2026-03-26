/**
 * @typedef {Object} EditorData
 * @property {string} css
 * @property {boolean} open
 */

/**
 * @extends HTMLElement
 */
class RiihisoftCssEditor extends HTMLElement {
  static get observedAttributes() {
    return ["css", "open"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    /** @type {EditorData} */
    this._data = {
      css: "",
      open: false,
    };
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = {
      css: value?.css ?? "",
      open: value?.open ?? false,
    };

    this.render();
  }

  connectedCallback() {
    this.readAttributes();
    this.render();
  }

  attributeChangedCallback() {
    this.readAttributes();
    this.render();
  }

  readAttributes() {
    this._data = {
      css: this.getAttribute("css") ?? "",
      open: this.getAttribute("open") === "true",
    };
  }

  render() {
    const { css, open } = this._data;

    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/css/buttons.css">
      <link rel="stylesheet" href="/css/fonts.css">
  
      <style>
      :host {
        --animation-duration: 750ms;
        --animation-delay: 150ms;

        display: grid;
        width: min(1920px, 100%);
        height: clamp(600px, 80vh, 1000px);
        place-self: center;
        gap: var(--spacing-md);
        font-size: 1.25em;

        @media (prefers-reduced-motion: no-preference) {
          transition: grid-template-columns var(--animation-duration) ease-in-out;
          transition-delay: var(--animation-delay);
        }

        @container (width > 768px) {
          grid-template-columns: 1fr 0px;
        }
      }

      :host:has(aside[aria-expanded="true"]) {
        @container (width > 768px) {
          grid-template-columns: 1fr min(768px, 40vw);
        }
      }

      section {
        border: 1px solid var(--color-border);
        border-radius: var(--border-radius);
        padding-inline: var(--spacing-xl);
        padding-block: var(--spacing-md);
        font-size: 1em;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      section button.toggle {
        position: absolute;
        inset: 0;
        margin-block: auto;
        margin-inline: auto var(--spacing-md);
        width: 32px;
        height: 64px;
        display: grid;
        place-content: center;

        background-color: var(--color-fg);
        border: 1px solid var(--color-border);
        border-radius: calc(var(--border-radius) / 2);
      }

      section button.toggle i {
        @media (prefers-reduced-motion: no-preference) {
          transition: rotate 150ms ease-in-out;
        }
      }

      section:has(+aside[aria-expanded="true"]) button.toggle i {
        rotate: 0.5turn;
      }

      aside {
        overflow-x: auto;
        overflow-y: clip;

        @media (prefers-reduced-motion: no-preference) {
          transition: opacity calc(var(--animation-duration) / 2) ease-in-out;
          transition-delay: calc(var(--animation-delay) * 2);
        }

          &[aria-expanded="false"] {
            overflow-x: clip;
            opacity: 0;
          }

          #css-editor {
            border: 1px solid var(--color-border);
            border-radius: var(--border-radius);
            padding: var(--spacing-md) var(--spacing-lg);
            background-color: transparent;
            height: 100%;
            width: 100%;

            margin: 0;
            tab-size: 4;
            font-size: 1em;
            box-sizing: border-box;

            @media (prefers-reduced-motion: no-preference) {
              transition: color var(--animation-delay) ease-in-out;
            }
          }

          &[aria-expanded="false"] #css-editor {
            color: transparent;
          }

          &[aria-expanded="true"] #css-editor {
            @media (prefers-reduced-motion: no-preference) {
              transition-delay: calc(var(--animation-duration) + var(--animation-delay));
            }
          }
        }
      </style>

      <section>
        <slot></slot>
        <button type="button" class="toggle">
          <i class="material-symbols">chevron_left</i>
        </button>
      </section>

      <aside aria-expanded="${open}">
        <textarea 
          id="css-editor" 
          class="language-css" 
          spellcheck="false"
          onkeydown="if(event.keyCode===9){var v=this.value,s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+'\t'+v.substring(e);this.selectionStart=this.selectionEnd=s+1;return false;}"
        >${css.replaceAll("\\t", "\t").replaceAll("\\n", "\n")}</textarea>
      </aside>
    `;

    /** @type {HTMLButtonElement | null} */
    const cssEditorToggle = this.shadowRoot.querySelector("button.toggle");
    /** @type {HTMLElement | null} */
    const editorWindow = this.shadowRoot.querySelector("aside");

    cssEditorToggle?.addEventListener("click", (_) => {
      if (!editorWindow) {
        throw new Error("could not find `.example-page + aside:has(#css-editor)`");
      }

      this._data.open = !this._data.open;
      editorWindow.ariaExpanded = String(this._data.open);
    })

    /** @type {HTMLTextAreaElement | null} */
    const cssEditor = this.shadowRoot.querySelector("#css-editor");
    if (!cssEditor) throw new Error("`#css-editor` not found inside the rs-editor component");

    if (!this.previewStyle) {
      /** @type {HTMLStyleElement } */
      this.previewStyle = document.createElement('style');
      this.previewStyle?.classList.add("editor-style");
      this.appendChild(this.previewStyle);
      this.previewStyle.textContent = css.replaceAll("\\t", "\t").replaceAll("\\n", "\n");
    }

    cssEditor.addEventListener('input', (e) => {
      //@ts-ignore
      this.previewStyle.textContent = e.target.value;
    });
  }
}

customElements.define("rs-editor", RiihisoftCssEditor);
