export default class Api {
  constructor({baseUrl, headers, checker}) {
    this._headers = headers;
    this._userUrl = `${baseUrl}/users/me`;
    this._cardsUrl = `${baseUrl}/cards`;
    this._checker = checker;
  }

  getUserData() {
    return fetch(this._userUrl, {
      headers: this._headers,
    }).then(this._checker);
  }

  setUserData(name, about) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    }).then(this._checker);
  }

  getCards() {
    return fetch(this._cardsUrl, {
      headers: this._headers,
    }).then(this._checker);
  }

  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`,{
      method: 'DELETE',
      headers: this._headers
    }).then(this._checker);
  }

  updateLikes(cardId, isSet = true) {
    return fetch(`${this._cardsUrl}/${cardId}/likes`,{
      method: isSet ? 'PUT' : 'DELETE',
      headers: this._headers,
    }).then(this._checker);
  }

  addCard(name, link) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    }).then(this._checker);
  }

  setAvatar(avatar) {
    return fetch(`${this._userUrl}/avatar`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    }).then(this._checker);
  }
}