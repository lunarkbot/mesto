import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js'
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import {
  initialCards,
  editButton,
  addButton,
  nameInput,
  jobInput
} from "../utils/constants.js";

const popupWithImage = new PopupWithImage('.image-popup');
popupWithImage.setEventListeners();
popupWithImage.enableAnimation();

const profilePopup = new PopupWithForm('.profile-popup', handleProfileFormSubmit);
profilePopup.setEventListeners();
profilePopup.enableAnimation();

const cardPopup = new PopupWithForm('.card-popup', handleCardFormSubmit);
cardPopup.setEventListeners();
cardPopup.enableAnimation();

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job'
});



/**
 * Submit формы редактирования профиля
 *
 * @param {object} evt Событие
 */
function handleProfileFormSubmit(evt) {
  userInfo.setUserInfo(nameInput.value, jobInput.value);

  profilePopup.close();
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

  //cardFormElement.reset();
  cardPopup.close();
}


/**
 * Обработка клика по фотографии в карточке
 * @param name
 * @param link
 */
function handlePhotoClick(name, link) {
  popupWithImage.open(name, link);
}


function createCard(cardData) {
  const cardElement = new Card(cardData, '#photo-card', handlePhotoClick);
  return cardElement;
}


// Поля формы

const photoNameInput = document.querySelector('.form__text-input_type_photo-name');
const photoLinkInput = document.querySelector('.form__text-input_type_photo-link');
// Фотокарточки
const photoGrid = document.querySelector('.photo-grid__list');


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


editButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;

  formValidators['profile'].resetValidation()

  profilePopup.open();
});

addButton.addEventListener('click',() => {
  formValidators['add-photo'].resetValidation()
  cardPopup.open();
});



