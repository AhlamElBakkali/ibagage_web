class MFooter extends HTMLElement {
  constructor() {
    super();

    // Inicialización de referencias a elementos del DOM
    this.els = {};
  }

  // Método para añadir listeners y lógica inicial
  init() {
    // Listener para cambios en el selector de país
    this.els.countrySelector = this.querySelector(
      '[data-trigger="countrySelector"]'
    );
    if (this.els.countrySelector) {
      this.els.countrySelector.addEventListener("change", (event) => {
        window.location.href = event.target.value;
      });
      this.renderCurrentCountry();
    }

    // Listener para el toggle de contenido en headers
    this.els.headers = this.querySelectorAll(".m-footer__group header");
    this.els.headers.forEach((header) => {
      header.addEventListener("click", () => {
        if (window.innerWidth < 767) {
          const group = header.parentElement;
          group.classList.toggle("--show");
          const icon = group.querySelector(".e-icon");
          if (icon) {
            icon.classList.toggle("-direction_down_md");
            icon.classList.toggle("-direction_up_md");
          }
          const content = group.querySelector(".m-footer__content");
          if (group.classList.contains("--show")) {
            const height = content.scrollHeight + "px";
            content.style.maxHeight = height;
          } else {
            content.style.maxHeight = null;
          }
        }
      });
    });
  }

  // Método para seleccionar el país actual basado en la URL
  renderCurrentCountry() {
    const countryCodeRegex = /^\/(\w{2})/;
    if (countryCodeRegex.test(window.location.pathname)) {
      const countryCode = countryCodeRegex.exec(window.location.pathname)[1];
      const optionNode = this.els.countrySelector.querySelector(
        `[value^="/${countryCode}"]`
      );
      if (optionNode) {
        optionNode.setAttribute("selected", true);
      }
    }
  }

  // Método del ciclo de vida llamado cuando el elemento se conecta al DOM
  connectedCallback() {
    this.init();
  }
}

customElements.define("m-footer", MFooter);
