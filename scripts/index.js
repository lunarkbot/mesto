import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';

/**
 * Submit формы редактирования профиля
 *
 * @param {object} evt Событие
 */
function handleProfileFormSubmit(evt) {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(profilePopup);
}


/**
 * Submit формы создания фотокарточки
 *
 * @param {object} evt Событие
 */
function handleCardFormSubmit(evt) {
  const cardElement = new Card({
    name: photoNameInput.value,
    link: photoLinkInput.value
  }, '#photo-card', handlePhotoClick);

  photoGrid.prepend(cardElement.createCard());

  cardFormElement.reset();
  closePopup(cardPopup);
}


/**
 * Закрывает текущий открытый popup по Escape
 *
 * @param {object} evt Событие
 */
function closePopupWithEscape(evt) {
  if (evt.key !== 'Escape') return;

  const currentPopup = document.querySelector('.popup_opened');
  closePopup(currentPopup);
}


/**
 * Обработка клика по фотографии в карточке
 * @param name
 * @param link
 */
function handlePhotoClick(name, link) {
  setPhoto(name, link);
}


/**
 * Устанавливает в popup новое фото
 *
 * @param {string} photoName Название фотографии
 * @param {string} photoLink Ссылка на фотографию
 */
function setPhoto(photoName, photoLink) {
  popupPhoto.classList.add('popup__photo_hidden');
  popupPhoto.src = photoLink;
  popupPhoto.alt = photoName;

  popupPhotoCaption.textContent = photoName;

  showPopup(photoPopup);
}


/**
 * @param {object} popup Элемент popup
 */
function showPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEscape);
}


/**
 * @param {object} popup Элемент popup
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEscape);
}


function setProfileFormVal() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  submitProfileButton.classList.remove('form__submit-button_disabled');
}



// Popups
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const photoPopup = document.querySelector('.image-popup');
// Формы
const profileFormElement = profilePopup.querySelector('form');
const cardFormElement = cardPopup.querySelector('form');
// Поля формы
const nameInput = document.querySelector('.form__text-input_type_name');
const jobInput = document.querySelector('.form__text-input_type_job');
const photoNameInput = document.querySelector('.form__text-input_type_photo-name');
const photoLinkInput = document.querySelector('.form__text-input_type_photo-link');
// Кнопки
const closeButtons = document.querySelectorAll('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const submitProfileButton = profileFormElement.querySelector('.form__submit-button');
// Текст
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// Фотокарточки
const photoGrid = document.querySelector('.photo-grid__list');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoCaption = document.querySelector('.popup__caption');


// Исходные данные по заданию
const initialCards = [
  {
    name: 'Франкфурт-на-Майне',
    link: './images/frankfurt.jpg'
  },
  {
    name: 'Львов',
    link: './images/lviv.jpg'
  },
  {
    name: 'Москва',
    link: './images/moscow.jpg'
  },
  {
    name: 'Минск',
    link: './images/minsk.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/saint-p.jpg'
  },
  {
    name: 'Карачаево-Черкесия',
    link: './images/arhiz.jpg'
  }
];


// соберем все исходные карточки, чтобы разом добавить в DOM
const initialCardsBlocks = [];

initialCards.forEach(cardData => {
  const cardElement = new Card(cardData, '#photo-card', handlePhotoClick);
  initialCardsBlocks.push(cardElement.createCard());
})

photoGrid.append(...initialCardsBlocks);

/*
  Чтобы избежать эффекта плавного нежелательного исчезания popup'ов
  при загрузке или обновлении страницы, всем popup'ам добавляется
  модификатор с настройками анимации только после полной загрузки страницы.

  В этом же месте мы можем добавить событие для скрытия popup по клику за его пределами
*/
window.addEventListener('load', () => {
  const popups = document.querySelectorAll('.popup');

  popups.forEach(popup => {
    popup.classList.add('popup_animated');

    popup.addEventListener('click', (evt) => {
      if (evt.target === popup) closePopup(popup);
    })
  });
});

/*
   чтобы при ожидании загрузки фото не было видно предыдущего фото
   скроем его модификатором до момента полной загрузки
*/
popupPhoto.addEventListener('load', () => {
  popupPhoto.classList.remove('popup__photo_hidden');
});


profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

editButton.addEventListener('click', () => {
  setProfileFormVal()
  showPopup(profilePopup);
});
setProfileFormVal();

addButton.addEventListener('click',() => {
  showPopup(cardPopup);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


//Включаем валидацию форм
const documentForms = Array.from(document.querySelectorAll('.form'));
documentForms.forEach(form => {
  const formValidator = new FormValidator({
    formSelector: '.form',
    inputSelector: '.form__text-input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_disabled',
    inputErrorClass: 'form__text-input_type_error',
    errorClass: 'form__input-error_visible',
    addButton,
    editButton
  }, form);

  formValidator.enableValidate();
});