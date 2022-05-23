export class Card {
  constructor(cardData, templateSelector, handlePhotoClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handlePhotoClick = handlePhotoClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photo-grid__item')
      .cloneNode(true);

    return cardElement;
  }

  _activateLikeButton(cardElement) {
    const likeButton = cardElement.querySelector('.photo-grid__like-button');
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('photo-grid__like-button_checked');
    });
  }

  _activateTrashButton(cardElement) {
    const trashButton = cardElement.querySelector('.photo-grid__trash-button');
    trashButton.addEventListener('click', () => {
      cardElement.remove();
    });
  }

  _getCardImage(cardElement) {
    const photoCardImage = cardElement.querySelector('.photo-grid__photo');
    photoCardImage.alt = this._name;
    photoCardImage.src = this._link;

    photoCardImage.addEventListener('click', () => {
      this._handlePhotoClick(this._name, this._link);
    })
  }

  createCard() {
    const cardElement = this._getTemplate();

    this._getCardImage(cardElement)
    this._activateLikeButton(cardElement);
    this._activateTrashButton(cardElement);

    cardElement.querySelector('.photo-grid__title').textContent = this._name;

    return cardElement;
  }
}