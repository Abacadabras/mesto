import Popup from './Popup.js';


export default class PopupWithConfirmation extends Popup {
  #handleSubmit
  #card
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this.#handleSubmit = submitForm;
  }

  #submit(evt) {
    evt.preventDefault();
    this.#handleSubmit(this.#card);
    this.close();
  }

  setEventListeners() {
    this.popupElement.addEventListener('submit', this.#submit.bind(this));
    super.setEventListeners();
  }

  open(card) {
    this.#card = card;
    super.open();
  }
}
