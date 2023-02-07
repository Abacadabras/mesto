export default class UserInfo {
  #name
  #about
  #avatar
  #userId
  constructor({ nameClass, aboutClass, imgClass }) {
    this.#name = document.querySelector(nameClass);
    this.#about = document.querySelector(aboutClass);
    this.#avatar = document.querySelector(imgClass);
  }

  getUserInfo() {
    return {
      name: this.#name.textContent,
      about: this.#about.textContent,
    }
  }

  getUserId() {
    return this.#userId;
  }

  setUserInfo({ name = this.#name.textContent,
                about = this.#about.textContent,
                avatar = this.#avatar.src,
                _id = this.#userId }) {
    this.#name.textContent = this.#avatar.alt =  name;
    this.#about.textContent = about;
    this.#avatar.src = avatar;
    this.#userId = _id;
  }
}
