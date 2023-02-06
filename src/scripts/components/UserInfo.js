export default class UserInfo {
  #name
  #about
  #avatar
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

  setUserInfo({ name = this.#name.textContent,
                about = this.#about.textContent,
                avatar = this.#avatar.src }) {
    this.#name.textContent = this.#avatar.alt =  name;
    this.#about.textContent = about;
    this.#avatar.src = avatar;
  }
}
