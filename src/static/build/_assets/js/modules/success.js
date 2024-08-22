class Success extends HTMLElement {

  get messageNode() {
    return this.querySelector('[data-render=message]')
  }

  showMessage(message) {
      this.messageNode.innerText = message;
  }

  connectedCallback() {
      const urlParams = new URLSearchParams(window.location.search)
      const param = urlParams.get('message')
      if (param) {
          this.showMessage(param)
      }
  }

}

customElements.define('c-success', Success);
