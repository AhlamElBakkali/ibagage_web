class Secondarymenu extends HTMLElement {
  constructor() {
    super();
  }

  get buttonSecondaryMenu() {
    return this.querySelector('[data-trigger="toggleSecondaryMenu"]');
  }

  get secondaryMenuContent() {
    return this.querySelector('[data-trigger="toggleSecondaryMenu"] + ul');
  }

  bind() {
    this.buttonSecondaryMenu.addEventListener("click", () => {
      this.secondaryMenuContent.classList.toggle("isOpen");
    });
  }

  connectedCallback() {
    this.bind();
  }
}

customElements.define("m-secondarymenu", Secondarymenu);
