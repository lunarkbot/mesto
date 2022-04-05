// Находим форму в DOM
const formElement = document.querySelector('.popup__container form');
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__text-input_type_name');
const jobInput = formElement.querySelector('.popup__text-input_type_job');
// кнопки
const closeButton = document.querySelector('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');


  function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    switchPopup()
  }

  function showPopupHandler (evt) {
    switchPopup();

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }

  function switchPopup() {
    const popup = document.querySelector('.popup');

    popup.classList.toggle('popup_opened');
  }

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', showPopupHandler);
closeButton.addEventListener('click', switchPopup);