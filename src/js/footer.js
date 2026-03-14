class RiihisoftFooter extends HTMLElement {
  static get observedAttributes() {
    return ["prev", "next"];
  }

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

  render() {
    const prev = this.getAttribute("prev") || "#";
    const next = this.getAttribute("next") || "#";
    const pageNumber = location.pathname.split("/")[1]?.split(".html")[0] || "00";

    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/css/buttons.css">
      <link rel="stylesheet" href="/css/fonts.css">

      <style>
        footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-block: var(--spacing-lg);
        }

        div>* {
            display: block;
            text-align: center;
        }

        strong {
            color: var(--color-brand);
        }
      </style>

      <footer class="container">
        <a href="${prev}" class="button secondary">
          <i class="material-symbols">chevron_left</i>
        </a>

        <div>
          <span><strong>${pageNumber}</strong> / 20</span>
          <span>Riihisoft &copy; 2026</span>
        </div>

        <a href="${next}" preload="true" class="button secondary">
          <i class="material-symbols">chevron_right</i>
        </a>
      </footer>
    `;

    //@ts-ignore
    if (window.lucide) {
      //@ts-ignore
      lucide.createIcons();
    }
  }
}

customElements.define("rs-footer", RiihisoftFooter);
