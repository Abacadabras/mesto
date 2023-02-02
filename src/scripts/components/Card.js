export default class Card {
  #class
  #cardName
  #cardLink
  #newCardElement
  #imgCardElement
  #btnLikeCard
  #btnDeleteCard
  #handleImgCard

  constructor(cardConfig, { name, link }, openPopup) {
    this.#class = cardConfig;
    this.#cardName = name;
    this.#cardLink = link;
    this.#handleImgCard = openPopup;
  }

  #getTemplate() {
    return document
      .querySelector(this.#class.templateId)
      .content
      .querySelector(this.#class.cardClass)
      .cloneNode(true);
  }

  #handleLikeCardBtn() {
    this.#btnLikeCard.classList.toggle(this.#class.btnLikeCardActive);
  }
  #handleDeleteCardBtn() {
    this.#newCardElement.remove();
    this.#newCardElement = null;
  }

  #setEventListeners() {
    this.#btnLikeCard.addEventListener('click', this.#handleLikeCardBtn.bind(this));
    this.#btnDeleteCard.addEventListener('click', this.#handleDeleteCardBtn.bind(this));
    this.#imgCardElement.addEventListener('click', this.#handleImgCard.bind(this, this.#cardName, this.#cardLink));
  }

  generateCard() {
    this.#newCardElement = this.#getTemplate();

    this.#imgCardElement = this.#newCardElement.querySelector(this.#class.imageCardClass);
    this.#btnLikeCard = this.#newCardElement.querySelector(this.#class.btnLikeCardClass);
    this.#btnDeleteCard = this.#newCardElement.querySelector(this.#class.btnDeleteCardClass);

    this.#newCardElement.querySelector(this.#class.titleCardClass).textContent = this.#cardName;
    this.#imgCardElement.alt = this.#cardName;
    this.#imgCardElement.src = this.#cardLink;

    this.#setEventListeners();

    return this.#newCardElement;
  }
}
