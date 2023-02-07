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

}
