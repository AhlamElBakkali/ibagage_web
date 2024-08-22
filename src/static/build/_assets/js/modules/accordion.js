class Accordion extends HTMLElement {
  connectedCallback() {
    this.addEventListener("click", (e) => {
      const titleElement = e.target.closest("[data-title]");
      if (titleElement) {
        this.toggleContent(titleElement);
      }
    });
  }

  toggleContent(titleElement) {
    const articleElement = titleElement.closest("article");
    const currentActive = this.querySelector("article.-active");

    if (currentActive && currentActive !== articleElement) {
      currentActive.classList.remove("-active");
    }

    articleElement.classList.toggle("-active");
  }
}

customElements.define("c-accordion", Accordion);
