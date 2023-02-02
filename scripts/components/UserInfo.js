export default class UserInfo {
  #author
  #description
  constructor(authorSelector, descriptionSelector) {
    this.#author = document.querySelector(authorSelector);
    this.#description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      author: this.#author.textContent,
      description: this.#description.textContent,
    }
  }

  setUserInfo({ author, description }) {
    this.#author.textContent = author;
    this.#description.textContent = description;
  }
}
