class CookiesUI extends HTMLElement {
  constructor() {
    super();
    this.initializeComponent();
  }
  
  initializeComponent() {
    if (this.hasConsent()) {
      this.noShowCookies();
    } else {
      if (this.isTargetActive()) {
        this.hideBanner();
      };
      this.showCookies();
      this.setupCloseButtonListener();
      this.addEventListeners();
    }
  }

  isTargetActive() {
    const cookieBanner = document.getElementById('cookiedialog');
    if (!cookieBanner) {
      return false;
    }
  
    const currentFragment = window.location.hash; // Obtiene el fragmento del URL actual
    return currentFragment === `#${cookieBanner.id}`;
  }
  
  hasConsent() {
    const cookieAcceptance = JSON.parse(localStorage.getItem("cookie_acceptance"));
    return cookieAcceptance !== null && "ad_user_data" in cookieAcceptance;
}

// If we need to check the cookie instead of localstorage  
//  hasConsent() {
//  return document.cookie.includes("cookie_acceptance");
//  }

  addEventListeners() {
    this.addEventListener("click", (event) => {
      this.handleButtonClick(event);
    });
  }

  handleButtonClick(event) {
    const trigger = event.target.dataset.trigger;
    switch (trigger) {
      case "save":
        this.saveConsentAndCloseBanner();
        this.sendGTM("launch_gtm");
        break;
      case "saveall":
        this.saveAll();
        this.saveConsentAndCloseBanner();
        this.sendGTM("launch_gtm");
        break;
      case "deniedall":
        this.deniedall();
        this.noShowCookies();
        this.sendGTM("cookie_denied");
        break;
      case "savedialog":
        this.closeDialog();
        this.saveConsent();
        this.noShowCookies();
        this.sendGTM("launch_gtm");
        break;
      case "openpreferences":
        this.openPreferences();
        this.sendGTM('cookies_dialog_open');
        break;
      default:
        if (event.target.dataset.title === "") {
          this.toggleContent(event.target);
        }
        break;
    }
  }

  saveConsentAndCloseBanner() {
    this.saveConsent();
    this.noShowCookies();
  }

  saveAll() {
    this.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      if (!checkbox.disabled) {
        checkbox.checked = true;
      }
    });
  }

  updateConsent(checkboxLogic) {
    const currentConsent =
      JSON.parse(localStorage.getItem("cookie_acceptance")) || {};
    const currentTime = new Date().getTime();

    const consent = {
      consent_date_first: currentConsent.consent_date_first || currentTime,
      consent_update: currentTime,
    };

    this.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      const checkboxName = checkbox.getAttribute("data-name");
      consent[checkboxName] = checkboxLogic(checkbox);
    });

    localStorage.setItem("cookie_acceptance", JSON.stringify(consent));
    return consent;
  }

  deniedall() {
    this.updateConsent((checkbox) =>
      checkbox.disabled ? "granted" : "denied"
    );
    this.noShowCookies();
//    this.saveCookie(); 
  }

  saveConsent() {
    const consent = this.updateConsent((checkbox) =>
      checkbox.checked ? "granted" : "denied"
    );
    this.sendGTM("cookie_acceptance");
//    this.saveCookie(); 
  }

//    saveCookie() {
//      const consent = JSON.parse(localStorage.getItem("cookie_acceptance")) || {};
//      const expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year expiry
//  
//      document.cookie = `cookie_acceptance=${JSON.stringify(consent)}; domain:.cabify.com; expires=${expiryDate.toUTCString()}; path=/`;
//  }

  closeDialog() {
    const scrollY = window.scrollY;
    window.location.hash = "";
    window.scroll(0, scrollY);
  }

  setupCloseButtonListener() {
    const buttonClose = document.querySelector('#cookiedialog [title="Cerrar"]');
    if (buttonClose) {
      buttonClose.addEventListener("click", (e) => {
        this.toggleCookies();
      });
    }
  }

  openPreferences() {
    this.hideBanner();
    window.location.hash = 'cookiedialog'; // Cambia el fragmento de URL
  }

  noShowCookies() {
    document.querySelector("c-cookies").classList.add("-hidden");
  }

  showCookies() {
    document.querySelector("c-cookies").classList.remove("-hidden");
    this.sendGTM('cookies_banner_open');
  }
  
  toggleCookies() {
    document.querySelector(".banner").classList.toggle("-hidden");
  }

  hideBanner() {
    document.querySelector(".banner").classList.add("-hidden");

  }

  toggleContent(clickedElement) {
    const articleElement = clickedElement.closest("article");
    const currentActive = this.querySelector("article.-active");

    if (currentActive && currentActive !== articleElement) {
      currentActive.classList.remove("-active");
    }

    articleElement.classList.toggle("-active");
  }
  
  sendGTM(keyEvent, valueEvent) {
    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      if (valueEvent) {
        //console.log(keyEvent, valueEvent);
        window.dataLayer.push({
          event: keyEvent,
          value: valueEvent
        });

      } else {
        //console.log(keyEvent);
        window.dataLayer.push({
          event: keyEvent,
        });
      }
    } else {
      console.log("GTM no está definido aún.");
      // Opcional: podrías reintentar después de un breve retardo
    }

  }
}

customElements.define("c-cookies", CookiesUI);
