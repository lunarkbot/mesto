import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm.bind(this);
    this._popupForm = this._popup.querySelector('.form');
    this._itemIdElement = this._popupForm.elements['item-id'];
    this._itemElement = null;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', this._handleConfirm);
  }

  open(id, element) {
    this._itemIdElement.value = id;
    this._itemElement = element;
    super.open();
  }

  close() {
    this._itemIdElement.value = '';
    super.close();
  }
}