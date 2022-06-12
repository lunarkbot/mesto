import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js'
import {initialCards} from "../utils/constants.js";

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
  const cardElement = createCard({
    name: photoNameInput.value,
    link: photoLinkInput.value
  });

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


function createCard(cardData) {
  const cardElement = new Card(cardData, '#photo-card', handlePhotoClick);
  return cardElement;
}


/**
 * Устанавливает в popup новое фото
 *
 * @param {string} photoName Название фотографии
 * @param {string} photoLink Ссылка на фотографию
 */
function setPhoto(photoName, photoLink) {

  /*
  * К сожалению, фича с popupPhoto.src = "#" не работает - все равно показывается
  * прошлая картинка, если новая картинка требует более долгой загрузки.
  *
  * Чтобы проверить, можно замедлить соединение в DevTool до хотя бы Fast 3G
  * и эффект появится на всех фото :(
  *
  * Проверял в Google Chrome Версия 101.0.4951.67 (Официальная сборка), (64 бит) / Windows 11 Pro.
  *
  * Если же поставить popupPhoto.src = '' - то срабатывает нормально, но тогда из-за отсутствия
  * картинки в popup у нас прижимаются слишком близко кнопка закрытия и подпись к фото
  * в момент ожидания загрузки новой фотки.
  *
  * Была мысль поставить что-то вроде min-height, но во-первых, мы не знаем какое изображение
  * будет добавлено пользователем, а во вторых чем меньше элементы дергаются
  * при загрузке фото, тем имхо лучше. И даже если сделать min-height: 100px изменять положение
  * кнопка закрытия будет достаточно сильно после дозагрузки фотки.
  *
  * ¯\_(ツ)_/¯
  * */

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
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
// Текст
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// Фотокарточки
const photoGrid = document.querySelector('.photo-grid__list');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoCaption = document.querySelector('.popup__caption');


// Исходные данные по заданию



//Включаем валидацию форм
const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    const formValidator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__text-input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__text-input_type_error',
  errorClass: 'form__input-error_visible'
})


// соберем все исходные карточки, чтобы разом добавить в DOM
const initialCardsBlocks = [];

initialCards.forEach(cardData => {
  const cardElement = createCard(cardData);
  initialCardsBlocks.push(cardElement.createCard());
})

photoGrid.append(...initialCardsBlocks);

/*
  Чтобы избежать эффекта плавного нежелательного исчезания popup'ов
  при загрузке или обновлении страницы, всем popup'ам добавляется
  модификатор с настройками анимации только после полной загрузки страницы.

  В этом же месте мы можем добавить событие для скрытия popup по клику за его пределами
  и по крестику
*/
window.addEventListener('load', () => {
  const popups = document.querySelectorAll('.popup');

  popups.forEach(popup => {
    popup.classList.add('popup_animated');

    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')
          || evt.target.classList.contains('popup__close')) closePopup(popup);
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
  formValidators['profile'].resetValidation()
  showPopup(profilePopup);
});

addButton.addEventListener('click',() => {
  formValidators['add-photo'].resetValidation()
  showPopup(cardPopup);
});



