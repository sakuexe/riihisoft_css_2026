/**
 * @typedef {Object} CodeSlidesData
 * @property {string} kicker
 * @property {string} title
 * @property {string[]} examples
 */

/**
 * @extends HTMLElement
 */
class CodeSlides extends HTMLElement {
  static get observedAttributes() {
    return ["kicker", "title", "examples"];
  }

  constructor() {
    super();

    /** @type {CodeSlidesData} */
    this._data = {
      kicker: "",
      title: "",
      examples: []
    };
  }

  /**
   * @returns {CodeSlidesData}
   */
  get data() {
    return this._data;
  }

  /**
   * @param {Partial<CodeSlidesData>} value
   */
  set data(value) {
    this._data = {
      kicker: value?.kicker ?? "",
      title: value?.title ?? "",
      examples: Array.isArray(value?.examples) ? value.examples : []
    };

    this.render();
  }

  connectedCallback() {
    this.readAttributes();
    this.render();
  }

  /**
   * @param {string} _name
   * @param {string | null} _oldValue
   * @param {string | null} _newValue
   * @returns {void}
   */
  attributeChangedCallback(_name, _oldValue, _newValue) {
    this.readAttributes();
    this.render();
  }

  /**
   * @returns {void}
   */
  readAttributes() {
    const kicker = this.getAttribute("kicker") ?? "";
    const title = this.getAttribute("title") ?? "";
    const examplesAttr = this.getAttribute("examples");

    /** @type {string[]} */
    let examples = [];

    if (examplesAttr) {
      try {
        const parsed = JSON.parse(examplesAttr);
        if (Array.isArray(parsed)) {
          examples = parsed.map(String);
        }
      } catch (error) {
        console.error("Invalid examples JSON:", error);
      }
    }

    this._data = {
      kicker,
      title,
      examples
    };
  }

  /**
   * @returns {void}
   */
  render() {
    const { kicker, title, examples } = this._data;

    this.innerHTML = `
      <header>
        <button type="button" class="button secondary" data-prev aria-label="Previous example">
          <i data-lucide="chevron-left"></i>
        </button>

        <hgroup>
          <p>${kicker}</p>
          <h1>${title}</h1>
        </hgroup>

        <button type="button" class="button secondary" data-next aria-label="Next example">
          <i data-lucide="chevron-right"></i>
        </button>
      </header>

      <section class="code-blocks">
        ${examples.map((example, _) => `
          <article class="slide">
            <div class="slide-inner">
              <pre><code class="language-css">${example}</code></pre>
            </div>
          </article>
        `).join("")}
      </section>
    `;

    /** @type {HTMLButtonElement | null} */
    const prevBtn = this.querySelector("[data-prev]");

    /** @type {HTMLButtonElement | null} */
    const nextBtn = this.querySelector("[data-next]");

    /** @type {HTMLElement | null} */
    const container = this.querySelector(".code-blocks");

    prevBtn?.addEventListener("click", () => {
      container?.scrollBy({
        left: -container.clientWidth * 0.8,
        behavior: "smooth"
      });
    });

    nextBtn?.addEventListener("click", () => {
      container?.scrollBy({
        left: container.clientWidth * 0.8,
        behavior: "smooth"
      });
    });

    //@ts-ignore
    if (window.lucide?.createIcons) {
      //@ts-ignore
      window.lucide.createIcons();
    }
  }
}

customElements.define("code-slides", CodeSlides);
