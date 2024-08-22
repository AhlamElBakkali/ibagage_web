class Header extends HTMLElement {
  constructor() {
    super();

    this.props = {
      activeMenu: "main",
      activePillClass: "--active",
      arrowDirection: "",
      arrowPosition: 0,
      baseClass: "js-header",
      bodyOpenClass: "--header-open",
      hiddenClass: "--hidden",
      isHandheld: false,
      isPopoverOpen: false,
      openClass: "--open",
      lastScrollY: 0,
      headerVisible: true,
      headerVisibleClass: "--hide",
      scrollClass: "--scroll",
    };

    // Props Proxy to observe prop changes
    this.propsProxy = new Proxy(this.props, {
      set: (target, key, value) => {
        const oldValue = target[key];

        // Set new value
        target[key] = value;

        // Handle prop changes
        this.propsHandler(key, value, oldValue);

        return true;
      },
    });

    this.els = {
      arrow: this.querySelector(`.${this.props.baseClass}-arrow`),
      closeButton: this.querySelector(`.${this.props.baseClass}-close`),
      navigation: this.querySelector(`.${this.props.baseClass}-nav`),
      navigationMenus: this.querySelectorAll(
        `.${this.props.baseClass}-nav-menu`
      ),
      navigationTriggers: this.querySelectorAll(
        `.${this.props.baseClass}-nav-trigger`
      ),
      openButton: this.querySelector(`.${this.props.baseClass}-open`),
      popover: this.querySelector(`.${this.props.baseClass}-popover`),
      popoverSections: this.querySelectorAll(
        `.${this.props.baseClass}-popover-section`
      ),
    };
  }

  changeArrowDirection() {
    if (!this.props.arrowDirection) return;

    const leftClass = "--left";
    const rightClass = "--right";
    const config = {
      left: {
        add: leftClass,
        remove: rightClass,
      },
      right: {
        add: rightClass,
        remove: leftClass,
      },
    };
    const classList = this.els.popover.classList;
    const useConfig = (action) => config[this.props.arrowDirection][action];

    classList.remove(useConfig("remove"));
    classList.add(useConfig("add"));
  }

  handleScroll() {
    const { lastScrollY, baseClass, scrollClass } = this.props;
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;
    const headerHeight = this.offsetHeight; // Altura del encabezado para consideraciones adicionales
    const siblingHeaderHeight = this.parentElement.nextElementSibling && this.parentElement.nextElementSibling.tagName.toLowerCase() === 'm-secondarymenu'
    ? this.parentElement.nextElementSibling.offsetHeight
    : 0;
    const totalHeight = headerHeight + siblingHeaderHeight;
    const menu = document.querySelector(`.${baseClass}`).parentElement.id === "v3"
    ?  document.querySelector(`.${baseClass}`).parentElement
    :  document.querySelector(`.${baseClass}`);

    // Si el scroll es 0, quita todas las clases
    if (currentScrollY === 0) {
      menu.classList.remove(`${scrollClass}`, `${scrollClass}-up`);
      this.propsProxy.headerVisible = true; // Asumiendo que propsProxy actualiza tu estado correctamente
      return; // Termina la ejecución aquí
    }

    // Comportamiento cuando se desplaza hacia abajo y supera totalHeight
    if (scrollingDown && currentScrollY > totalHeight) {
      if (this.props.headerVisible) {
        this.propsProxy.headerVisible = false; // Actualiza el estado
        menu.classList.remove(`${scrollClass}-up`);
        menu.classList.add(`${scrollClass}`);
      }
    } else if (!scrollingDown && currentScrollY > 0) {
      // Comportamiento cuando se desplaza hacia arriba y no está en 0
      if (!this.props.headerVisible) {
        this.propsProxy.headerVisible = true; // Actualiza el estado
        menu.classList.remove(`${scrollClass}`);
        menu.classList.add(`${scrollClass}-up`);
      }
    }

    // Actualiza la última posición de scroll
    this.propsProxy.lastScrollY = currentScrollY;
  }

  changeArrowPosition() {
    this.els.arrow.style.transform = `translate(${parseInt(
      this.props.arrowPosition
    )}px)`;
  }

  closePopover() {
    document.body.classList.remove(this.props.bodyOpenClass);
    this.classList.remove(this.props.openClass);
    this.els.popover.classList.remove("--left", "--right");
  }

  getActiveMenu() {
    return Array.from(this.els.navigationMenus).filter((menu) => {
      return menu.dataset.headerMenu === this.props.activeMenu;
    })[0];
  }

  getArrowPosition() {
    // Don't move arrow if is tablet or lower
    if (this.props.isHandheld) return;

    const viewportWidth = window.innerWidth;
    const activeTrigger = Array.from(this.els.navigationTriggers).filter(
      (trigger) => {
        return trigger.dataset.headerMenu === this.props.activeMenu;
      }
    )[0];
    const viewportCenter = viewportWidth / 2;
    const { width, x } = activeTrigger.getBoundingClientRect();
    const triggerPosition = x + width / 2;
    const arrowPosition = (viewportCenter - triggerPosition) * -1;

    return arrowPosition;
  }

  hidePill(section, e) {
    const pill = section.querySelector(".js-header-popover-pill");

    pill.classList.remove(this.props.activePillClass);
  }

  navigationHandler(e) {
    if (!e.target.classList.contains(`${this.props.baseClass}-nav-trigger`))
      return;

    const menuId = e.target.dataset.headerMenu;
    this.propsProxy.isPopoverOpen = true;
    this.propsProxy.activeMenu = menuId;
  }

  openPopover() {
    document.body.classList.add(this.props.bodyOpenClass);
    this.classList.add(this.props.openClass);
  }

  propsHandler(prop, newValue, oldValue) {
    if (prop === "activeMenu") this.toggleMenu();
    if (prop === "arrowDirection") this.changeArrowDirection();
    if (prop === "arrowPosition") this.changeArrowPosition();
    if (prop === "isPopoverOpen") this.togglePopover();
  }

  resizeHandler() {
    this.setHandheld();

    if (this.props.isPopoverOpen) {
      this.setArrowPosition();
      this.setPopoverHeight();
    }
  }

  setArrowDirection(arrowOldPosition) {
    this.propsProxy.arrowDirection =
      this.propsProxy.arrowPosition > arrowOldPosition ? "right" : "left";
  }

  setArrowPosition() {
    const arrowOldPosition = this.props.arrowPosition;
    const arrowPosition = this.getArrowPosition();
    this.propsProxy.arrowPosition = arrowPosition;

    this.setArrowDirection(arrowOldPosition);
  }

  setHandheld() {
    this.propsProxy.isHandheld = window.innerWidth <= 1080;
  }

  setPopoverHeight(activeMenu) {
    if (this.props.isHandheld) return;

    activeMenu = activeMenu || this.getActiveMenu();
    const menuHeight = activeMenu.getBoundingClientRect().height;

    this.els.popover.style.height = `${menuHeight}px`;
  }

  hideLinksHeader() {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get("nav");
    if (param && param.includes("hidden")) {
      document.body.classList.add("--nav-hidden");
    }
  }

  showPill(section, e) {
    const isLink = e.target.classList.contains(
      `${this.props.baseClass}-popover-link`
    );
    const pill = section.querySelector(".js-header-popover-pill");

    if (!isLink || this.props.isHandheld) {
      pill.classList.remove(this.props.activePillClass);
      return;
    }

    /* Get link's relative position */
    const {
      offsetLeft,
      offsetTop,
      offsetParent: {
        offsetLeft: sectionOffsetLeft,
        offsetTop: sectionOffsetTop,
      },
    } = e.target;

    const pillPosition = {
      x: sectionOffsetLeft + offsetLeft,
      y: sectionOffsetTop + offsetTop,
    };

    pill.classList.add(this.props.activePillClass);
    pill.style.transform = `translate(${parseInt(pillPosition.x)}px, ${parseInt(
      pillPosition.y
    )}px)`;
  }

  hideAllMenus() {
    this.els.navigationMenus.forEach((menu) => {
      menu.classList.add(this.props.hiddenClass);
      menu.setAttribute("aria-hidden", "true");
    });
  }

  toggleMenu() {
    const activeMenu = this.getActiveMenu();

    // Hide all menus
    this.hideAllMenus();

    if (!activeMenu) return;

    // Show active menu
    activeMenu.classList.remove(this.props.hiddenClass);
    activeMenu.setAttribute("aria-hidden", "false");

    // Set popover arrow position
    this.setArrowPosition();

    // Set new popover height
    this.setPopoverHeight(activeMenu);

    // Set menu ID in header node
    this.dataset.headerMenu = this.props.activeMenu;
  }

  togglePopover() {
    this.props.isPopoverOpen ? this.openPopover() : this.closePopover();
  }

  bindEvents() {
    window.addEventListener("resize", (e) => this.resizeHandler());
    if (this.classList.contains("-nav-hidden")) {
      console.log(this.parentElement);
      this.parentElement.setAttribute("style", "position: relative");
    } else {
      window.addEventListener("scroll", (e) => this.handleScroll());
    }

    if (!this.props.isHandheld) {
      this.els.navigation.addEventListener("mouseover", (e) =>
        this.navigationHandler(e)
      );
      this.addEventListener(
        "mouseleave",
        (e) => (this.propsProxy.isPopoverOpen = false)
      );
      this.els.popoverSections.forEach((popoverSection) => {
        popoverSection.addEventListener("mouseover", (e) =>
          this.showPill(popoverSection, e)
        );
        popoverSection.addEventListener("mouseout", (e) =>
          this.hidePill(popoverSection, e)
        );
      });
    } else {
      this.els.popover.addEventListener("click", (e) =>
        this.navigationHandler(e)
      );
      this.els.closeButton.addEventListener(
        "click",
        () => (this.propsProxy.isPopoverOpen = false)
      );
      this.els.openButton.addEventListener(
        "click",
        () => (this.propsProxy.isPopoverOpen = true)
      );
    }
  }

  connectedCallback() {
    this.hideLinksHeader();
    this.setHandheld();
    this.bindEvents();
  }
}

customElements.define("m-header", Header);
