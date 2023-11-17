export default class PortfolioSlider {
  constructor() {
    this.slides = document.querySelectorAll('.slide__testimonial');
    this.btnLeft = document.querySelector('.slider__testimonial__btn--left');
    this.btnRight = document.querySelector('.slider__testimonial__btn--right');
    this.dotsContainer = document.querySelector('.dots__testimonial');
    this.curSlide = 0;
    this.maxSlide = this.slides.length;
    this.init();
  }

  createDots() {
    this.slides.forEach((_, i) => {
      this.dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__testimonial__dot" data-slide="${i}"></button>`
      );
    });
  }

  activateDot(slide) {
    document
      .querySelectorAll('.dots__testimonial__dot')
      .forEach(dot => dot.classList.remove('dots__testimonial__dot--active'));
    document
      .querySelector(`.dots__testimonial__dot[data-slide="${slide}"]`)
      .classList.add('dots__testimonial__dot--active');
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
      if (e.target.classList.contains('dots__testimonial__dot')) {
        const { slide } = e.target.dataset;
        this.goToSlide(slide);
        this.activateDot(slide);
      }
    });
  }
}
