
class Blockquote extends HTMLElement {

  constructor() {
    super()
    this.cycleIntervalTime = 5000
    this.cycleDelayTime = 5000
    this.cycleInterval = null
    this.cycleDelayInterval = null
    this.currentSlide = 0
  }

  get slides() {
    return this.querySelectorAll('[data-slide]')
  }

  get previews() {
    return this.querySelectorAll('[data-preview]')
  }

  get activeSlide() {
    return this.querySelector('[data-slide].-active')
  }

  get activePreview() {
    return this.querySelector('[data-preview].-active')
  }

  connectedCallback() {
    this.setDefaultSlide()
    this.startCycle()
    this.bind()
  }

  bind() {
    this.previews.forEach((preview, idx) => {
      preview.addEventListener('click', e => {
        this.setSlide(idx)
        e.preventDefault()
      })
    })
  }

  setDefaultSlide() {
    this.slides[0].classList.add('-active');
    this.previews[0].classList.add('-active');
    this.currentSlide = 0
  }

  setNextSlide() {
    let slidesLenght = this.slides.length
    let next = (this.currentSlide == slidesLenght-1) ? 0 : this.currentSlide+1;

    this.activeSlide.classList.remove('-active')
    this.activePreview.classList.remove('-active')

    this.slides[next].classList.add('-active');
    this.previews[next].classList.add('-active');

    this.currentSlide = next
  }

  setSlide(idx) {
    this.stopCycle()
    this.currentSlide = idx-1
    this.setNextSlide()
    this.startCycle()
  }

  startCycle() {
    this.cycleDelay = setTimeout(() => {
      this.cycleInterval = setInterval(()=> {
        this.setNextSlide()
      }, this.cycleIntervalTime)
    }, this.cycleDelayTime)
  }

  stopCycle() {
    clearInterval(this.cycleInterval)
    clearTimeout(this.cycleDelay)
  }

}

customElements.define('c-blockquote', Blockquote);
