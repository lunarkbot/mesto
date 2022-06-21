export default class UserInfo {
  constructor(
    {
      userNameSelector,
      userJobSelector,
      userAvatarSelector
    },
      handleAvatarClick
    ) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userJobElement = document.querySelector(userJobSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
    this._handleAvatarClick = handleAvatarClick;
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      job: this._userJobElement.textContent
    }
  }

  setAvatar(url) {
    this._userAvatarElement.src = url;
  }

  _setEventListeners() {
    this._userAvatarElement.addEventListener('click', this._handleAvatarClick);
  }

  setUserInfo(name, job, avatarUrl) {
    this._userNameElement.textContent = name;
    this._userJobElement.textContent = job;
    this._setEventListeners();
    if (avatarUrl) this._userAvatarElement.src = avatarUrl;
  }
}