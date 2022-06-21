import frankfurtImg from '../images/frankfurt.jpg';
import lvivImg from '../images/lviv.jpg';
import moscowImg from '../images/moscow.jpg';
import minskImg from '../images/moscow.jpg';
import saintPImg from '../images/saint-p.jpg';
import arhizImg from '../images/arhiz.jpg';

// решил пока сохранить стартовый набор картинок, потому что если API отвалился
// то вся страница превращается в тыкву, возможно в будущих спринтах
// будет предложено какое-то аккуратное решение или сам доработаю позже
export const initialCards = [
  {
    name: 'Франкфурт-на-Майне',
    link: frankfurtImg,
    likes: []
  },
  {
    name: 'Львов',
    link: lvivImg,
    likes: []
  },
  {
    name: 'Москва',
    link: moscowImg,
    likes: []
  },
  {
    name: 'Минск',
    link: minskImg,
    likes: []
  },
  {
    name: 'Санкт-Петербург',
    link: saintPImg,
    likes: []
  },
  {
    name: 'Карачаево-Черкесия',
    link: arhizImg,
    likes: []
  }
];

// Jacques Cousteau
// Sailor, researcher

// API
export const API_KEY = '17ddf20b-e97f-4a71-80b5-a72a5a2a6450';
export const API_BASEURL = 'https://mesto.nomoreparties.co/v1/cohort-44';

// кнопки
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
// Поля формы профиля
export const nameInput = document.querySelector('.form__text-input_type_name');
export const jobInput = document.querySelector('.form__text-input_type_job');
