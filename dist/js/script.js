'use strict';

//  Section: Modal window
class Modal {
  constructor() {
    this.modal = document.querySelector('.modal');
    this.overlay = document.querySelector('.overlay');
    this.btnCloseModal = document.querySelector('.btn--close-modal');
    this.btnsOpenModal = document.querySelectorAll('.btn--show-modal');
    this.setupEventListeners();
  }

  openModal = e => {
    e.preventDefault();
    this.modal.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
  };

  closeModal = () => {
    this.modal.classList.add('hidden');
    this.overlay.classList.add('hidden');
  };

  handleKeyPress = e => {
    if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
      this.closeModal();
    }
  };

  setupEventListeners() {
    this.btnsOpenModal.forEach(btn =>
      btn.addEventListener('click', this.openModal)
    );
    this.btnCloseModal.addEventListener('click', this.closeModal);
    this.overlay.addEventListener('click', this.closeModal);
    document.addEventListener('keydown', this.handleKeyPress);
  }
}

// Instantiate the Modal class
const modalInstance = new Modal();

// Section: Page Navigation

class Page {
  constructor() {
    this.navLinks = document.querySelector('.nav__links');
    this.btnScrollTo = document.querySelector('.btn--scroll-to');
    this.section1 = document.querySelector('#section--1');
    this.nav = document.querySelector('.nav');
    this.navLink = document.querySelector('.nav__link');
    this.logo = this.nav.querySelector('img');
    this.header = document.querySelector('.header');
    this.navHeight = this.nav.getBoundingClientRect().height;

    this.setupNavigation();
    this.setupHoverEvents();
    this.setupStickyHeader();
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
    this.section1.scrollIntoView({ behavior: 'smooth' });
  };

  setupNavigation() {
    this.navLinks.addEventListener('click', this.handleLinkClick);
    this.btnScrollTo.addEventListener('click', this.handleScrollButtonClick);
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
    const hasSubOperations = document.querySelector(
      '.nav__has__sub--operations'
    );
    const hasSubManagement = document.querySelector(
      '.nav__has__sub--management'
    );
    const navSubsolutions = document.querySelector('.nav__sub--solutions');
    const navSubOperations = document.querySelector('.nav__sub--operations');
    const navSubManagement = document.querySelector('.nav__sub--management');

    this.handleHover(hasSubsolutions, navSubsolutions);
    this.handleHover(hasSubOperations, navSubOperations);
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

// Instantiate the Page class
const page = new Page();

// Section: Tabed Component

class Tabs {
  constructor() {
    this.tabsContainer = document.querySelector(`.operations__tab-container`);
    this.tabs = document.querySelectorAll(`.operations__tab`);
    this.tabsContent = document.querySelectorAll(`.operations__content`);

    this.setupTabs();
  }

  handleTabClick = e => {
    const clicked = e.target.closest('.operations__tab');
    if (!clicked) return;

    this.tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');

    this.tabsContent.forEach(content =>
      content.classList.remove('operations__content--active')
    );
    const activeContent = document.querySelector(
      `.operations__content--${clicked.dataset.tab}`
    );
    activeContent.classList.add('operations__content--active');
  };

  setupTabs() {
    this.tabsContainer.addEventListener('click', this.handleTabClick);
  }
}

// Instantiate the Tabs class
const tabs = new Tabs();

// Section: Menu Link Fade Out

class NavigationHoverEffect {
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

// Section: Lazy Load & Revealing Elements on Scroll

class ImageLazyLoad {
  constructor() {
    this.allSections = document.querySelectorAll('.section');
    this.imgTargets = document.querySelectorAll('img[data-src]');
    this.setupSectionObserver();
    this.setupImageObserver();
  }

  // Reveal Images on Scroll
  revealSection(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }

  // Lazy Load Images
  loadImg(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  }

  setupSectionObserver() {
    const sectionObserver = new IntersectionObserver(this.revealSection, {
      root: null,
      threshold: 0.15,
    });
    this.allSections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  setupImageObserver() {
    const imgObserver = new IntersectionObserver(this.loadImg, {
      root: null,
      threshold: 0,
      rootMargin: '-200px',
    });
    this.imgTargets.forEach(img => {
      imgObserver.observe(img);
    });
  }
}

// Instantiate the ImageLazyLoad class
const lazyLoad = new ImageLazyLoad();

// Section: Portfolio Slider
//

class Slider {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.btnLeft = document.querySelector('.slider__btn--left');
    this.btnRight = document.querySelector('.slider__btn--right');
    this.dotsContainer = document.querySelector('.dots');
    this.curSlide = 0;
    this.maxSlide = this.slides.length;
    this.init();
  }

  createDots() {
    this.slides.forEach((_, i) => {
      this.dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }

  activateDot(slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }

  goToSlide(slide) {
    this.slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }

  nextSlide() {
    if (this.curSlide === this.maxSlide - 1) {
      this.curSlide = 0;
    } else {
      this.curSlide++;
    }
    this.goToSlide(this.curSlide);
    this.activateDot(this.curSlide);
  }

  prevSlide() {
    if (this.curSlide === 0) {
      this.curSlide = this.maxSlide - 1;
    } else {
      this.curSlide--;
    }
    this.goToSlide(this.curSlide);
    this.activateDot(this.curSlide);
  }

  init() {
    this.goToSlide(0);
    this.createDots();
    this.activateDot(0);
    this.btnRight.addEventListener('click', this.nextSlide.bind(this));
    this.btnLeft.addEventListener('click', this.prevSlide.bind(this));
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
    this.dotsContainer.addEventListener('click', e => {
      if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        this.goToSlide(slide);
        this.activateDot(slide);
      }
    });
  }
}

// Instantiate the Slider class
const slider = new Slider();
