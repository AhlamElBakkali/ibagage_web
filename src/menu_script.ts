var e, t, s, i, o; e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}, t = {}, s = {}, null == (i = e.parcelRequire94c2) && ((i = function (e) { if (e in t) return t[e].exports; if (e in s) { var i = s[e]; delete s[e]; var o = { id: e, exports: {} }; return t[e] = o, i.call(o.exports, o, o.exports), o.exports } var r = Error("Cannot find module '" + e + "'"); throw r.code = "MODULE_NOT_FOUND", r }).register = function (e, t) { s[e] = t }, e.parcelRequire94c2 = i), (o = i.register)("iabPP", function (e, t) { i("7oyeI"), i("2ZcpR"), i("i77pL"), i("6vcqP"), i("g7m2H"), i("aWGtl"), i("9TQeq"), i("kK3lH"), i("6lnS6"), i("4r6RI"), i("2z75a"), i("5gQD3"), i("5g7S1") }), o("7oyeI", function (e, t) { class s extends HTMLElement { connectedCallback() { this.addEventListener("click", e => { let t = e.target.closest("[data-title]"); t && this.toggleContent(t) }) } toggleContent(e) { let t = e.closest("article"), s = this.querySelector("article.-active"); s && s !== t && s.classList.remove("-active"), t.classList.toggle("-active") } } customElements.define("c-accordion", s) }), o("2ZcpR", function (e, t) { class s extends HTMLElement { constructor() { super(), this.queryParams = {} } get closeButton() { return this.querySelector("[data-trigger=close]") } handleDefaultVisibility() { this.queryParams = new URLSearchParams(window.location.search), this.queryParams.has("banner") && "" != this.queryParams.get("banner") && this.queryParams.get("banner") == this.id && this.showBanner() } hideBanner() { this.classList.add("hidden") } showBanner() { this.classList.remove("hidden") } handleCloseButton(e) { this.hideBanner(), this.queryParams.delete("banner"), window.location.search = this.queryParams.toString() } connectedCallback() { this.bind(), this.handleDefaultVisibility() } bind() { this.closeButton.addEventListener("click", e => this.handleCloseButton(e)) } } customElements.define("c-banner", s) }), o("i77pL", function (e, t) { class s extends HTMLElement { constructor() { super(), this.cycleIntervalTime = 5e3, this.cycleDelayTime = 5e3, this.cycleInterval = null, this.cycleDelayInterval = null, this.currentSlide = 0 } get slides() { return this.querySelectorAll("[data-slide]") } get previews() { return this.querySelectorAll("[data-preview]") } get activeSlide() { return this.querySelector("[data-slide].-active") } get activePreview() { return this.querySelector("[data-preview].-active") } connectedCallback() { this.setDefaultSlide(), this.startCycle(), this.bind() } bind() { this.previews.forEach((e, t) => { e.addEventListener("click", e => { this.setSlide(t), e.preventDefault() }) }) } setDefaultSlide() { this.slides[0].classList.add("-active"), this.previews[0].classList.add("-active"), this.currentSlide = 0 } setNextSlide() { let e = this.slides.length, t = this.currentSlide == e - 1 ? 0 : this.currentSlide + 1; this.activeSlide.classList.remove("-active"), this.activePreview.classList.remove("-active"), this.slides[t].classList.add("-active"), this.previews[t].classList.add("-active"), this.currentSlide = t } setSlide(e) { this.stopCycle(), this.currentSlide = e - 1, this.setNextSlide(), this.startCycle() } startCycle() { this.cycleDelay = setTimeout(() => { this.cycleInterval = setInterval(() => { this.setNextSlide() }, this.cycleIntervalTime) }, this.cycleDelayTime) } stopCycle() { clearInterval(this.cycleInterval), clearTimeout(this.cycleDelay) } } customElements.define("c-blockquote", s) }), o("6vcqP", function (e, t) {
    class s extends HTMLElement {
        get closeButton() { return this.querySelector("[data-trigger=close]") } closeDialog(e) {
            window.location.pathname; var t = window.scrollY;// When closing there is a buggy # left.
            // Having a <base> tag during migration brings odd behaviours if we try to remove it programatically
            // For now we live with the buggy # until we finish the migration.
            window.location.hash = ""// hides the modal
                , window.scroll(0, t)// makes sure scroll does not move
                , e.preventDefault()
        } connectedCallback() { this.bind() } bind() { this.closeButton.addEventListener("click", e => { this.closeDialog(e) }) }
    } customElements.define("c-dialog", s)
}), o("g7m2H", function (e, t) {
    class s extends HTMLElement {
        constructor() {
            super(), this.props = { activeMenu: "main", activePillClass: "--active", arrowDirection: "", arrowPosition: 0, baseClass: "js-header", bodyOpenClass: "--header-open", hiddenClass: "--hidden", isHandheld: !1, isPopoverOpen: !1, openClass: "--open", lastScrollY: 0, headerVisible: !0, headerVisibleClass: "--hide", scrollClass: "--scroll" },// Props Proxy to observe prop changes
            this.propsProxy = new Proxy(this.props, {
                set: (e, t, s) => {
                    let i = e[t]; return (// Set new value
                        e[t] = s,// Handle prop changes
                        this.propsHandler(t, s, i), !0)
                }
            }), this.els = { arrow: this.querySelector(`.${this.props.baseClass}-arrow`), closeButton: this.querySelector(`.${this.props.baseClass}-close`), navigation: this.querySelector(`.${this.props.baseClass}-nav`), navigationMenus: this.querySelectorAll(`.${this.props.baseClass}-nav-menu`), navigationTriggers: this.querySelectorAll(`.${this.props.baseClass}-nav-trigger`), openButton: this.querySelector(`.${this.props.baseClass}-open`), popover: this.querySelector(`.${this.props.baseClass}-popover`), popoverSections: this.querySelectorAll(`.${this.props.baseClass}-popover-section`) }
        } changeArrowDirection() { if (!this.props.arrowDirection) return; let e = "--left", t = "--right", s = { left: { add: e, remove: t }, right: { add: t, remove: e } }, i = this.els.popover.classList, o = e => s[this.props.arrowDirection][e]; i.remove(o("remove")), i.add(o("add")) } handleScroll() {
            let { lastScrollY: e, baseClass: t, scrollClass: s } = this.props, i = window.scrollY, o = i > e, r = this.offsetHeight, n = this.parentElement.nextElementSibling && "m-secondarymenu" === this.parentElement.nextElementSibling.tagName.toLowerCase() ? this.parentElement.nextElementSibling.offsetHeight : 0, a = "v3" === document.querySelector(`.${t}`).parentElement.id ? document.querySelector(`.${t}`).parentElement : document.querySelector(`.${t}`);// Si el scroll es 0, quita todas las clases
            if (0 === i) {
                a.classList.remove(`${s}`, `${s}-up`), this.propsProxy.headerVisible = !0; return;// Termina la ejecución aquí
            } o && i > r + n ? this.props.headerVisible && (this.propsProxy.headerVisible = !1, a.classList.remove(`${s}-up`), a.classList.add(`${s}`)) : o || !(i > 0) || this.props.headerVisible || (this.propsProxy.headerVisible = !0, a.classList.remove(`${s}`), a.classList.add(`${s}-up`)),// Actualiza la última posición de scroll
                this.propsProxy.lastScrollY = i
        } changeArrowPosition() { this.els.arrow.style.transform = `translate(${parseInt(this.props.arrowPosition)}px)` } closePopover() { document.body.classList.remove(this.props.bodyOpenClass), this.classList.remove(this.props.openClass), this.els.popover.classList.remove("--left", "--right") } getActiveMenu() { return Array.from(this.els.navigationMenus).filter(e => e.dataset.headerMenu === this.props.activeMenu)[0] } getArrowPosition() {// Don't move arrow if is tablet or lower
            if (this.props.isHandheld) return; let e = window.innerWidth, t = Array.from(this.els.navigationTriggers).filter(e => e.dataset.headerMenu === this.props.activeMenu)[0], { width: s, x: i } = t.getBoundingClientRect(); return -((e / 2 - (i + s / 2)) * 1)
        } hidePill(e, t) { let s = e.querySelector(".js-header-popover-pill"); s.classList.remove(this.props.activePillClass) } navigationHandler(e) { if (!e.target.classList.contains(`${this.props.baseClass}-nav-trigger`)) return; let t = e.target.dataset.headerMenu; this.propsProxy.isPopoverOpen = !0, this.propsProxy.activeMenu = t } openPopover() { document.body.classList.add(this.props.bodyOpenClass), this.classList.add(this.props.openClass) } propsHandler(e, t, s) { "activeMenu" === e && this.toggleMenu(), "arrowDirection" === e && this.changeArrowDirection(), "arrowPosition" === e && this.changeArrowPosition(), "isPopoverOpen" === e && this.togglePopover() } resizeHandler() { this.setHandheld(), this.props.isPopoverOpen && (this.setArrowPosition(), this.setPopoverHeight()) } setArrowDirection(e) { this.propsProxy.arrowDirection = this.propsProxy.arrowPosition > e ? "right" : "left" } setArrowPosition() { let e = this.props.arrowPosition, t = this.getArrowPosition(); this.propsProxy.arrowPosition = t, this.setArrowDirection(e) } setHandheld() { this.propsProxy.isHandheld = window.innerWidth <= 1080 } setPopoverHeight(e) { if (this.props.isHandheld) return; e = e || this.getActiveMenu(); let t = e.getBoundingClientRect().height; this.els.popover.style.height = `${t}px` } hideLinksHeader() { let e = new URLSearchParams(window.location.search), t = e.get("nav"); t && t.includes("hidden") && document.body.classList.add("--nav-hidden") } showPill(e, t) { let s = t.target.classList.contains(`${this.props.baseClass}-popover-link`), i = e.querySelector(".js-header-popover-pill"); if (!s || this.props.isHandheld) { i.classList.remove(this.props.activePillClass); return }/* Get link's relative position */let { offsetLeft: o, offsetTop: r, offsetParent: { offsetLeft: n, offsetTop: a } } = t.target, l = { x: n + o, y: a + r }; i.classList.add(this.props.activePillClass), i.style.transform = `translate(${parseInt(l.x)}px, ${parseInt(l.y)}px)` } hideAllMenus() { this.els.navigationMenus.forEach(e => { e.classList.add(this.props.hiddenClass), e.setAttribute("aria-hidden", "true") }) } toggleMenu() {
            let e = this.getActiveMenu();// Hide all menus
            this.hideAllMenus(), e && (// Show active menu
                e.classList.remove(this.props.hiddenClass), e.setAttribute("aria-hidden", "false"),// Set popover arrow position
                this.setArrowPosition(),// Set new popover height
                this.setPopoverHeight(e),// Set menu ID in header node
                this.dataset.headerMenu = this.props.activeMenu)
        } togglePopover() { this.props.isPopoverOpen ? this.openPopover() : this.closePopover() } bindEvents() { window.addEventListener("resize", e => this.resizeHandler()), this.classList.contains("-nav-hidden") ? (console.log(this.parentElement), this.parentElement.setAttribute("style", "position: relative")) : window.addEventListener("scroll", e => this.handleScroll()), this.props.isHandheld ? (this.els.popover.addEventListener("click", e => this.navigationHandler(e)), this.els.closeButton.addEventListener("click", () => this.propsProxy.isPopoverOpen = !1), this.els.openButton.addEventListener("click", () => this.propsProxy.isPopoverOpen = !0)) : (this.els.navigation.addEventListener("mouseover", e => this.navigationHandler(e)), this.addEventListener("mouseleave", e => this.propsProxy.isPopoverOpen = !1), this.els.popoverSections.forEach(e => { e.addEventListener("mouseover", t => this.showPill(e, t)), e.addEventListener("mouseout", t => this.hidePill(e, t)) })) } connectedCallback() { this.hideLinksHeader(), this.setHandheld(), this.bindEvents() }
    } customElements.define("m-header", s)
}), o("aWGtl", function (e, t) {
    class s extends HTMLElement {
        constructor() {
            super(),// Inicialización de referencias a elementos del DOM
            this.els = {}
        }// Método para añadir listeners y lógica inicial
        init() {// Listener para cambios en el selector de país
            this.els.countrySelector = this.querySelector('[data-trigger="countrySelector"]'), this.els.countrySelector && (this.els.countrySelector.addEventListener("change", e => { window.location.href = e.target.value }), this.renderCurrentCountry()),// Listener para el toggle de contenido en headers
                this.els.headers = this.querySelectorAll(".m-footer__group header"), this.els.headers.forEach(e => { e.addEventListener("click", () => { if (window.innerWidth < 767) { let t = e.parentElement; t.classList.toggle("--show"); let s = t.querySelector(".e-icon"); s && (s.classList.toggle("-direction_down_md"), s.classList.toggle("-direction_up_md")); let i = t.querySelector(".m-footer__content"); if (t.classList.contains("--show")) { let e = i.scrollHeight + "px"; i.style.maxHeight = e } else i.style.maxHeight = null } }) })
        }// Método para seleccionar el país actual basado en la URL
        renderCurrentCountry() { let e = /^\/(\w{2})/; if (e.test(window.location.pathname)) { let t = e.exec(window.location.pathname)[1], s = this.els.countrySelector.querySelector(`[value^="/${t}"]`); s && s.setAttribute("selected", !0) } }// Método del ciclo de vida llamado cuando el elemento se conecta al DOM
        connectedCallback() { this.init() }
    } customElements.define("m-footer", s)
}), o("9TQeq", function (e, t) { class s extends HTMLElement { constructor() { super() } get buttonSecondaryMenu() { return this.querySelector('[data-trigger="toggleSecondaryMenu"]') } get secondaryMenuContent() { return this.querySelector('[data-trigger="toggleSecondaryMenu"] + ul') } bind() { this.buttonSecondaryMenu.addEventListener("click", () => { this.secondaryMenuContent.classList.toggle("isOpen") }) } connectedCallback() { this.bind() } } customElements.define("m-secondarymenu", s) }), o("kK3lH", function (e, t) {
    document.addEventListener("DOMContentLoaded", function () {
        let e = document.querySelectorAll(".-subdued"); if (0 !== e.length) for (let t = 0; t < e.length; t++) {
            let s = e[t], i = e[t + 1]; if (i && i.previousElementSibling === s) {
                s.classList.add("-firstchild"); let o = t; for (; i && i.previousElementSibling === s;)t++, s = i, i = e[t + 1]; s.classList.add("-lastchild");// Aplicar la clase '-middlechild' a los elementos entre el primero y el último
                for (let s = o + 1; s < t; s++)e[s].classList.add("-middlechild")
            }
        }
    })
}), o("6lnS6", function (e, t) { class s extends HTMLElement { get messageNode() { return this.querySelector("[data-render=message]") } showMessage(e) { this.messageNode.innerText = e } connectedCallback() { let e = new URLSearchParams(window.location.search), t = e.get("message"); t && this.showMessage(t) } } customElements.define("c-success", s) }), o("4r6RI", function (e, t) { class s extends HTMLElement { get videoCover() { return this.querySelector('[data-node="youtubeCover"]') } get videoSrc() { return this.videoCover.getAttribute("data-video") } get videoFrame() { return this.querySelector('[data-node="youtubeIframe"]') } hideCover() { this.videoCover.classList.add("fade-out") } addIframeSrc() { this.hideCover(), this.videoFrame.src = this.videoSrc + "&autoplay=1" } connectedCallback() { this.bind() } bind() { this.videoCover.addEventListener("click", e => this.addIframeSrc(e)) } } customElements.define("c-youtube-video", s) }), o("2z75a", function (e, t) {
    class s extends HTMLElement {
        constructor() { super(), this.initializeComponent() } initializeComponent() { this.hasConsent() ? this.noShowCookies() : (this.isTargetActive() && this.hideBanner(), this.showCookies(), this.setupCloseButtonListener(), this.addEventListeners()) } isTargetActive() {
            let e = document.getElementById("cookiedialog"); if (!e) return !1; let t = window.location.hash;// Obtiene el fragmento del URL actual
            return t === `#${e.id}`
        } hasConsent() { let e = JSON.parse(localStorage.getItem("cookie_acceptance")); return null !== e && "ad_user_data" in e }// If we need to check the cookie instead of localstorage  
        //  hasConsent() {
        //  return document.cookie.includes("cookie_acceptance");
        //  }
        addEventListeners() { this.addEventListener("click", e => { this.handleButtonClick(e) }) } handleButtonClick(e) { let t = e.target.dataset.trigger; switch (t) { case "save": this.saveConsentAndCloseBanner(), this.sendGTM("launch_gtm"); break; case "saveall": this.saveAll(), this.saveConsentAndCloseBanner(), this.sendGTM("launch_gtm"); break; case "deniedall": this.deniedall(), this.noShowCookies(), this.sendGTM("cookie_denied"); break; case "savedialog": this.closeDialog(), this.saveConsent(), this.noShowCookies(), this.sendGTM("launch_gtm"); break; case "openpreferences": this.openPreferences(), this.sendGTM("cookies_dialog_open"); break; default: "" === e.target.dataset.title && this.toggleContent(e.target) } } saveConsentAndCloseBanner() { this.saveConsent(), this.noShowCookies() } saveAll() { this.querySelectorAll('input[type="checkbox"]').forEach(e => { e.disabled || (e.checked = !0) }) } updateConsent(e) { let t = JSON.parse(localStorage.getItem("cookie_acceptance")) || {}, s = new Date().getTime(), i = { consent_date_first: t.consent_date_first || s, consent_update: s }; return this.querySelectorAll('input[type="checkbox"]').forEach(t => { let s = t.getAttribute("data-name"); i[s] = e(t) }), localStorage.setItem("cookie_acceptance", JSON.stringify(i)), i } deniedall() {
            this.updateConsent(e => e.disabled ? "granted" : "denied"), this.noShowCookies();//    this.saveCookie(); 
        } saveConsent() {
            this.updateConsent(e => e.checked ? "granted" : "denied"), this.sendGTM("cookie_acceptance");//    this.saveCookie(); 
        }//    saveCookie() {
        //      const consent = JSON.parse(localStorage.getItem("cookie_acceptance")) || {};
        //      const expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year expiry
        //  
        //      document.cookie = `cookie_acceptance=${JSON.stringify(consent)}; domain:.cabify.com; expires=${expiryDate.toUTCString()}; path=/`;
        //  }
        closeDialog() { let e = window.scrollY; window.location.hash = "", window.scroll(0, e) } setupCloseButtonListener() { let e = document.querySelector('#cookiedialog [title="Cerrar"]'); e && e.addEventListener("click", e => { this.toggleCookies() }) } openPreferences() { this.hideBanner(), window.location.hash = "cookiedialog" } noShowCookies() { document.querySelector("c-cookies").classList.add("-hidden") } showCookies() { document.querySelector("c-cookies").classList.remove("-hidden"), this.sendGTM("cookies_banner_open") } toggleCookies() { document.querySelector(".banner").classList.toggle("-hidden") } hideBanner() { document.querySelector(".banner").classList.add("-hidden") } toggleContent(e) { let t = e.closest("article"), s = this.querySelector("article.-active"); s && s !== t && s.classList.remove("-active"), t.classList.toggle("-active") } sendGTM(e, t) { void 0 !== window.dataLayer ? (window.dataLayer = window.dataLayer || [], t ? window.dataLayer.push({ event: e, value: t }) : window.dataLayer.push({ event: e })) : console.log("GTM no est\xe1 definido a\xfan.") }
    } customElements.define("c-cookies", s)
}), o("5gQD3", function (e, t) {/*

  Script to propagate all query params in the current url to any link clicked on the page.
  This help us minimise duplicated pages on Google Search and allow us to have complete tracing of campaign visitors that browse our site.
  More info: https://developers.google.com/search/blog/2007/09/google-duplicate-content-caused-by-url

*/let s = new URLSearchParams(window.location.search); function i(e) { if (!s.toString()) return e; let t = -1 != e.indexOf("?") ? "&" : "?", i = new URLSearchParams; for (let [e, t] of s.entries()) "message" !== e && i.append(e, t); let o = decodeURIComponent(i.toString()).replace(/\?/g, "&"); return `${e}${t}${o}` }// Delegate click on every <a/> tag instead of attaching individual listeners to avoid performance issues:
    document.body.addEventListener("click", e => {// Support <a/> tags with child elements
        let t = "A" === e.target.tagName ? e.target : event.target.closest("a");/*
    Make sure we have a valid target, with href attribute.
    Make sure we have query params to append.
  */if (t && t.hasAttribute("href") && "" !== s.toString()) { let e = t.getAttribute("href"); (-1 != e.indexOf("cabify.com") || e.startsWith("/")) && t.setAttribute("href", i(e)) }
    });// Propagate query params to heroiframe component
    // Make sure we have query params and a heroiframe component on the page
    let o = document.querySelector("[data-select=heroiframe]"); "" !== s.toString() && o && o.setAttribute("src", i(o.src))
}), o("5g7S1", function (e, t) {// Delegate click on every <a/> tag instead of attaching individual listeners to avoid performance issues:
    document.body.addEventListener("click", e => {// Support <a/> tags with child elements
        let t = "A" === e.target.tagName ? e.target : event.target.closest("a");// Make sure we have a valid target, with href attribute.
        if (t && t.hasAttribute("href")) {
            let s = t.getAttribute("href"), i = -1 != s.indexOf("cabify.com") || s.startsWith("/"), o = s.startsWith("/static/downloads/") && s.lastIndexOf("."), r = s.lastIndexOf(".pdf") > -1, n = s.startsWith("#"); if ((o || r) && t.setAttribute("download", ""), i || t.setAttribute("target", "_blank"), n) {
                e.preventDefault();// Scroll to the target anchor
                let t = document.querySelector(s); t && t.scrollIntoView({ behavior: "smooth" })
            }
        }
    })
}),  i("iabPP");//# sourceMappingURL=main.js.map

//# sourceMappingURL=main.js.map