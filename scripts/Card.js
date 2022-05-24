export class Card {
  constructor(cardData, templateSelector, handlePhotoClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handlePhotoClick = handlePhotoClick;
    this._cardElement = this._getTemplate();
    this._photoCardImage = this._cardElement.querySelector('.photo-grid__photo');
    this._likeButton  = this._cardElement.querySelector('.photo-grid__like-button');
    this._trashButton = this._cardElement.querySelector('.photo-grid__trash-button');
    this._cardTitle = this._cardElement.querySelector('.photo-grid__title');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photo-grid__item')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('photo-grid__like-button_checked');
    });

    this._trashButton.addEventListener('click', () => {
      this._cardElement.remove();
    });

    this._photoCardImage.addEventListener('click', () => {
      this._handlePhotoClick(this._name, this._link);
    })
  }

  createCard() {
    this._photoCardImage.alt = this._name;
    this._photoCardImage.src = this._link;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}