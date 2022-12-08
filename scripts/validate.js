const showInputError = (inputElement, errorElement, errorMessage, dataSelectors) => {
  inputElement.classList.add(dataSelectors.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (inputElement, errorElement, dataSelectors) => {
  inputElement.classList.remove(dataSelectors.inputErrorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, dataSelectors) => {
  const errorElement = formElement.querySelector(`.form__input-error_${inputElement.name}`);
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputElement.validationMessage, dataSelectors);
  } else {
    hideInputError(inputElement, errorElement, dataSelectors);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

export const toggleButtonState = (inputList, buttonElement, dataSelectors) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(dataSelectors.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(dataSelectors.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, dataSelectors) => {
  const inputList = Array.from(formElement.querySelectorAll(dataSelectors.inputSelector));
  const buttonElement = formElement.querySelector(dataSelectors.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, dataSelectors);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, dataSelectors);
      toggleButtonState(inputList, buttonElement, dataSelectors);
    });
  });
};

export const enableValidation = (dataSelectors) => {
  const formList = Array.from(document.querySelectorAll(dataSelectors.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, dataSelectors);
  })
}
