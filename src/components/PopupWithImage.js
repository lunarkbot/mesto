import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    this._popupPhotoCaption = this._popup.querySelector('.popup__caption');
  }

  setEventListeners() {
    super.setEventListeners();

    // Уберем ранее добавленный класс, чтобы отобразить только что загруженное фото
    // после его полной загрузки
    this._popupPhoto.addEventListener('load', () => {
      this._popupPhoto.classList.remove('popup__photo_hidden');
    });
  }

  open(photoName, photoLink) {
    // Добавим модификатор, скрывающий фото до момента его полной загрузки,
    // для решения двух проблем:
    // 1. чтобы в момент загрузки нового фото не отображалось старое (медленный инет)
    // 2. чтобы избежать изменения положения заголовка фото и кнопки закрытия попапа
    this._popupPhoto.classList.add('popup__photo_hidden');

    this._popupPhoto.src = photoLink;
    this._popupPhoto.alt = photoName;
    this._popupPhotoCaption.textContent = photoName;

    super.open();
  }
}