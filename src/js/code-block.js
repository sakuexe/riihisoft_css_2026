/**
 * @extends HTMLElement
 */
class RiihisoftCodeBlock extends HTMLElement {
  static get observedAttributes() {
    return ["language"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.loadStyles().then(s => {
      if (!this.shadowRoot) return;
      this.shadowRoot.adoptedStyleSheets = [s];
    })
    
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  async loadStyles() {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(await (await fetch("/lib/highlightjs/default.css")).text());
    return sheet
  }

  render() {
    if (!this.shadowRoot) return;

    const language = this.getAttribute("language") ?? "css";
    const slot = this.querySelector(":scope > *") ?? this;
    const code = slot.textContent?.trim() ?? "";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          flex: 0 0 80%;
          scroll-snap-align: center;
          margin-inline: auto;
          
          container-type: scroll-state;
          container-name: slide;
          font-family: monospace;
        }

        .code-block {
          transform: scale(0.90);
          opacity: 0.5;
          transition: transform 750ms ease, opacity 750ms ease;
          transform-origin: center center;

          display: flex;
          flex-direction: column;
          justify-content: center;
          height: clamp(400px, 100%, 1000px);
        }

        pre {
          margin: 0;
          padding-inline: var(--spacing-xl);
          padding-block: var(--spacing-md);
          width: min(80vw, 800px);
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

        code {
          font-size: 1.125rem;
        }
      </style>

      <div class="code-block">
        <pre><code class="language-${language}">${code}</code></pre>
      </div>
    `;
  }
}

customElements.define("rs-code-block", RiihisoftCodeBlock);
