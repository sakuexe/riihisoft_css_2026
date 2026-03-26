/**
 * @extends HTMLElement
 */
class RiihisoftNavMenu extends HTMLElement {
  static get observedAttributes() {
    return ["active", "open"];
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

  async render() {
    if (!this.shadowRoot) return;

    const active = this.getAttribute("active");
    const isOpen = !!this.getAttribute("isOpen") ? "true" : "false";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: fixed;
          top: 0;
          right: 0;
        }
      </style>

      <ul aria-expanded="${isOpen}">
        <li>
          <a href="01.html">OKLCH</a>
          <a href="02.html">OKLCH esimerkki</a>
          <a href="03.html">:has()</a>
          <a href="04.html">:valid &amp; :user-valid</a>
          <a href="05.html">Validaatio esimerkki</a>
          <a href="06.html">Container queryt</a>
          <a href="07.html">Container query esimerkki</a>
          <a href="08.html">CSS nesting</a>
          <a href="09.html">Cascade layers</a>
          <a href="10.html">Relative colors</a>
          <a href="11.html">color-scheme</a>
          <a href="12.html">accent-color</a>
          <a href="13.html">Värien esimerkki</a>
          <a href="14.html">CSS funktiot</a>
          <a href="15.html">@property</a>
          <a href="16.html">Property esimerkki</a>
          <a href="17.html">View transitions API</a>
          <a href="18.html">Scroll driven animations</a>
          <a href="19.html">Loppu</a>
        </li>
      </ul>
    `;
  }
}

customElements.define("rs-nav-menu", RiihisoftNavMenu);
