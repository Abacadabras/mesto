const KEY_ESC = 'Escape';

export default class Popup {
  constructor(popupSelector) {
    this.popupElement = document.querySelector(popupSelector);
  }

  #handleEscClose(evt) {
     if (evt.key === KEY_ESC) this.close();
  }

  #handlePopupClose(evt) {
    const isOverlay = evt.target.classList.contains('popup');
    const isClose = evt.target.classList.contains('popup__btn-close');
    if (isOverlay || isClose) this.close();
  };

  open() {
    document.addEventListener('keydown', this.#handleEscClose.bind(this));
    this.popupElement.classList.add('popup_active');
  }

  close() {
    document.removeEventListener('keydown', this.#handleEscClose.bind(this));
    this.popupElement.classList.remove('popup_active');
  }

  setEventListeners() {
    this.popupElement.addEventListener('mousedown', this.#handlePopupClose.bind(this));
  }
}
