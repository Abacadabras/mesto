import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  #handleSubmit
  #formElement
  #inputs
  #submitBtn
  #submitBtnText
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this.#handleSubmit = submitForm;
    this.#formElement = this.popupElement.querySelector('form');
    this.#inputs = Array.from(this.#formElement.querySelectorAll('input'));
    this.#submitBtn = this.#formElement.querySelector('.button.form__submit');
    this.#submitBtnText = this.#submitBtn.textContent;
  }

  #getInputValues() {
    return this.#inputs.reduce((acc, input) => ({ ...acc, [input.name]: input.value }), {});
  }

  #submit(evt) {
    evt.preventDefault();
    this.#submitBtn.textContent = 'Сохранение...';
    this.#submitBtn.disabled = true;
    const valueInputs = this.#getInputValues();
    this.#handleSubmit(valueInputs)
      .then(() => {
        this.#submitBtn.textContent = 'Сохранено';
      })
      .catch((error) => {
        console.error(error);
        this.#submitBtn.textContent = 'Ошибка сервера!!!';
      })
      .finally(() => {
        setTimeout(() => {
          this.#submitBtn.textContent = this.#submitBtnText;
          this.#submitBtn.disabled = false;
          this.close();
        }, 1500);
      });
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
