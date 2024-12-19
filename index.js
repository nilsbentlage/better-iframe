class BetterIframe extends HTMLElement {
  static get observedAttributes() {
    return ["src", "primary-color", "border-radius", "height", "image-src"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "closed" });
  }

  accept() {
    this.renderIframe();
  }

  renderCSS() {
    const style = document.createElement("style");
    console.log(this.primaryColor);
    style.textContent = `
      :host {
        box-sizing: border-box;
        height: ${this.height}px;
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
        padding: 2rem;
        background-color: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(10px);
        border-radius: ${this.borderRadius}px;
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
        padding: 0.5rem 1rem;
        border-radius: ${this.borderRadius * 0.5}px;
        cursor: pointer;
      }
    `;
    this.shadow.appendChild(style);
  }

  renderQuestion() {
    this.shadow.innerHTML = `
    <div class="container">
        <slot></slot>
        <button id="accept">Accept</button>
    </div>`;
    this.renderCSS();
  }

  renderIframe() {
    this.shadow.innerHTML = `
    <iframe
      width="100%"
      height="${this.height}"
      frameborder="0"
      style="border:0"
      src="${this.src}"
      allowfullscreen
      loading="lazy"
       referrerpolicy="no-referrer-when-downgrade"
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
    this.primaryColor = this.getAttribute("primary-color") || "blue";
    this.borderRadius = this.getAttribute("border-radius") || "0px";
    this.height = this.getAttribute("height") || "450";
    this.imageSource = this.getAttribute("image-src");
  }

  disconnectedCallback() {
    this.shadow.querySelector("#accept").removeEventListener("click", () => {
      this.accept();
    });
  }
}

customElements.define("better-iframe", BetterIframe);
