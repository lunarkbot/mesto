import {FormValidator} from "../components/FormValidator.js";

/**
 * Включает валидацию форм на странице
 * @param config object Конфигурация для инициализации валидации на странице
 * @returns {object} Объект со ссылками на экземпляры классов
 */
export const enableValidation = (config) => {
  const formValidators = {};
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    const formValidator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });

  return formValidators;
}


