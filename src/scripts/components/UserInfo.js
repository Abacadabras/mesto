export default class UserInfo {
  #name
  #about
  constructor(nameSelector, aboutSelector) {
    this.#name = document.querySelector(nameSelector);
    this.#about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      name: this.#name.textContent,
      about: this.#about.textContent,
    }
  }

  setUserInfo({ name, about }) {
    this.#name.textContent = name;
    this.#about.textContent = about;
  }
}
