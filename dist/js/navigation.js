export default class Navigation {
  constructor() {
    this.navLinks = document.querySelector('.nav__links');
    this.navLinksAll = document.querySelectorAll('.navigation__list');
    this.btnScrollTo = document.querySelector('.btn--scroll-to');
    this.solutions = document.querySelector('#solutions');
    this.nav = document.querySelector('.nav');
    this.navLink = document.querySelector('.nav__link');
    this.checkBox = document.querySelector(`#navi-toggle`);
    this.header = document.querySelector('.header');
    this.logo = this.nav.querySelector('nav__logo');
    this.navHeight = this.nav.getBoundingClientRect().height;

    this.setupNavigation();
    this.setupHoverEvents();
    this.setupStickyHeader();
    this.setupResponsiveNav();
  }

  // Responsive Nav
  setupResponsiveNav() {
    // Initially hide the navigation list
    this.navLinksAll.forEach(box => {
      box.style.display = 'none';
    });

    this.checkBox.addEventListener('change', () => {
      // Toggle the visibility of the navigation list based on checkbox state
      this.navLinksAll.forEach(box => {
        box.style.display = this.checkBox.checked ? 'block' : 'none';
      });
    });

    this.navLinksAll.forEach(box => {
      box.addEventListener('click', () => {
        // Close the navigation when a link is clicked
        this.checkBox.checked = false;
      });
    });
  }

  // Smooth Scrolling
  handleLinkClick = e => {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  };

  handleScrollButtonClick = () => {
    this.solutions.scrollIntoView({ behavior: 'smooth' });
  };

  setupNavigation() {
    this.navLinks.addEventListener('click', this.handleLinkClick);
    this.btnScrollTo.addEventListener('click', this.handleScrollButtonClick);

    // Add event listener for smooth scroll to the top when clicking on the logo
    const logoLink = document.querySelector('.nav__link--home');
    logoLink.addEventListener('click', e => {
      e.preventDefault();
      document.body.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Sub Menus
  handleHover = (menuItem, submenu) => {
    menuItem.addEventListener('mouseenter', () => {
      submenu.style.display = 'block';
    });

    menuItem.addEventListener('mouseleave', () => {
      submenu.style.display = 'none';
    });
  };

  setupHoverEvents() {
    const hasSubsolutions = document.querySelector('.nav__has__sub--solutions');
    const hasSubaudits = document.querySelector('.nav__has__sub--audits');
    const hasSubManagement = document.querySelector(
      '.nav__has__sub--management'
    );
    const navSubsolutions = document.querySelector('.nav__sub--solutions');
    const navSubAudits = document.querySelector('.nav__sub--audits');
    const navSubManagement = document.querySelector('.nav__sub--management');

    this.handleHover(hasSubsolutions, navSubsolutions);
    this.handleHover(hasSubaudits, navSubAudits);
    this.handleHover(hasSubManagement, navSubManagement);
  }

  // Sticky Nav
  stickyNav(entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      this.nav.classList.add('sticky');
    } else {
      this.nav.classList.remove('sticky');
    }
  }

  setupStickyHeader() {
    const headerObserver = new IntersectionObserver(this.stickyNav.bind(this), {
      root: null,
      threshold: 0,
      rootMargin: `-${this.navHeight}px`,
    });
    headerObserver.observe(this.header);
  }
}
