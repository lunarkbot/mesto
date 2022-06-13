import frankfurtImg from '../images/frankfurt.jpg';
import lvivImg from '../images/lviv.jpg';
import moscowImg from '../images/moscow.jpg';
import minskImg from '../images/moscow.jpg';
import saintPImg from '../images/saint-p.jpg';
import arhizImg from '../images/arhiz.jpg';

export const initialCards = [
  {
    name: 'Франкфурт-на-Майне',
    link: frankfurtImg
  },
  {
    name: 'Львов',
    link: lvivImg
  },
  {
    name: 'Москва',
    link: moscowImg
  },
  {
    name: 'Минск',
    link: minskImg
  },
  {
    name: 'Санкт-Петербург',
    link: saintPImg
  },
  {
    name: 'Карачаево-Черкесия',
    link: arhizImg
  }
];

// кнопки
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
// Поля формы профиля
export const nameInput = document.querySelector('.form__text-input_type_name');
export const jobInput = document.querySelector('.form__text-input_type_job');
// Поля формы добавления фото
export const photoNameInput = document.querySelector('.form__text-input_type_photo-name');
export const photoLinkInput = document.querySelector('.form__text-input_type_photo-link');
