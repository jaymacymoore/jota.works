export default class ImageLazyLoad {
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
