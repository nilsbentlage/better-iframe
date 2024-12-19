class BetterIframe extends HTMLElement {
  static get observedAttributes() {
    return ["src", "primary-color", "border-radius", "height", "image-src"];
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "closed" });
  }

  accept() {
    this.renderIframe();
  }

  renderCSS() {
    const style = document.createElement("style");
    style.textContent = `
      :host {
        box-sizing: border-box;
        height: ${this.height};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-image: ${
          this.imageSource ? `url(${this.imageSource})` : "none"
        };
        background-size: cover;
        background-position: center;
        font-family: Arial, sans-serif;
      }

      .container {
        width: clamp(200px, 80%, 600px);
        height: auto;
        padding: 2rem 2rem 1.25rem;
        background-color: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(10px);
        border-radius: ${this.borderRadius};
        text-align: center;
      }

      slot {
        display: block;
        margin-bottom: 1rem;
        text-align: left;
      }

      button {
        background-color: ${this.primaryColor};
        color: white;
        border: none;
        padding: 0.5rem 1.5rem;
        border-radius: calc(${this.borderRadius} * 0.5);
        cursor: pointer;
      }

      ::slotted(a), ::slotted(a:visited) {
        color: inherit;
      }

      ::slotted(a:hover) {
        color: ${this.primaryColor};
      }
    `;
    this.shadow.appendChild(style);
  }

  renderQuestion() {
    this.shadow.innerHTML = `
    <div class="container">
        <slot></slot>
        <button id="accept">OK</button>
    </div>`;
    this.renderCSS();
  }

  renderIframe() {
    this.shadow.innerHTML = `
    <iframe
      frameborder="0"
      src="${this.src}"
      width="100%"
      style="height: ${this.height}"
      allowfullscreen
      sandbox="allow-scripts allow-same-origin"
      loading="lazy"
      referrerpolicy="never"
    ></iframe>`;
  }

  connectedCallback() {
    this.updateAttributes();
    this.renderQuestion();
    this.shadow.querySelector("#accept").addEventListener("click", () => {
      this.accept();
    });
  }

  attributeChangedCallback() {
    this.updateAttributes();
    this.renderQuestion();
  }

  updateAttributes() {
    this.src = this.getAttribute("src") || "";
    this.imageSource = this.getAttribute("image-src");
    this.primaryColor = this.getAttribute("primary-color") || "blue";
    this.borderRadius = this.getAttribute("border-radius") || "0px";
    this.height = this.getAttribute("height") || "450";
  }

  disconnectedCallback() {
    this.shadow.querySelector("#accept").removeEventListener("click", () => {
      this.accept();
    });
  }
}

customElements.define("better-iframe", BetterIframe);
