import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  #popupImg
  #popupImgTitle
  constructor(popupSelector) {
    super(popupSelector);
    this.#popupImg = this.popupElement.querySelector('.figure__img');
    this.#popupImgTitle = this.popupElement.querySelector('.figure__title');
  }

  open(name, link) {
    this.#popupImg.src = link;
    this.#popupImgTitle.textContent = this.#popupImgTitle.alt = name;
    super.open();
  }
}
