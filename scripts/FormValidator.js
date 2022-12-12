export default class FormValidator {
  #class
  #formElement
  #inputList
  #buttonElement

  constructor(validationConfig, formElement) {
    this.#class = validationConfig;
    this.#formElement = formElement;
  }

  #showInputError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add(this.#class.inputErrorClass);
    errorElement.textContent = errorMessage;
  };

  #hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this.#class.inputErrorClass);
    errorElement.textContent = '';
  };

  #isValid(inputElement) {
    const errorElement = this.#formElement.querySelector(`.form__input-error_${inputElement.name}`);
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
      this.#hideInputError(inputElement, errorElement);
    }
  }

  #hasInvalidInput() {
    return this.#inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  #toggleButtonState() {
    if (this.#hasInvalidInput()) {
      this.#buttonElement.classList.add(this.#class.inactiveButtonClass);
      this.#buttonElement.disabled = true;
    } else {
      this.#buttonElement.classList.remove(this.#class.inactiveButtonClass);
      this.#buttonElement.disabled = false;
    }
  }

  enableValidation() {
    this.#inputList = Array.from(this.#formElement.querySelectorAll(this.#class.inputClass));
    this.#buttonElement = this.#formElement.querySelector(this.#class.submitButtonClass);

    this.#toggleButtonState();

    this.#inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#isValid(inputElement);
        this.#toggleButtonState();
      });
    });
  }
}
