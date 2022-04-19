(function() {
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

  initialCards.forEach(card => {
    renderCard(card.name, card.link);
  })

  /*
    Чтобы избежать эффекта плавного нежелательного исчезания popup'ов
    при загрузке или обновлении страницы, всем popup'ам добавляется
    модификатор с настройками анимации только после полной загрузки страницы.
  */

  window.addEventListener('load', () => {
    const popups = document.querySelectorAll('.popup');

    popups.forEach(popup => {
      popup.classList.add('popup_animated');
    });
  });
}());


// Формы
const formElements = document.querySelectorAll('.popup__container form');
// Поля формы
const nameInput = document.querySelector('.popup__text-input_type_name');
const jobInput = document.querySelector('.popup__text-input_type_job');
// Кнопки
const closeButtons = document.querySelectorAll('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
// Текст
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');


formElements.forEach(form => {
  form.addEventListener('submit', formSubmitHandler);
});

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  showPopup('.popup__container_type_profile');
});

addButton.addEventListener('click',() => {
  showPopup('.popup__container_type_add-image');
});

closeButtons.forEach(button => {
  button.addEventListener('click', hidePopup);
});


/**
 * Обработка submit
 *
 * @param {object} evt Событие
 */
function formSubmitHandler(evt) {
  evt.preventDefault();
  const formName = evt.target.getAttribute('name');

  if (formName === 'profile') {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  }
  if (formName === 'add-photo') {
    const photoName = evt.target.querySelector('.popup__text-input_type_photo-name');
    const photoLink = evt.target.querySelector('.popup__text-input_type_photo-link');

    renderCard(photoName.value, photoLink.value);
    evt.target.reset();
  }

  hidePopup(evt);
}


/**
 * Добавляет карточку с фото в DOM
 *
 * @param {string} photoName Название фотографии
 * @param {string} photoLink Ссылка на фотографию
 */
function renderCard(photoName, photoLink) {
  const photoCardTemplate = document.querySelector('#photo-card').content;
  const photoGrid = document.querySelector('.photo-grid__list');
  const photoCard = photoCardTemplate.querySelector('.photo-grid__item').cloneNode(true);

  const photoCardImage = photoCard.querySelector('.photo-grid__photo');
  photoCardImage.alt = photoName;
  photoCardImage.src = photoLink;
  photoCard.querySelector('.photo-grid__title').textContent = photoName;

  const likeButton = photoCard.querySelector('.photo-grid__like-button');
  likeButton.addEventListener('click', e => {
    e.target.classList.toggle('photo-grid__like-button_checked');
  });

  photoGrid.prepend(photoCard);
}


/**
 * Делает popup видимым
 *
 * @param {string} selector Селектор для идентификации требуемого popup
 */
function showPopup(selector) {
  const popup = document.querySelector(selector).closest('.popup');

  popup.classList.add('popup_opened');
}


/**
 * Скрывает popup
 *
 * @param {object} evt Событие
 */
function hidePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

