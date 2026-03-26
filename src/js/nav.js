class RiihisoftNav extends HTMLElement {
  static get observedAttributes() {
    return ["active"];
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

  isSidemenuOpen = false;

  render() {
    const active = this.getAttribute("active");

    const pageNumber = location.pathname.split("/")[1]?.split(".html")[0] || "00";
    if (!this.shadowRoot) throw new Error("no shadow root exists (???)");

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/css/buttons.css">
      <link rel="stylesheet" href="/css/fonts.css">

      <style>
        :host {
          --nav-width: 500px;
          z-index: 50;
        }

        nav {
          box-sizing: border-box;
          position: fixed;
          top: 0;
          right: 0;
          background-color: var(--color-bg);
          border-inline-start: 1px solid var(--color-border);
          height: 100dvh;
          padding-block: var(--spacing-xl);
          width: var(--nav-width);

          @media (prefers-reduced-motion: no-preference) {
            transition: right 750ms var(--animation-function-overshoot);
          }

          &[aria-expanded="false"] {
            right: calc(var(--nav-width) * -1);
          }
        }

        a.brand {
          color: currentColor;
          text-decoration: none;
          display: flex;
          gap: var(--spacing-md);
          align-items: center;

          padding-inline: var(--spacing-xl);
          margin-bottom: var(--spacing-2xl);
        }

        nav ul {
          margin: 0;
          padding: 0;
          list-style: none;

        }

        li.active a {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);

          text-decoration: underline;
          text-decoration-thickness: 4px;
          text-underline-offset: 8px;
          text-decoration-color: var(--color-brand);

          &::after {
            content: "";
            display: inline-block;
            width: 0.5rem;
            height: 0.5rem;
            background-color: var(--color-brand);
            border-radius: 100%;
          }
        }

        nav p {
          padding-inline: var(--spacing-xl);
          opacity: 0.75;
          font-style: italic;
        }

        ul a {
          display: inline-block;
          padding-inline: var(--spacing-xl);
          padding-block: var(--spacing-sm);
          width: 100%;

          color: currentColor;
          text-decoration: none;

          &:hover {
              color: var(--color-brand);
              text-underline-offset: 12px;
          }
        }

        nav button {
          position: absolute;
          top: var(--spacing-md);
          left: calc(-4rem - var(--spacing-sm));

          @media (prefers-reduced-motion: no-preference) {
            animation: fade-in 750ms var(--animation-function-overshoot);
            animation-delay: 500ms;
            animation-fill-mode: backwards;
          }
        }

        @keyframes fade-in {
          0% { left: 0; }
        }
      </style>

      <nav aria-expanded="false">
        <a href="/" class="brand">
          <img src="/images/riihisoft_logo.png" alt="Riihisoft logo" height="24">
          <span>| Koulutus</span>
        </a>

        <ul>
          <p>Sisällysluettelo</p>
          <li class="${pageNumber === '01' ? `active` : ''}">
            <a href="01.html">OKLCH</a>
          </li>
          <li class="${pageNumber === '02' ? `active` : ''}">
            <a href="02.html">OKLCH esimerkki</a>
          </li>
          <li class="${pageNumber === '03' ? `active` : ''}">
            <a href="03.html">:has()</a>
          </li>
          <li class="${pageNumber === '04' ? `active` : ''}">
            <a href="04.html">:valid &amp; :user-valid</a>
          </li>
          <li class="${pageNumber === '05' ? `active` : ''}">
            <a href="05.html">Validaatio esimerkki</a>
          </li>
          <li class="${pageNumber === '06' ? `active` : ''}">
            <a href="06.html">Container queryt</a>
          </li>
          <li class="${pageNumber === '07' ? `active` : ''}">
            <a href="07.html">Container query esimerkki</a>
          </li>
          <li class="${pageNumber === '08' ? `active` : ''}">
            <a href="08.html">CSS nesting</a>
          </li>
          <li class="${pageNumber === '09' ? `active` : ''}">
            <a href="09.html">Cascade layers</a>
          </li>
          <li class="${pageNumber === '10' ? `active` : ''}">
            <a href="10.html">Relative colors</a>
          <li class="${pageNumber === '11' ? `active` : ''}">
            <a href="11.html">color-scheme</a>
          </li>
          <li class="${pageNumber === '12' ? `active` : ''}">
            <a href="12.html">accent-color</a>
          </li>
          <li class="${pageNumber === '13' ? `active` : ''}">
            <a href="13.html">Värien esimerkki</a>
          </li>
          <li class="${pageNumber === '14' ? `active` : ''}">
            <a href="14.html">CSS funktiot</a>
          </li>
          <li class="${pageNumber === '15' ? `active` : ''}">
            <a href="15.html">@property</a>
          </li>
          <li class="${pageNumber === '16' ? `active` : ''}">
            <a href="16.html">Property esimerkki</a>
          </li>
          <li class="${pageNumber === '17' ? `active` : ''}">
            <a href="17.html">View transitions API</a>
          </li>
          <li class="${pageNumber === '18' ? `active` : ''}">
            <a href="18.html">Scroll driven animations</a>
          </li>
          <li class="${pageNumber === '19' ? `active` : ''}">
            <a href="19.html">Loppu</a>
          </li>
        </ul>

        <button type="button" class="button secondary" aria-label="toggle navigation">
          <i class="material-symbols">menu</i>
        </button> 
      </nav>
    `;

    /** @type {HTMLButtonElement | null} */
    const navButton = this.shadowRoot.querySelector("button")
    if (!navButton) throw new Error("could not find nav button in rs-nav");
    /** @type {HTMLElement | null} */
    const navigation = this.shadowRoot.querySelector("nav")
    if (!navigation) throw new Error("could not find nav in rs-nav");

    navButton.addEventListener("click", () => {
      navigation.ariaExpanded = navigation.ariaExpanded === "true" ? "false" : "true";
    });

    //@ts-ignore
    if (window.lucide) {
      //@ts-ignore
      lucide.createIcons();
    }
  }
}

customElements.define("rs-nav", RiihisoftNav);
