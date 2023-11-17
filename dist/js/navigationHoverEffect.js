export default class NavigationHoverEffect {
  constructor(navElement, opacityOnHover, opacityOnMouseOut) {
    this.nav = navElement;
    this.navLinks = this.nav.querySelectorAll('.nav__link');
    this.logo = this.nav.querySelector('img');
    this.opacityOnHover = opacityOnHover;
    this.opacityOnMouseOut = opacityOnMouseOut;
    this.handleHover = this.handleHover.bind(this);
    this.setupHoverEvents();
  }

  handleHover(e) {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');

      siblings.forEach(el => {
        if (el !== link) el.style.opacity = this.opacityOnHover;
      });
      this.logo.style.opacity = this.opacityOnHover;
    }
  }

  setupHoverEvents() {
    this.nav.addEventListener('mouseover', this.handleHover);
    this.nav.addEventListener('mouseout', () => {
      this.navLinks.forEach(link => {
        link.style.opacity = this.opacityOnMouseOut;
      });
      this.logo.style.opacity = this.opacityOnMouseOut;
    });
  }
}

// Assuming 'nav' is the DOM element you want to attach this behavior to
const navElement = document.querySelector('.nav');

// Instantiate the NavigationHoverEffect class with opacity values
const navigationHoverEffect = new NavigationHoverEffect(navElement, 0.5, 1);
