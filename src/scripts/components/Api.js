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

  #error(error) {
    console.error(error);
  }
  getUser() {
    return fetch(`${this.#url}/users/me`, {
      headers: this.#headers,
    })
      .then(this.#response)
      .catch(this.#error);
  }

  getDataCards() {
    return fetch(`${this.#url}/cards`, {
      headers: this.#headers,
    })
      .then(this.#response)
      .catch(this.#error);
  }

  setUser(user) {
    return fetch(`${this.#url}/users/me`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify(user),
    })
      .then(this.#response)
      .catch(this.#error);
  }

  setDataCards(place) {
    return fetch(`${this.#url}/cards`, {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify(place),
    })
      .then(this.#response)
      .catch(this.#error);
  }

  deleteCard(id) {
    return fetch(`${this.#url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.#headers,
    })
      .then(this.#response)
      .catch(this.#error);
  }

  likeCard(id) {
    return fetch(`${this.#url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.#headers,
    })
      .then(this.#response)
      .catch(this.#error);
  }

  dislikeCard(id) {
    return fetch(`${this.#url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.#headers,
    })
      .then(this.#response)
      .catch(this.#error);
  }

  setAvatar(avatar) {
    return fetch(`${this.#url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify(avatar),
    })
      .then(this.#response)
      .catch(this.#error);
  }
}
