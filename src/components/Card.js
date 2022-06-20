export class Card {
  constructor(
    cardData,
    {
      templateSelector,
      photoCardImageSelector,
      likeButtonSelector,
      likeCounterSelector,
      trashButtonSelector,
      cardTitleSelector
    },
    handlePhotoClick,
    handleLikeButtonClick,
    handleTrashButtonClick
  ) {

    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes || [];
    this._cardId = cardData._id;
    this._ownerId = cardData?.owner?._id || sessionStorage.getItem('ownerId');
    this._templateSelector = templateSelector;
    this._handlePhotoClick = handlePhotoClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._cardElement = this._getTemplate();
    this._photoCardImage = this._cardElement.querySelector(photoCardImageSelector);
    this._likeButton  = this._cardElement.querySelector(likeButtonSelector);
    this._likeCounter = this._cardElement.querySelector(likeCounterSelector);
    this._trashButton = this._cardElement.querySelector(trashButtonSelector);
    this._cardTitle = this._cardElement.querySelector(cardTitleSelector);
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
    this._likeButton.addEventListener('click', this._handleLikeButtonClick.bind(this));

    if (this._trashButton) {
      this._trashButton.addEventListener(
        'click',
        this._handleTrashButtonClick.bind(this)
      );
    }

    this._photoCardImage.addEventListener('click', () => {
      this._handlePhotoClick(this._name, this._link);
    })
  }

  _updateLikesCounter(likes = this._likes, isSet = true) {
    this._likes = likes;
    this._likeCounter.textContent = this._likes.length;

    if(this._isLiked()) {
      this._likeButton.classList.add('likes-counter__button_checked');
    } else {
      this._likeButton.classList.remove('likes-counter__button_checked');
    }
  }

  _isLiked() {
    for (let like of this._likes) {
      if (like._id === sessionStorage.getItem('ownerId')) return true;
    }
    return false;
  }

  createCard() {
    this._photoCardImage.alt = this._name;
    this._photoCardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._updateLikesCounter();

    if (this._ownerId !== sessionStorage.getItem('ownerId')) {
      this._trashButton.remove();
      this._trashButton = null;
    }

    this._setEventListeners();

    return this._cardElement;
  }
}