import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, photoLink, photoName) {
    super(popupSelector);
    this._photoLink = photoLink;
    this._photoName = photoName;
  }

  open() {
    const popupPhoto = document.querySelector('.popup__photo');
    const popupPhotoCaption = document.querySelector('.popup__caption');

    popupPhoto.classList.add('popup__photo_hidden');
    popupPhoto.src = photoLink;
    popupPhoto.alt = photoName;

    popupPhotoCaption.textContent = photoName;

    super.open();
  }
}