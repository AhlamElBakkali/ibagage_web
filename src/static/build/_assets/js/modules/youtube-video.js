class YouTubeVideo extends HTMLElement {

    get videoCover() {
        return this.querySelector('[data-node="youtubeCover"]')
    }

    get videoSrc() {
        return this.videoCover.getAttribute('data-video')
    }

    get videoFrame() {
        return this.querySelector('[data-node="youtubeIframe"]')
    }

    hideCover() {
        this.videoCover.classList.add('fade-out')
    }
  
    addIframeSrc() {
        this.hideCover()
        this.videoFrame.src = this.videoSrc + '&autoplay=1'
    }

    connectedCallback() {
        this.bind()
    }

    bind() {
        this.videoCover.addEventListener('click', e => this.addIframeSrc(e))
    }

  }
  customElements.define('c-youtube-video', YouTubeVideo);