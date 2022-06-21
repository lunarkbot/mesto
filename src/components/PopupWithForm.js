import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.form');
    this._inputElements = this._formElement.querySelectorAll('.form__text-input');
    this._popupSubmitButton = this._formElement.querySelector('.form__submit-button');
  }

  _getInputValues() {
    const result = {};

    this._inputElements.forEach(item => {
      result[item.getAttribute('name')] = item.value;
    })

    return result;
  }

  close() {
    this._formElement.reset();

    super.close();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupSubmitButton.textContent = 'Сохранение...';
    } else {
      this._popupSubmitButton.textContent = 'Сохранить';
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    })
  }
}