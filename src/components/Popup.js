export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupSubmitButton = this._popup.querySelector('.form__submit-button');
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') this.close();
  }

  _handleOutsideClick(evt) {
    if (evt.target.classList.contains('popup_opened')) this.close();
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupSubmitButton.textContent = 'Сохранение...';
    } else {
      this._popupSubmitButton.textContent = 'Сохранить';
    }
  }

  // Чтобы избежать эффекта плавного нежелательного исчезания popup'ов
  // при загрузке или обновлении страницы, всем popup'ам добавляется
  // модификатор с настройками анимации только после создания экземпляра класса.
  enableAnimation() {
    this._popup.classList.add('popup_animated');
  }

  setEventListeners() {
    this._closeButton.addEventListener('mousedown', this.close.bind(this));
    this._popup.addEventListener('mousedown', this._handleOutsideClick.bind(this));
  }
}


