export default class Api {
  #url
  #headers
  constructor({ url, headers }) {
    this.#url = url;
    this.#headers = headers;
  }

  getUser() {
    return fetch(`${this.#url}/users/me`, {
      headers: this.#headers,
    })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(new Error(`Error: ${response.status}`));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getDataCards() {
    return fetch(`${this.#url}/cards`, {
      headers: this.#headers,
    })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(new Error(`Error: ${response.status}`));
      })
      .catch((err) => {
        console.error(err)
      });
  }

  setUser(user) {
    return fetch(`${this.#url}/users/me`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(new Error(`Error: ${response.status}`));
      })
      .catch((err) => {
        console.error(err)
      });
  }

  setDataCards(place) {
    return fetch(`${this.#url}/cards`, {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify(place),
    })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(new Error(`Error: ${response.status}`));
      })
      .catch((err) => {
        console.error(err)
      });
  }

  deleteCard(id) {
    return fetch(`${this.#url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.#headers,
    })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(new Error(`Error: ${response.status}`));
      })
      .catch((err) => {
        console.error(err)
      });
  }

  likeCard(id) {
    return fetch(`${this.#url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.#headers,
    })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(new Error(`Error: ${response.status}`));
      })
      .catch((err) => {
        console.error(err)
      });
  }

  dislikeCard(id) {
    return fetch(`${this.#url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.#headers,
    })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(new Error(`Error: ${response.status}`));
      })
      .catch((err) => {
        console.error(err)
      });
  }
}
