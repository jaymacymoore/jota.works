export default class Tabs {
  constructor() {
    this.tabsContainer = document.querySelector('.audits__tab-container');
    this.tabs = document.querySelectorAll('.audits__tab');
    this.tabsContent = document.querySelectorAll('.audits__content');
    this.currentTabIndex = 0;
    this.dotsContainer = document.querySelector('.dots__audit');

    this.setupTabs();
    this.setupSliderButtons();
    this.init(); // Call the init method to set up the dots.
  }

  // Function to create dots
  createDots() {
    this.tabs.forEach((_, i) => {
      this.dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__audit__dot" data-slide="${i}"></button>`
      );
    });
  }

  // Function to activate dot
  activateDot(slide) {
    document
      .querySelectorAll('.dots__audit__dot')
      .forEach(dot => dot.classList.remove('dots__audit__dot--active'));
    document
      .querySelector(`.dots__audit__dot[data-slide="${slide}"]`)
      .classList.add('dots__audit__dot--active');
  }

  // Initialization method
  init() {
    this.createDots();
    this.activateDot(this.currentTabIndex); // Activate the first dot

    // Add event listener to dots for clicking
    this.dotsContainer.addEventListener('click', e => {
      if (e.target.classList.contains('dots__audit__dot')) {
        const { slide } = e.target.dataset;
        this.showTab(parseInt(slide));
        this.activateDot(slide);
      }
    });
  }

  // Handle tab click
  handleTabClick = e => {
    const clicked = e.target.closest('.audits__tab');
    if (!clicked) return;

    const tabIndex = parseInt(clicked.dataset.tab) - 1;
    this.showTab(tabIndex);
    this.activateDot(tabIndex); // Activate corresponding dot
  };

  // Show tab method
  showTab(tabIndex) {
    this.tabs.forEach(tab => tab.classList.remove('audits__tab--active'));
    this.tabsContent.forEach(content =>
      content.classList.remove('audits__content--active')
    );

    this.tabs[tabIndex].classList.add('audits__tab--active');
    this.tabsContent[tabIndex].classList.add('audits__content--active');
    this.currentTabIndex = tabIndex;
  }

  // Set up event listeners for tabs
  setupTabs() {
    this.tabsContainer.addEventListener('click', this.handleTabClick);
  }

  // Set up event listeners for slider buttons
  setupSliderButtons() {
    const prevButton = document.querySelector('.slider__audit__btn--left');
    const nextButton = document.querySelector('.slider__audit__btn--right');

    prevButton.addEventListener('click', () => {
      this.currentTabIndex =
        (this.currentTabIndex - 1 + this.tabs.length) % this.tabs.length;
      this.showTab(this.currentTabIndex);
      this.activateDot(this.currentTabIndex); // Activate corresponding dot
    });

    nextButton.addEventListener('click', () => {
      this.currentTabIndex = (this.currentTabIndex + 1) % this.tabs.length;
      this.showTab(this.currentTabIndex);
      this.activateDot(this.currentTabIndex); // Activate corresponding dot
    });
  }
}
