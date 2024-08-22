class Dialog extends HTMLElement {

  get closeButton() {
    return this.querySelector('[data-trigger=close]')
  }

  closeDialog(event) {
    var url = window.location.pathname
    var scroll = window.scrollY
    // When closing there is a buggy # left.
    // Having a <base> tag during migration brings odd behaviours if we try to remove it programatically
    // For now we live with the buggy # until we finish the migration.
    window.location.hash = '' // hides the modal
    window.scroll(0, scroll) // makes sure scroll does not move
    event.preventDefault()
  }

  connectedCallback() {
    this.bind()
  }

  bind() {
    this.closeButton.addEventListener('click', e => {
      this.closeDialog(e)
    })
  }

}

customElements.define('c-dialog', Dialog);
