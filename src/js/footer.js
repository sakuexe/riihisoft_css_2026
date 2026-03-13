class RiihisoftFooter extends HTMLElement {
  static get observedAttributes() {
    return ["prev", "next"];
  }

  constructor() {
    super();
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

    this.innerHTML = `
      <footer class="container">
        <a href="${prev}" class="button secondary">
          <i data-lucide="chevron-left"></i>
        </a>

        <span>Riihisoft &copy; 2026</span>

        <a href="${next}" class="button secondary">
          <i data-lucide="chevron-right"></i>
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
