/**
 * @typedef {Object} CodeSlidesData
 * @property {string} kicker
 * @property {string} title
 */

/**
 * @extends HTMLElement
 */
class RiihisoftCodeSlides extends HTMLElement {
  static get observedAttributes() {
    return ["kicker", "title"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    /** @type {CodeSlidesData} */
    this._data = {
      kicker: "",
      title: ""
    };
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = {
      kicker: value?.kicker ?? "",
      title: value?.title ?? ""
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
      kicker: this.getAttribute("kicker") ?? "",
      title: this.getAttribute("title") ?? ""
    };
  }

  render() {
    const { kicker, title } = this._data;

    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/css/buttons.css">
      <link rel="stylesheet" href="/css/fonts.css">
  
      <style>
        :host {
          place-self: center;
        }

        :host > :not(:last-child) {
          margin-bottom: var(--spacing-lg);
        }

        header {
          display: flex;
          gap: var(--spacing-xl);
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        header > button {
          aspect-ratio: 1/1;
          height: fit-content;
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius);
          background-color: transparent;
        }

        header hgroup > * {
          margin: 0;
        }

        header hgroup > *:not(:last-child) {
          margin-bottom: var(--spacing-xxs);
        }

        section {
          display: flex;
          gap: var(--spacing-md);
          overflow-x: auto;
          width: min(calc(100vw - max(8vw, 2rem)), 1600px);
          margin-inline: auto;
          padding-inline: 10vw;
          padding-bottom: var(--spacing-xl);
          box-sizing: border-box;

          scroll-snap-type: x mandatory;
        }
      </style>

      <header>
        <button type="button" class="button secondary" data-prev aria-label="Previous example">
          <i class="material-symbols">chevron_left</i>
        </button>

        <hgroup>
          <p>${kicker}</p>
          <h1>${title}</h1>
        </hgroup>

        <button type="button" class="button secondary" data-next aria-label="Next example">
          <i class="material-symbols">chevron_right</i>
        </button>
      </header>

      <section>
        <slot></slot>
      </section>
    `;

    /** @type {HTMLButtonElement | null} */
    const prevBtn = this.shadowRoot.querySelector("[data-prev]");

    /** @type {HTMLButtonElement | null} */
    const nextBtn = this.shadowRoot.querySelector("[data-next]");

    /** @type {HTMLElement | null} */
    const container = this.shadowRoot.querySelector("section");

    prevBtn?.addEventListener("click", () => {
      container?.scrollBy({
        left: -container.clientWidth * 0.5,
        behavior: "smooth"
      });
    });

    nextBtn?.addEventListener("click", () => {
      container?.scrollBy({
        left: container.clientWidth * 0.5,
        behavior: "smooth"
      });
    });
  }
}

customElements.define("rs-code-slides", RiihisoftCodeSlides);
