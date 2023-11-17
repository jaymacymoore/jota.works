export default class Modal {
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
