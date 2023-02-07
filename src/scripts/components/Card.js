export default class Card {
  #class
  #cardName
  #cardLink
  #newCardElement
  #imgCardElement
  #btnLikeCard
  #btnDeleteCard
  #handleImgCard
  #countLikes
  #countLikesElem
  #handleConfirmation

  constructor(cardConfig, { name, link, likes }, openPopup, openConfirmation) {
    this.#class = cardConfig;
    this.#cardName = name;
    this.#cardLink = link;
    this.#handleImgCard = openPopup;
    this.#countLikes = likes.length;
    this.#handleConfirmation = openConfirmation;
  }

  #getTemplate() {
    return document
      .querySelector(this.#class.templateId)
      .content
      .querySelector(this.#class.cardClass)
      .cloneNode(true);
  }

  #handleLikeCardBtn() {
    if (this.#btnLikeCard.classList.toggle(this.#class.btnLikeCardActive)) {
      this.#countLikes += 1;
    } else {
      this.#countLikes -= 1;
    }
    this.#countLikesElem.textContent = this.#countLikes;
  }
  delete() {
    this.#newCardElement.remove();
    this.#newCardElement = null;
  }

  #setEventListeners() {
    this.#btnLikeCard.addEventListener('click', this.#handleLikeCardBtn.bind(this));
    this.#btnDeleteCard.addEventListener('click', this.#handleConfirmation.bind(this, this));
    this.#imgCardElement.addEventListener('click', this.#handleImgCard.bind(this, this.#cardName, this.#cardLink));
  }

  generateCard() {
    this.#newCardElement = this.#getTemplate();

    this.#imgCardElement = this.#newCardElement.querySelector(this.#class.imageCardClass);
    this.#btnLikeCard = this.#newCardElement.querySelector(this.#class.btnLikeCardClass);
    this.#btnDeleteCard = this.#newCardElement.querySelector(this.#class.btnDeleteCardClass);
    this.#countLikesElem = this.#newCardElement.querySelector(this.#class.countLikesClass);

    this.#newCardElement.querySelector(this.#class.titleCardClass).textContent = this.#cardName;
    this.#imgCardElement.alt = this.#cardName;
    this.#imgCardElement.src = this.#cardLink;
    this.#countLikesElem.textContent = this.#countLikes;

    this.#setEventListeners();

    return this.#newCardElement;
  }
}
