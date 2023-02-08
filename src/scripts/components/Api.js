export default class Api {
  #url
  #headers
  constructor({ url, headers }) {
    this.#url = url;
    this.#headers = headers;
  }

  #response(response) {
    if (response.ok) return response.json();
    return Promise.reject(new Error(`Error: ${response.status}`));
  }

  getUser() {
    return fetch(`${this.#url}/users/me`, {
      headers: this.#headers,
    })
      .then(this.#response)
  }

  getDataCards() {
    return fetch(`${this.#url}/cards`, {
      headers: this.#headers,
    })
      .then(this.#response)
  }

  setUser(user) {
    return fetch(`${this.#url}/users/me`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify(user),
    })
      .then(this.#response)
  }

  setDataCards(place) {
    return fetch(`${this.#url}/cards`, {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify(place),
    })
      .then(this.#response)
  }

  deleteCard(id) {
    return fetch(`${this.#url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.#headers,
    })
      .then(this.#response)
  }

  likeCard(id) {
    return fetch(`${this.#url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.#headers,
    })
      .then(this.#response)
  }

  dislikeCard(id) {
    return fetch(`${this.#url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.#headers,
    })
      .then(this.#response)
  }

  setAvatar(avatar) {
    return fetch(`${this.#url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify(avatar),
    })
      .then(this.#response)
  }
}
