export class FormValidator {
  constructor(options, formElement) {
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(options.submitButtonSelector);
    this._inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _setEventListeners() {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    // чтобы применить состояние кнопки до ввода в поле
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some(input => !input.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    // применить состояние кнопки до ввода в поле
    this._toggleButtonState();
    // установить обработчики событий
    this._setEventListeners();
  }
}