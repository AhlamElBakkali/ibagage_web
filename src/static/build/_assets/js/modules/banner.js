
class Banner extends HTMLElement {

  constructor() {
    super()
    this.queryParams = {}
  }

  get closeButton() {
    return this.querySelector('[data-trigger=close]')
  }

  handleDefaultVisibility() {
    this.queryParams = new URLSearchParams(window.location.search)
    if (this.queryParams.has('banner') && this.queryParams.get('banner') != '' && this.queryParams.get('banner') == this.id ) {
      this.showBanner()
    }
  }

  hideBanner() {
    this.classList.add('hidden')
  }

  showBanner() {
    this.classList.remove('hidden')
  }

  handleCloseButton(e) {
    this.hideBanner()
    this.queryParams.delete('banner')
    window.location.search = this.queryParams.toString()
  }

  connectedCallback() {
    this.bind()
    this.handleDefaultVisibility()
  }

  bind() {
    this.closeButton.addEventListener('click', e => this.handleCloseButton(e))
  }

}

customElements.define('c-banner', Banner);
