/**
 * Submit формы редактирования профиля
 *
 * @param {object} evt Событие
 */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

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
  evt.preventDefault();

  const cardElement = createCard(photoNameInput.value, photoLinkInput.value);
  photoGrid.prepend(cardElement);

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
 * Создает фотокарточку
 *
 * @param {string} photoName Название фотографии
 * @param {string} photoLink Ссылка на фотографию
 */
function createCard(photoName, photoLink) {
  const cardElement = photoCardTemplate.querySelector('.photo-grid__item').cloneNode(true);

  const photoCardImage = cardElement.querySelector('.photo-grid__photo');
  photoCardImage.alt = photoName;
  photoCardImage.src = photoLink;

  cardElement.querySelector('.photo-grid__title').textContent = photoName;

  photoCardImage.addEventListener('click', () => setPhoto(photoName, photoLink));

  const likeButton = cardElement.querySelector('.photo-grid__like-button');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('photo-grid__like-button_checked');
  });

  const trashButton = cardElement.querySelector('.photo-grid__trash-button');
  trashButton.addEventListener('click', () => {
    cardElement.remove();
  });

  return cardElement;
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


// Popups
const profilePopup = document.querySelector('.profile-popup');
const cardPopup = document.querySelector('.card-popup');
const photoPopup = document.querySelector('.image-popup');
// Формы
const profileFormElement = profilePopup.querySelector('form');
const cardFormElement = cardPopup.querySelector('form');
// Поля формы
const nameInput = document.querySelector('.popup__text-input_type_name');
const jobInput = document.querySelector('.popup__text-input_type_job');
const photoNameInput = document.querySelector('.popup__text-input_type_photo-name');
const photoLinkInput = document.querySelector('.popup__text-input_type_photo-link');
// Кнопки
const closeButtons = document.querySelectorAll('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
// Текст
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// Фотокарточки
const photoCardTemplate = document.querySelector('#photo-card').content;
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

initialCards.forEach(card => {
  initialCardsBlocks.push(createCard(card.name, card.link));
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
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  showPopup(profilePopup);
});

addButton.addEventListener('click',() => {
  showPopup(cardPopup);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
