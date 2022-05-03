function isValid(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      options
    );
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

function showInputError(formElement, inputElement, errorMessage, options) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
}

function hideInputError(formElement, inputElement, options) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(options.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(options.errorClass);
}

function setEventListeners(formElement, formSubmitButton, options) {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));

  // чтобы применить состояние кнопки до ввода в поле
  toggleButtonState(inputList, formSubmitButton, options);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, options);
      toggleButtonState(inputList, formSubmitButton, options);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement, options) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(options.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach(formElement => {
    const formSubmitButton = formElement.querySelector(options.submitButtonSelector);

    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
      formSubmitButton.classList.add(options.inactiveButtonClass);
    });

    setEventListeners(formElement, formSubmitButton, options);
  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__text-input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__text-input_type_error',
  errorClass: 'form__input-error_visible'
});