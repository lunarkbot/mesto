import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.form');
    this._inputElements = this._formElement.querySelectorAll('.form__text-input');
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

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    })
  }
}