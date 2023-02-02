import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  #handleSubmit
  #formElement
  #inputs
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this.#handleSubmit = submitForm;
    this.#formElement = this.popupElement.querySelector('form');
    this.#inputs = Array.from(this.#formElement.querySelectorAll('input'));
  }

  #getInputValues() {
    return this.#inputs.reduce((acc, input) => ({ ...acc, [input.name]: input.value }), {});
  }

  #submit(evt) {
    evt.preventDefault();
    const valueInputs = this.#getInputValues();
    this.#handleSubmit(valueInputs);
    this.close();
  }

  setEventListeners() {
    this.popupElement.addEventListener('submit', this.#submit.bind(this));
    super.setEventListeners();
  }

  setInputValues(dataInputs) {
    this.#inputs.forEach((input) => input.value = dataInputs[input.name]);
  }

  close() {
    super.close();
    this.#formElement.reset();
  }
}
