import {Card} from '../components/Card.js'
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

import {
  enableValidation,
} from "../utils/utils.js";

import {
  initialCards,
  editButton,
  addButton,
  nameInput,
  jobInput,
  API_KEY,
  API_BASEURL
} from "../utils/constants.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";


/**
 * Submit формы редактирования профиля
 * @param values {object} Объект с данными из полей формы
 */
function handleProfileFormSubmit(values) {
  profilePopup.renderLoading(true);
  api.setUserData(values.name, values.job)
    .then(result => {
      userInfo.setUserInfo(result.name, result.about);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.renderLoading(false);
    });


}


/**
 * Submit формы создания фотокарточки
 * @param values {object} Объект с данными из полей формы
 */
function handleCardFormSubmit(values) {
  cardPopup.renderLoading(true);
  api.addCard(values.name, values.link)
    .then(result => {
      const cardElement = createCard({
        name: result.name,
        link: result.link,
        _id: result._id,
      });

      section.addItem('afterbegin', cardElement);
      cardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardPopup.renderLoading(false);
    });
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
 * Коллбек клика по кнопке "лайк" на карточке
 */
function handleLikeButtonClick(isLiked, cardId) {

  if (isLiked) {
    api.updateLikes(cardId, false)
      .then(result => {
        this.updateLikesCounter(result.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.updateLikes(cardId)
      .then(result => {
        this.updateLikesCounter(result.likes,false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


/**
 * Коллбек обработчика клика по иконки удаления
 */
function handleTrashButtonClick(cardId, cardElement) {
  popupConfirmation.open(cardId, cardElement);
}


/**
 * Коллбек сабмита подтверждения действия удаления
 * @param evt
 */
function handleConfirmationFormSubmit(evt) {
  evt.preventDefault();

  api.deleteCard(popupConfirmation.getItemId())
    .then(result => {
      popupConfirmation.deleteItem();
      popupConfirmation.close();
    })
    .catch((err) => {
      console.log(err);
    });
}


/**
 * Коллбек сабмита формы с новым аватаром
 * @param values {object} объект с данными всех inputs формы
 */
function handleAvatarFormSubmit(values) {
  avatarPopup.renderLoading(true);
  api.setAvatar(values['avatar-url'])
    .then(result => {
      userInfo.setAvatar(result.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
}


function handleAvatarClick() {
  formValidators['avatar'].resetValidation();
  avatarPopup.open();
}


/**
 * Создает экземпляр класса Card
 * @param cardData object Данные для создания карты
 * @returns {element} готовый для вставки в DOM элемент
 */
function createCard(cardData) {
  const card = new Card(
    cardData,
    {
      templateSelector: '#photo-card',
      photoCardImageSelector: '.photo-grid__photo',
      likeButtonSelector: '.likes-counter__button',
      likeCounterSelector: '.likes-counter__result',
      trashButtonSelector: '.photo-grid__trash-button',
      cardTitleSelector: '.photo-grid__title'
    },
    handlePhotoClick,
    handleLikeButtonClick,
    handleTrashButtonClick
  );
  return card.createCard();
}

const api = new Api({
    baseUrl: API_BASEURL,
    headers: {
      authorization: API_KEY,
      'Content-Type': 'application/json',
    },
    checker: (res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    }
  },
);

const popupWithImage = new PopupWithImage('.image-popup');
popupWithImage.setEventListeners();
popupWithImage.enableAnimation();

const popupConfirmation = new PopupWithConfirmation(
  '.confirmation-popup',
  handleConfirmationFormSubmit
);
popupConfirmation.setEventListeners();
popupConfirmation.enableAnimation();

const profilePopup = new PopupWithForm('.profile-popup', handleProfileFormSubmit);
profilePopup.setEventListeners();
profilePopup.enableAnimation();

const cardPopup = new PopupWithForm('.card-popup', handleCardFormSubmit);
cardPopup.setEventListeners();
cardPopup.enableAnimation();

const avatarPopup = new PopupWithForm('.avatar-popup', handleAvatarFormSubmit);
avatarPopup.setEventListeners();
avatarPopup.enableAnimation();

const userInfo = new UserInfo(
  {
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job',
  userAvatarSelector: '.profile__avatar'
},
  handleAvatarClick
);


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


Promise.all([api.getUserData(), api.getCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(
      userData.name,
      userData.about,
      userData.avatar
    );

    sessionStorage.setItem('ownerId', userData._id);

    section.updateItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    section.renderItems();
  });




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

