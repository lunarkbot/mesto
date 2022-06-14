import {Card} from '../components/Card.js'
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

import {
  enableValidation,
} from "../utils/utils.js";

import {
  initialCards,
  editButton,
  addButton,
  nameInput,
  jobInput
} from "../utils/constants.js";


/**
 * Submit формы редактирования профиля
 * @param values {object} Объект с данными из полей формы
 */
function handleProfileFormSubmit(values) {
  userInfo.setUserInfo(values.name, values.job);

  profilePopup.close();
}


/**
 * Submit формы создания фотокарточки
 * @param values {object} Объект с данными из полей формы
 */
function handleCardFormSubmit(values) {
  const cardElement = createCard({
    name: values.name,
    link: values.link
  });

  section.addItem('afterbegin', cardElement);
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

/**
 * Создает экземпляр класса Card
 * @param cardData object Данные для создания карты
 * @returns {element} готовый для вставки в DOM элемент
 */
function createCard(cardData) {
  const card = new Card(cardData, '#photo-card', handlePhotoClick);
  return card.createCard();
}


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


//Включаем валидацию форм
const formValidators = enableValidation({
  formSelector: '.form',
  inputSelector: '.form__text-input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__text-input_type_error',
  errorClass: 'form__input-error_visible'
})


const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      section.addItem('beforeend', cardElement);
    }
  },
  '.photo-grid__list'
);

section.renderItems();


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
