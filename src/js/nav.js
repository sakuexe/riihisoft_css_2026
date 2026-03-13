class RiihisoftNav extends HTMLElement {
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
    const pageNumber = location.pathname.split("/")[1]?.split(".html")[0] || "00";
    if (!this.shadowRoot) throw new Error("no shadow root exists (???)");

    this.shadowRoot.innerHTML = `
      <style>
        nav {
          display: flex;
          justify-content: space-between;
          padding-inline: min(4%, var(--spacing-xl));
          padding-block: var(--spacing-md);
        }

        nav > a {
          color: currentColor;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        nav ul a {
          color: currentColor;
          text-decoration: none;
        }

        nav ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
      </style>

      <nav>
        <a href="/">
          <img src="/images/riihisoft_logo.png" alt="Riihisoft logo" height="24">
          <span>| Koulutus</span>
        </a>
        <ul>
          <li><a href="/">navigation-item</a></li>
        </ul>
      </nav>
    `;

    //@ts-ignore
    if (window.lucide) {
      //@ts-ignore
      lucide.createIcons();
    }
  }
}

customElements.define("rs-nav", RiihisoftNav);
