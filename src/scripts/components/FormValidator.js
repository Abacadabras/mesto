export default class FormValidator {
  #class
  #formElement
  #buttonElement
  #errorElements
  #inputElements

  constructor(validationConfig, formElement) {
    this.#class = validationConfig;
    this.#formElement = formElement;
    this.#errorElements = this.#formElement.querySelectorAll(this.#class.inputErrorClass);
    this.#inputElements = Array.from(this.#formElement.querySelectorAll(this.#class.inputClass));
    this.#buttonElement = this.#formElement.querySelector(this.#class.submitButtonClass);
  }

  #showInputError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add(this.#class.inputError);
    errorElement.textContent = errorMessage;
  };

  #hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this.#class.inputError);
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
    return this.#inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  #inactiveButtonState() {
    this.#buttonElement.classList.add(this.#class.inactiveButton);
    this.#buttonElement.disabled = true;
  }

  #toggleButtonState() {
    if (this.#hasInvalidInput()) {
      this.#inactiveButtonState();
    } else {
      this.#buttonElement.classList.remove(this.#class.inactiveButton);
      this.#buttonElement.disabled = false;
    }
  }

  enableValidation() {
    this.#toggleButtonState();

    this.#inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#isValid(inputElement);
        this.#toggleButtonState();
      });
    });
  }

  resetSubmit() {
    this.#inactiveButtonState();
  }

  resetErrors() {
    this.#errorElements.forEach((elem) => elem.textContent = '');
    this.#inputElements.forEach((elem) => elem.classList.remove(this.#class.inputError));
  }
}
