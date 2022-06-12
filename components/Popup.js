export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }

  _handleEscClose(evt) {
    if (evt.key !== 'Escape') return;

    const currentPopup = document.querySelector('.popup_opened');
    this.close(currentPopup);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  setEventListeners() {
    this._closeButton.addEventListener('mousedown', (evt) => {
      this.close();
    })
  }
}


